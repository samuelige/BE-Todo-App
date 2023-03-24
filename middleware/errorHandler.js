const { StatusCodes } = require('http-status-codes');
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  res.status(customError.statusCode).json({ msg: customError.msg });
  next();
};

module.exports = {errorHandler};