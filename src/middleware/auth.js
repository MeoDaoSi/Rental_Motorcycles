const AppError = require("../utils/AppError");

const auth = async (req, res, next) => {
    if(req.session.user){
        return next();
    }else{
        next(new AppError('403','Vui lòng đăng nhập !'));
    }
}
module.exports = auth