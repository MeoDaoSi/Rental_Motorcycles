const User = require("../models/users");
const AppError = require("../../utils/AppError");
const bcrypt = require('bcrypt');
const messageClass = require('../../enums/flashMessage')

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            throw new AppError('401','Email chưa được đăng ký !')
        }
        console.log(user);
        // const isMatch = await bcrypt.compare(password, user.password);
        if(password !== user.password){
            throw new AppError('401','Mật khẩu không hợp lệ !')
        }
        
        // if(!isMatch){
        //     throw new AppError('401','Mật khẩu không hợp lệ !')
        // }
        req.session.user = user;
        return res.redirect('/');
    } catch (error) {
        if( error.status?.startsWith('4') ){
            req.flash('message', {
                message: error.message,
                messageClass : messageClass.ERROR
            })
            return res.redirect('/login');
        }
        else{
            req.flash('message', {
                message: error._message || 'Không thể tạo tài khoản vui lòng kiểm tra lại kết nối mạng !',
                messageClass : messageClass.ERROR
            })
            return res.redirect('/login');
        }
    }
}

const logout = async (req, res) => {
    try {
        req.session.user = null;
        res.redirect('/login')
    } catch (error) {
        res.redirect('/')
    }
}

const register = async (req, res) => {
    try {
        
        const { email, password, confirm_password } = req.body;
        if( password !== confirm_password ){
            throw new AppError("401","Mật khẩu không trùng khớp !")
        }
        // Create new user
        const user = new User({email, password});
        console.log(user);
        await user.save();
        req.flash('message', {
            message: 'Đăng ký tài khoản thành công, Vui lòng đăng nhập !',
            messageClass : messageClass.SUCCESS
        })
        return res.redirect('/login');
    } catch (error) {
        if( error.status?.startsWith('4') ){
            req.flash('message', {
                message: error.message,
                messageClass : messageClass.ERROR
            })
            res.redirect('/register');
        }
        else{
            if(error._message.includes('validation')){
                error._message = 'Tài Khoảng hoặc mật khẩu không hợp lệ !'
            }
            req.flash('message', {
                message: error._message || 'Không thể tạo tài khoản vui lòng kiểm tra lại kết nối mạng !',
                messageClass : messageClass.ERROR
            })
            res.redirect('/register');
        }
    }
};

const getMe = (req, res) => {
    res.render('user');
    // res.status(200).json(req.user);
};

module.exports = { 
    login,
    logout,
    register,
    getMe,
}