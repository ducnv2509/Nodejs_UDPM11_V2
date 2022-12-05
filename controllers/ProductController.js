import { BAD_REQUEST, OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";
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






export async function searchProduct(name) {
    let params = [name];
    let sql = `select product.id, pv.image, product.name, wholesale_price
    from product
             join product_variant pv on product.id = pv.product_id
    where pv.position = true and product.name like  lower(concat('%', ?, '%'))
    order by wholesale_price desc;`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql, params);
    myLogger.info("BUG %o", result[0]);
    ret = { statusCode: OK, data: result };
    return ret;
}


export async function filterCategory(id_cate) {
    let sql = `
    select distinct product.id, pv.image, product.name, wholesale_price
    from product
             join product_variant pv on product.id = pv.product_id
    join categories_products cp on product.id = cp.product_id
    where pv.position = true and find_in_set(category_id, '${id_cate}')
    order by wholesale_price desc;`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql);
    myLogger.info("BUG %o", result[0]);
    ret = { statusCode: OK, data: result };
    return ret;
}



export async function showCategory() {
    let sql = `select  * from categories`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    let result = await query(sql);
    myLogger.info("BUG %o", result[0]);
    ret = { statusCode: OK, data: result };
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
    myLogger.info("BUG %o", result[0][0]);
    if (result[0][0] == undefined) {
        ret = { statusCode: BAD_REQUEST, data: 'Hết Hàng' }
    } else {
        let { id, name, option1, option2, option3, price, image, product_id, quantity } = result[0][0]
        ret = { statusCode: OK, data: { id, name: name.split('-')[0], option1, option2, option3, price, image, product_id, quantity } };
    }
    return ret;
}