import { OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";
import query from "../helper/helperDb.js";


export async function getAllProduct() {
    let sql = `call getAllProduct()`;
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    const result = await query(sql);
    ret = { statusCode: OK, data: result[0][0] };
    return ret;
}