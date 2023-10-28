const AppError = require("../utils/AppError");

const authAdmin = async (req, res, next) => {
    if(req.session.admin){
        return next();
    }else{
        res.redirect('/admin/login')
    }
}
module.exports = authAdmin