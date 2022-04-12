exports.checkBody = (req, res, next) => {
  if (req.body && Object.keys(req.body).length === 0) {
    res.status(400).json({
      success: false,
      error: "no data found",
      msg: "No data found",
    });
  }

  next();
};
