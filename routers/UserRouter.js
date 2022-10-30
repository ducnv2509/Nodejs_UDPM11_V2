import express from 'express';
import { login, register } from '../controllers/UserController.js';
// import { sendMail } from '../controllers/SendMail.js';
const router = express.Router();

router.post('/register', async (req, res, next) => {
    let { email, name, pass, phone, username} = req.body;
    let response = await register(email, name, pass, phone, username);
    next(response);
})

router.post('/login', async (req, res, next) => {
    let {username, password} = req.body;
    let response = await login(username, password);
    next(response);
})

export default router;
