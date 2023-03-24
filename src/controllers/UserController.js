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

  async getCurrentUser(req, res, next) {
    try {
      const user = await userService.getUserById(req.user.userId);
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  async signUp(req, res, next) {
    try {
      const userData = await userService.signUp(req.body);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: DAYS_30,
        httpOnly: true,
      });

      return res.json({ token: userData.accessToken, user: userData.user });
    } catch (e) {
      next(e);
    }
  }

  async signUpWithGoogleOAuth(req, res, next) {
    try {
      const { token } = req.body;

      const user = await userService.signUnWithGoogleOAuth(token);

      return res.json({ user, token });
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const { accessToken, refreshToken } = await userService.signIn(req.body);

      res.cookie("refreshToken", refreshToken, {
        maxAge: DAYS_30,
        httpOnly: true,
      });

      return res.json({ token: accessToken });
    } catch (e) {
      next(e);
    }
  }

  async signInWithGoogleOAuth(req, res, next) {
    try {
      const { token } = req.body;

      const { accessToken, refreshToken } =
        await userService.signInWithGoogleOAuth(token);

      res.cookie("refreshToken", refreshToken, {
        maxAge: DAYS_30,
        httpOnly: true,
      });

      return res.json({ token: accessToken });
    } catch (e) {
      next(e);
    }
  }

  async logOut(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.send(token);
    } catch (e) {
      next(e);
    }
  }

  async refreshUserToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await userService.refreshUserToken(refreshToken);

      res.cookie("refreshToken", user.refreshToken, {
        maxAge: DAYS_30,
        httpOnly: true,
      });

      return res.json({ accessToken: user.accessToken });
    } catch (e) {
      next(e);
    }
  }

  async setRole(req, res, next) {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      const user = await userService.setRole(userId, role);
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
