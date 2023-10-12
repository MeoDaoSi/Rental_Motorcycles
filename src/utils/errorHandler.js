const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.render('404page');
}

module.exports = errorHandler;