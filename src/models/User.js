const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

const User = model("User", UserSchema);

module.exports = User;
