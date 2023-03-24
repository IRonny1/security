const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const UserDto = require("../dtos/UserDto");
const userValidationService = require("../services/UserValidationService");
const tokenService = require("./TokenService");
const HttpError = require("../exceptions/HttpError");
const { OAuth2Client } = require("google-auth-library");
const { clientId } = require("../../config");

const googleClient = new OAuth2Client({ clientId: clientId });

class UserService {
  async getAllUsers() {
    return User.find({});
  }

  async getUserById(userId) {
    const user = await User.findOne({ userId: userId });
    return new UserDto(user);
  }

  async signUp(body) {
    const { firstName, lastName, email, password } = body;

    const tempUser = await User.findOne({ email: email });

    if (tempUser) {
      throw HttpError.BadRequest("User with this email already exist.");
    }

    if (userValidationService.isSignUpDataValid(body)) {
      const user = await User.create({
        userId: uuidv4(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        roles: ["USER"],
      });

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.userId, tokens.refreshToken);

      return { ...tokens, user: userDto };
    } else {
      throw HttpError.BadRequest("Data is incorrect");
    }
  }

  async signUpWithGoogleOAuth(token) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: `${clientId}`,
    });

    if (!ticket) {
      throw HttpError.BadRequest("Token are not valid");
    }

    const payload = ticket.getPayload();

    const tempUser = await User.findOne({ email: payload?.email });

    if (tempUser) {
      throw HttpError.BadRequest("User with this email already exist.");
    }

    const user = await User.create({
      userId: uuidv4(),
      email: payload?.email,
      firstName: payload?.given_name,
      lastName: payload?.family_name,
      password: bcrypt.hashSync(uuidv4(), 10),
      roles: ["USER"],
    });

    return new UserDto(user);
  }

  async signIn(body) {
    const { email, password } = body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw HttpError.NotFound("User with this email not found.");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw HttpError.BadRequest("Incorrect password.");
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({
      userId: user.userId,
      roles: user.roles,
    });

    return { accessToken, refreshToken };
  }

  async signInWithGoogleOAuth(token) {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: `${clientId}`,
    });

    if (!ticket) {
      throw HttpError.BadRequest("Token are not valid");
    }

    const payload = ticket.getPayload();
    const { email } = payload;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw HttpError.BadRequest("User not found.");
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({
      userId: user.userId,
      roles: user.roles,
    });

    return { accessToken, refreshToken };
  }

  async logOut(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refreshUserToken(refreshToken) {
    if (!refreshToken) {
      throw HttpError.UnauthorizedAccess();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw HttpError.UnauthorizedAccess();
    }

    const dbToken = await tokenService.findToken(refreshToken);

    if (!dbToken) {
      throw HttpError.UnauthorizedAccess();
    }

    const user = await User.findOne({ userId: userData.userId });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.userId, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async setRole(userId, role) {
    const user = await User.findOneAndUpdate(
      { userId: userId },
      { roles: [role] }
    );
    return new UserDto(user);
  }
}

module.exports = new UserService();
