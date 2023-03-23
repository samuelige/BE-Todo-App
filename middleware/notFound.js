const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Route does not exist' })
    next();
};

module.exports = notFound;