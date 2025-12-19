const { ERROR_TYPES, sendError } = require('../utils/errors');

const notFoundHandler = (req, res) => {
  sendError(res, ERROR_TYPES.NOT_FOUND, `Неверный маршрут(url)`);
};

module.exports = notFoundHandler;
