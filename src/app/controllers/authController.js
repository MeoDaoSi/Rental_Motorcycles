const User = require("../models/users");
const AppError = require("../../utils/AppError");
const bcrypt = require('bcrypt');
const messageClass = require('../../enums/flashMessage')

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByCredentials(username, password);
        console.log(user);
        await user.generateAuthToken();
        res.render('user',user);
    } catch (error) {
        res.redirect('/login');
    }
}

const logout = async (req, res) => {
    try {
        req.user.token = "";
        await req.user.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json();
    }
}

const register = async (req, res) => {
    try {
        const { email, password, confirm_password } = req.body;
        if( password !== confirm_password ){
            throw new AppError("401","Mật khẩu không trùng khớp!")
        }
        // Create new user
        const user = await new User({email, password});
        await user.save();
        res.render('login',{
            message: "Đăng ký tài khoản thành công!",
            messageClass: messageClass.SUCCESS
        })
    } catch (error) {
        if( error.status.startsWith('4') ){
            return res.render('login',{
                messages: {
                    message: error.message,
                    messageClass: messageClass.ERROR
                }
                
            })
        }
        else{
            res.render('register',{
                messages: {
                    message: "Không thể tạo tài khoản vui lòng kiểm tra lại kết nối mạng!",
                    messageClass: messageClass.ERROR
                }
            })
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