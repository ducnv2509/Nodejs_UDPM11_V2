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
    // myLogger.info('resultQuantity %o', resultQuantity);
    myLogger.info('sl mua %o', quantity)
    myLogger.info('sl trong cart %o', resultConvert[0][0].quantity);
    myLogger.info('sl sp %o', resultQuantity[0].quantity);

    if (resultConvert[0][0].quantity + quantity > resultQuantity[0].quantity) {
        ret = { statusCode: BAD_REQUEST, error: 'ERROR', description: 'Số lượng trong kho không đủ' };
    } else {
        let result = await query(sql, params);
        ret = { statusCode: OK, data: result[0][0] };
    }
    return ret;
}




export async function showCart(id_user) {
    let params = [id_user];
    let sql = `select pv.id as 'id_product_variant', ci.id as 'id_cart_item', pv.name, pv.wholesale_price, ci.quantity, pv.image, pv.wholesale_price * ci.quantity as 'priceTotal', option1, option2, option3 from cart_items ci join cart c on ci.id_cart = c.id
    join product_variant pv on pv.id = ci.id_product where c.account_id =` + id_user + ' order by ci.id desc';
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result };
    return ret;
}

export async function addOrderPurchase(id_user, address, note, id_cart_items, moneyFee) {
    let params = [id_user, address, note, moneyFee];
    let i = [];
    i.push(id_cart_items)
    console.log("%o", i)
    let sql = `call addOrderPurchase(?, ?, ?, '${id_cart_items}', ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    try {
        let result = await query(sql, params);
        myLogger.info("result %o", + "'" + id_cart_items + "'")
        ret = { statusCode: OK, data: result[0] };
    } catch (e) {
        myLogger.info('BUG %o', e)
    }
    return ret;
}

export async function getCartItemById(id, id_user) {
    let params = [id, id_user];
    let sql = `select cart_items.*, pv.image, pv.wholesale_price, pv.name, pv.option1, pv.option2, pv.option3,
    cart_items.quantity * pv.wholesale_price as 'priceTotal'
from cart_items
      join cart on cart_items.id_cart = cart.id
join product_variant pv on pv.id = cart_items.id_product
where cart_items.id in (${id})
and account_id = ${id_user}`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result };
    return ret;
}
export async function getAmountPamentV1() {
    
    let sql = `select id, (total_price + fee_money) as total,  account_name from order_purchase order by id desc limit 1`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql);
    myLogger.info("result %o", result)
    ret = { statusCode: OK, data: result[0] };
    return ret;
}