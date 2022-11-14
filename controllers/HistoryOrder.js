import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";

import query from "../helper/helperDb.js";
import myLogger from "../winstonLog/winston.js";




export async function getHistoryOrder(id_user, status_id) {
    let params = [id_user, status_id];
    let sql = `select id, total_price, total_quantity, status, type, fee_money, created_time, sum(total_price + fee_money) as 'totalPrice' from order_purchase where account_id = ${id_user}
    and status = ${status_id}
    group by id, total_price, total_quantity, status, type, fee_money, created_time`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result };
    return ret;
}



export async function getOrderItemByHistory(id_order) {
    let params = [parseInt(id_order)];
    let sql = `select product_variant.id, id_order, image, name, option1, option2, option3, order_purchase_items.price, total_price, order_purchase_items.quantity
    from order_purchase_items join product_variant on order_purchase_items.id_product = product_variant.id
    where id_order = ${id_order}`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result };
    return ret;
}


export async function updateStatusDelivery(status_id, id_Order) {
    let params = [parseInt(status_id), parseInt(id_Order)];
    let sql = `update order_purchase set status = ${status_id} where id  = ${id_Order}`;
    let sql_2 = `  insert into order_by_status_history(order_purchase_id, status_id, created_at)
    VALUES ( ${id_Order}, ${status_id}, 
            NOW());`
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    let result_2 = await query(sql_2, params);
    myLogger.info("result %o", result)
    myLogger.info("result 2 %o", result_2)
    ret = { statusCode: OK, data: result };
    return ret;
}