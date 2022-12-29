const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const UserDto = require("../dtos/UserDto");
const userValidationService = require("../services/UserValidationService");
const tokenService = require("./TokenService");

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
      throw new Error("User with this email already exist.");
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
      throw new Error("Data is incorrect");
    }
  }

  async signIn(body) {
    const { email, password } = body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Incorrect password.");
    }

    const { refreshToken } = tokenService.generateTokens({
      userId: user.userId,
      roles: user.roles,
    });

    return refreshToken;
  }
}

module.exports = new UserService();
