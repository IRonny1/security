const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const { isSignUpDataValid } = require("../services/userService");
const { secretToken } = require("../../config");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({});
      return res.json({ users });
    } catch (e) {
      return res.send(e);
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      return res.send(user);
    } catch (e) {}
  }

  async getUserRoles(req, res) {
    try {
      const { roles } = await User.findOne({ userId: req.params.userId });
      if (!roles) {
        res.sendStatus(404);
      } else {
        res.send(roles);
      }
    } catch (e) {
      return res.send(e);
    }
  }

  async signUp(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const tempUser = await User.findOne({ email: email });

      if (tempUser) {
        return res.json({ message: "User with this email already exist." });
      }

      if (isSignUpDataValid(firstName, lastName, email, password)) {
        const newUser = new User({
          userId: uuidv4(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: bcrypt.hashSync(password, 10),
          roles: ["USER"],
        });

        newUser.save();

        return res.json({ message: "User successfully created." });
      } else {
        return res.json({ message: "Data is incorrect" });
      }
    } catch (e) {
      return res.send(e);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password." });
      }

      const accessToken = generateAccessToken(user.userId, user.roles);

      res.json({ token: accessToken });
    } catch (e) {
      return res.send(e);
    }
  }
}

const generateAccessToken = (userId, roles) => {
  const payload = { userId, roles };
  return jwt.sign(payload, secretToken, { expiresIn: "24h" });
};

module.exports = new UserController();
