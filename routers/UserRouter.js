import express from 'express';
import { forgotPass, login, register, resetpass, showInfoUser, updateProfile } from '../controllers/UserController.js';
import { validateResetPasswordToken, ValidateToken } from '../token/ValidateToken.js';
import { registerValidate } from '../validator/Validator.js';
import myLogger from '../winstonLog/winston.js';
// import { sendMail } from '../controllers/SendMail.js';
const router = express.Router();

router.post('/register', registerValidate, async (req, res, next) => {
    let { email, name, pass, phone, username } = req.body;
    let response = await register(email, name, pass, phone, username);
    next(response);
})

router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;
    let response = await login(username, password);
    next(response);
})

router.get('/info', ValidateToken, async (req, res, next) => {
    let { id } = req.payload;
    let response = await showInfoUser(id);
    next(response);
})



router.post('/resetPass', validateResetPasswordToken, async (req, res, next) => {
    let { email } = req.payload;
    let { new_password } = req.body
    let response = await resetpass(email, new_password)
    next(response);
})

router.post('/forgotPass', async (req, res, next) => {
    let { email } = req.body;
    let response = await forgotPass(email)
    next(response);
})

router.post('/profile', ValidateToken, async (req, res, next) => {
    let { name, email, phone } = req.body;
    let { id } = req.payload;
    let response = await updateProfile(id, name, email, phone)
    next(response);
})



export default router;
