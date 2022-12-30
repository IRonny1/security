module.exports = class HttpError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message) {
    return new HttpError(400, message);
  }

  static UnauthorizedAccess() {
    return new HttpError(401, "Unauthorized Access.");
  }

  static AccessDenied() {
    return new HttpError(403, "Access Denied.");
  }
};
