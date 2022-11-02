import bcrypt from 'bcrypt';
import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";
import myLogger from '../winstonLog/winston.js';
import query from "../helper/helperDb.js";
import { genRefreshToken, genToken } from '../token/ValidateToken.js';

export async function register(email, name, pass, phone, username) {
    let params = [email, name, await bcrypt.hash(pass, await bcrypt.genSalt(10)), phone, username]
    let sql = `CALL register(?, ?, ?, ?, ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    const result = await query(sql, params);
    ret = { statusCode: OK, data: result[0][0] };
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
                    myLogger.info('BUg %o', {username, name, email, phone, id})
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


export async function test() {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    ret = { statusCode: OK, data: 'OK' };
    myLogger.info("ret %o", ret);
    return ret;
}