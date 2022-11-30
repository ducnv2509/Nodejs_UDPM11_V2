import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();
export async function sendMailForgotPass(fullname, email, url_reset) {
    let apiCreateProfile = process.env.UDPM11_URL_MAIL + `mailforgotpass`
    const obj = {
        fullname, email, url_reset
    }
    const body = JSON.stringify(obj);
    return await fetch(apiCreateProfile, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    });
}
