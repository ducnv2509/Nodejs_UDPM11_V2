import { OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";

import query from "../helper/helperDb.js";
import myLogger from "../winstonLog/winston.js";

export async function addToCart(id_user, id_product_varient, quantity) {
    let params = [id_user, id_product_varient, quantity];
    let sql = `call createCart(?, ?, ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info('result %o', result);
    ret = { statusCode: OK, data: result[0][0] };
    return ret;
}