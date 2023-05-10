const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
};

const notFound = (req, res) => {
  res.status(404).json({ message: "404 Not found" });
};

module.exports = { errorHandler, notFound };
