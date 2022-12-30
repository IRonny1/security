const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const UserDto = require("../dtos/UserDto");
const userValidationService = require("../services/UserValidationService");
const tokenService = require("./TokenService");
const HttpError = require("../exceptions/HttpError");

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

  async signIn(body) {
    const { email, password } = body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw HttpError.BadRequest("User not found.");
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
}

module.exports = new UserService();
