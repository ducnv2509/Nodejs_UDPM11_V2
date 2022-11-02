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


export async function getDetailsProduct(id) {
    let sqlGetOptionProduct = "call getOptionProduct(?)";
    let sqlGetDetailProduct = "call getDetailProduct(?)";
    let params = [id];
    let Option1 = [];
    let Option2 = [];
    let Option3 = [];
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let resultGetOptionProduct = await query(sqlGetOptionProduct, params);
    let resultGetDetailProduct = await query(sqlGetDetailProduct, params);
    let { OP1, OP2, OP3 } = resultGetOptionProduct[0][0];
    Option1.push(OP1.split(','))
    Option2.push(OP2.split(','))
    Option3.push(OP3.split(','))
    myLogger.info("%o", resultGetDetailProduct[0][0])
    ret = { statusCode: OK, data: { Option1: Option1[0], Option2: Option2[0], Option3: Option3[0], InfoProduct: resultGetDetailProduct[0][0] } };
    return ret;
}



export async function getProductVarientByOption(op1, op2, op3, id_product) {
    let params = [op1, op2, op3, id_product];
    let sql = `call getProductByOption(?, ?, ?, ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    ret = { statusCode: OK, data: result[0][0] };
    return ret;
}