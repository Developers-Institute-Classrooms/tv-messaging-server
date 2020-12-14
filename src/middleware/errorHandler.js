const errorHandler = (err, req, res, next) => {
  console.error(`errorHandler`, err);

  // send error to monitoring software

  // email error to the dev

  // write the error to a log file

  return res.status(400).json({ error: err.message || 'Something broke!' });
};

export default errorHandler;
