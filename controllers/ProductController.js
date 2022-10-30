import { OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";
import query from "../helper/helperDb.js";
import myLogger from "../winstonLog/winston.js";


export async function getAllProduct() {
    let sql = `call getAllProduct()`;
    let products = [];
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql);
    result[0].forEach(e => {
        let { id, image, name, wholesale_price } = e
        products.push({ id, image, name, wholesale_price })
    })
    myLogger.info("%o", result)
    // products.push({id, image, name, wholesale_price})
    ret = { statusCode: OK, data: products };
    return ret;
}