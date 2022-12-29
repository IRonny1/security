const userService = require("../services/UserService");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.send(users);
    } catch (e) {
      return res.send(e);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.userId);
      return res.send(user);
    } catch (e) {
      return res.send(e);
    }
  }

  async signUp(req, res) {
    try {
      const userData = await userService.signUp(req.body);
      return res.send(userData);
    } catch (e) {
      return res.send(e);
    }
  }

  async signIn(req, res) {
    try {
      const token = await userService.signIn(req.body);
      return res.json({ token: token });
    } catch (e) {
      return res.send(e);
    }
  }
}

module.exports = new UserController();
