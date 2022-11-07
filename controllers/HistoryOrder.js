import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";

import query from "../helper/helperDb.js";
import myLogger from "../winstonLog/winston.js";




export async function getHistoryOrder(id_user) {
    let params = [id_user];
    let sql = `select id, total_price, total_quantity, status, type, fee_money, created_time, sum(total_price + fee_money) as 'totalPrice' from order_purchase where account_id = ${id_user}
    group by id, total_price, total_quantity, status, type, fee_money, created_time`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result };
    return ret;
}