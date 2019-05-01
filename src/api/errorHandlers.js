/* eslint no-console:0 */

// error handles are copied and adapted from Wes Bos' tutorials
// really helps with the development/debuging process

const developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || ''; // eslint-disable-line no-param-reassign
  const errorDetails = {
    success: false,
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>'
    ),
  };
  res.status(err.status || 500);
  res.json(errorDetails);
  console.error(errorDetails);
};

/*
  Production Error Hanlder
  No stacktraces are leaked to the user
*/
const productionErrors = (err, req, res) => {
  const errorStatus = err.status || 500;
  res.status(errorStatus);
  res.json({
    success: false,
    status: errorStatus,
    message: err.message,
  });
  console.error(err.message);
};

const notFoundError = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
  console.error(err);
};

const catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

module.exports = {
  developmentErrors,
  productionErrors,
  notFoundError,
  catchErrors,
};
