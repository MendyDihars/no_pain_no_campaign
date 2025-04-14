export default class ActionError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'ActionError';
  }
}

