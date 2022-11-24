import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";

import query from "../helper/helperDb.js";
import myLogger from "../winstonLog/winston.js";





// export async function orderReturnByCustomer(id_return, id_purchase_item) {
//     let params = [account_id, note, id_order_purchase, total_price_return, total_quantity_return];
//     let sql = `insert into return_item_invoice(id_return, id_purchase_item) values(?, ?)`;
//     let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
//     let result = await query(sql, params);
//     myLogger.info("result %o", result[0][0].id_return_main)
//     ret = { statusCode: OK, data: result[0][0] };
//     return ret;
// }



export async function orderReturnByCustomer(account_id, note, id_order_purchase, total_price_return, total_quantity_return,
    id_purchase_item) {
    let params = [account_id, note, id_order_purchase, total_price_return, total_quantity_return];
    let sql = `call addOrderReturn(?,?,?,?,?)`;
    let sql_2 = `insert into return_item_invoice(id_return, id_purchase_item) values(?, ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    let { id_return_main } = result[0][0]
    let id_conver = id_return_main
    if (id_conver === 0) {
        ret = { statusCode: BAD_REQUEST, error: 'ERROR', description: 'Quá hạn trả hàng' };
    } else {
        id_purchase_item.forEach(async e => {
            let params_2 = [id_conver, e];
            let result_2 = await query(sql_2, params_2);
            myLogger.info("check log %o", result_2)
        });
        myLogger.info("result %o", result)
        ret = { statusCode: OK, data: result[0][0] };
    }
    return ret;
}



export async function showAllOrderReturn(id_user) {
    let params = [id_user];
    let sql = `select * from return_invoice where account_id = ?`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result };
    return ret;
}





export async function showOrderReturnItem(id_return) {
    let params = [id_return];
    let sql = `select pr.name,pr.image,concat(pr.option1,',',pr.option2,',',pr.option3,',') as optionProduct,oitem.quantity,oitem.price,oitem.quantity*oitem.price
                    as totalPrice
                                from return_item_invoice reitem
                                join order_purchase_items oitem on reitem.id_purchase_item = oitem.id
                                 join product_variant pr on pr.id = oitem.id_product
                                where id_return = ${id_return}`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    myLogger.info("result %o")
    ret = { statusCode: OK, data: result };
    return ret;
}


