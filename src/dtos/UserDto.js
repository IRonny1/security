module.exports = class UserDto {
  userName;
  email;
  userId;

  constructor(model) {
    this.userName = `${model.firstName} ${model.lastName}`;
    this.email = model.email;
    this.userId = model.userId;
  }
};
