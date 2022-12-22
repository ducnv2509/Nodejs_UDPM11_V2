import bcrypt from 'bcrypt';
import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";
import myLogger from '../winstonLog/winston.js';
import query from "../helper/helperDb.js";
import { genRefreshToken, genResetPasswordToken, genToken } from '../token/ValidateToken.js';
import { sendMailForgotPass } from './FetchMaiilController.js';

export async function register(email, name, pass, phone, username) {
    let params = [email, name, await bcrypt.hash(pass, await bcrypt.genSalt(10)), phone, username]
    let sql = `CALL register(?, ?, ?, ?, ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    await query(`select 1 from customer_account where username = ? or phone = ? or email = ?`, [username, phone, email]).then(async res => {
        if (res.length > 0) {
            ret = {
                statusCode: SYSTEM_ERROR, error: 'ERROR',
                error: {
                    dataInvaid: {

                        description: `Trùng dữ liệu. Hãy kiểm tra lại !`
                    }
                }
            }
        } else {
            const result = await query(sql, params);
            ret = { statusCode: OK, data: result[0][0] };
        }
    })
    return ret;
}


export async function login(username, password) {
    let queryFindPass = `select password as 'pwd' from customer_account where username = '${username}'`
    myLogger.info("Query %o", queryFindPass)
    const resultPass = await query(queryFindPass);
    myLogger.info("resultPass %o", resultPass)
    if (resultPass.length == 0) {
        return { statusCode: BAD_REQUEST, error: 'LOGIN FALIED' }
    } else {
        let verify = bcrypt.compareSync(password, resultPass[0].pwd);
        if (verify) {
            let sql = `CALL loginByCustomer(?)`;
            try {
                const result = await query(sql, username);
                let ret = result[0][0];
                let { res, id, name, email, phone } = ret;
                if (res == 1) {
                    let accessToken = genToken(username, name, email, phone, id);
                    myLogger.info('BUg %o', { username, name, email, phone, id })
                    let refreshToken = genRefreshToken(username, name, email, phone);
                    return { statusCode: OK, data: { id, name, email, phone, type: 'user', accessToken, refreshToken } }
                } else {
                    return { statusCode: Unauthorized, error: 'USERNAME_NOT_FOUND', description: 'username not found' };
                }
            } catch (e) {
                myLogger.info("login e: %o", e);
                return { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'System busy!' };
            }
        } else {
            return { statusCode: BAD_REQUEST, error: 'LOGIN FALIED' }
        }
    }
}

export async function showInfoUser(id) {
    let params = [id]
    let sql = `select id, email, name, phone, username from customer_account where id = ?`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    const result = await query(sql, params);
    ret = { statusCode: OK, data: result[0] };
    return ret;
}

export async function updateProfile(id, name, email, phone) {
    let params = [name, email, phone, id]
    let sql = `update customer_account 
    set name = ?, email = ?, phone = ? where id = ?`;
    let sql_show = `select id, name, email, phone from customer_account where id = ${id}`
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    const result = await query(sql, params);
    const result_show = await query(sql_show);
    ret = { statusCode: OK, data: result_show[0] };
    return ret;
}


export async function forgotPass(email_txt) {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let params = [email_txt]
    let sql = `select name, email, username, phone from customer_account where email = ?`
    const model = await query(sql, params);
    myLogger.info("model %o", model)
    if (model.length == 0) {
        ret = { statusCode: BAD_REQUEST, error: 'ERROR', description: 'email not found' };
    } else {
        let fullname = model[0].name
        let base_url = `http://180.93.175.236:7000/`
        let payload = { email: email_txt }
        let token = genResetPasswordToken(payload)
        myLogger.info(token)
        let url_reset = `${base_url}?token=${token}&displayname=${fullname}`
        //todo: send mail, 
        await sendMailForgotPass(fullname, email_txt, encodeURI(url_reset));
        ret = { statusCode: OK, data: { status: 'Success', url_reset: encodeURI(url_reset), message: 'Check email to get reset password link!!!' } };
    }

    return ret;
}


export async function resetpass(email_txt, password_txt) {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let params = [email_txt]
    let sql = `select name, email, username, phone from customer_account where email = ?`
    const model = await query(sql, params);
    myLogger.info("model %o", model)
    if (model.length == 0) {
        ret = { statusCode: BAD_REQUEST, error: 'ERROR', description: 'email not found' };
    } else {
        try {
            let descriptionPassword = await bcrypt.hash(password_txt, await bcrypt.genSalt(10))
            let paramsUpdate = [descriptionPassword, email_txt]
            let sqlUpdate = `update customer_account set password = ? where email = ?`
            let t = await query(sqlUpdate, paramsUpdate);
            myLogger.info("check::  %o", t)
            ret = { statusCode: OK, data: { status: 'Success' } };
        } catch (error) {
            myLogger.info("log %o", error)
        }
    }

    return ret;
}



export async function test() {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    ret = { statusCode: OK, data: 'OK' };
    myLogger.info("ret %o", ret);
    return ret;
}