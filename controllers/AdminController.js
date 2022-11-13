
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