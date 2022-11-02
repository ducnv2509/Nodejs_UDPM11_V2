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


export async function getDetailsProduct(idtxt) {
    let sqlGetOptionProduct = "call getOptionProduct(?)";
    let sqlGetDetailProduct = "call getDetailProduct(?)";
    let params = [idtxt];
    let Option1 = [];
    let Option2 = [];
    let Option3 = [];
    let InfoProduct = [];
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let resultGetOptionProduct = await query(sqlGetOptionProduct, params);
    let resultGetDetailProduct = await query(sqlGetDetailProduct, params);
    let { quantity, product_id, id, name, image, wholesale_price, option1, option2, option3 } = resultGetDetailProduct[0][0];
    InfoProduct.push({ quantity, product_id, id, name: name.split('-')[0], image, price: wholesale_price, option1, option2, option3 })
    let { OP1, OP2, OP3 } = resultGetOptionProduct[0][0];
    Option1.push(OP1.split(','))
    Option2.push(OP2.split(','))
    Option3.push(OP3.split(','))
    myLogger.info("%o", resultGetDetailProduct[0][0])
    ret = { statusCode: OK, data: { Option1: Option1[0], Option2: Option2[0], Option3: Option3[0], InfoProduct: InfoProduct[0] } };
    return ret;
}



export async function getProductVarientByOption(op1, op2, op3, id_product) {
    let params = [op1, op2, op3, id_product];
    let sql = `call getProductByOption(?, ?, ?, ?)`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    let {id, name, option1, option2, option3, price, image, product_id, quantity} = result[0][0]
    ret = { statusCode: OK, data: {id, name: name.split('-')[0], option1, option2, option3, price, image, product_id, quantity} };
    return ret;
}