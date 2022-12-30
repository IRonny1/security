const userService = require("../services/UserService");

const DAYS_30 = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.userId);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  async signUp(req, res, next) {
    try {
      const userData = await userService.signUp(req.body);

      res.cookie("refreshToken", userData.accessToken, {
        maxAge: DAYS_30,
        httpOnly: true,
      });

      return res.json({ token: userData.refreshToken, user: userData.user });
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const token = await userService.signIn(req.body);
      return res.json({ token: token });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
