import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";

import query from "../helper/helperDb.js";
import myLogger from "../winstonLog/winston.js";

export async function addToCart(id_user, id_product_varient, quantity) {
    let params = [id_user, id_product_varient, quantity];
    let paramsConvert = [id_user, id_product_varient];
    let sql = `call createCart(?, ?, ?)`;
    let convertTo0 = `call convertTo0(?,?)`
    let sqlQuantitt = `select  ip.quantity from inventories_product_variant ip where ip.product_variant_id =${id_product_varient}`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let resultConvert = await query(convertTo0, paramsConvert);
    let resultQuantity = await query(sqlQuantitt);
    myLogger.info('resultQuantity %o', resultQuantity);

    if (resultConvert[0][0].quantity + quantity > resultQuantity[0].quantity) {
        ret = { statusCode: BAD_REQUEST, error: 'ERROR', description: 'Số lượng trong kho không đủ' };
    } else {
        let result = await query(sql, params);
        ret = { statusCode: OK, data: result[0][0] };
    }
    return ret;
}