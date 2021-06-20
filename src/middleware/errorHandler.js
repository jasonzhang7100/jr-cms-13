module.exports = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    if (process.env.NODE_ENV === 'production') {
      // object manipulation
      // const { details } = error;
      // const errMsg = details.map((i) => ({
      //   message: i.message
      // }));
      return res.status(400).json(error.message);
    } else {
      return res.status(400).json(error);
    }
  }

  // catch other errors
  console.log(error);
  // log
  // winston
  return res
    .status(500)
    .send('something unexpected happened, please try again later');
};

// if (error instanceof CustomError) {}
// class CustomError extends Error {

// }

// {
//   data: [],
//   error: ""
// }
