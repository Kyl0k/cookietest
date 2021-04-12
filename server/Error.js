class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
class UnauthorizedError extends MyError {
  constructor(message, code) {
    super(message);
    this.status = 401;
    this.inner = { message: this.message };
    this.code = code;
  }
}

module.exports = {
  UnauthorizedError,
};
