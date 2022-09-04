const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode;

  res.status(statusCode).json({
    message: `${err}`,
  });
};

module.exports = {
  errorHandler,
};
