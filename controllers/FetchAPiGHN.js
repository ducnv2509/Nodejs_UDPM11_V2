import fetch from "node-fetch";
import { OK, SYSTEM_ERROR } from "../constant/HttpResponseCode.js";
import dotenv from 'dotenv'
import myLogger from "../winstonLog/winston.js";
dotenv.config();

const apiGetTP = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province';
const apiGetH = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district';
const apiGetX = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward';
export async function getInfoTP() {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    return await fetch(apiGetTP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.UDPM11_TOKEN_GHN
        }
    }).then(response =>
        response.json()
    )
        .then(json => {
            let infomation = [];
            let { code, message, data } = json;
            data.forEach((e) => {
                let { ProvinceID, ProvinceName } = e;
                infomation.push({ ProvinceID, ProvinceName })
            })

            ret = { statusCode: OK, data: { code, message, infomation } };
            return ret;
        });
}


export async function getInfoH(id_TP) {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    myLogger.info("%o", process.env.UDPM11_TOKEN_GHN)
    const obj = {
        province_id: id_TP,
    };
    const body = JSON.stringify(obj);
    return await fetch(apiGetH, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.UDPM11_TOKEN_GHN
        }
    }).then(response =>
        response.json()
    )
        .then(json => {
            let infomation = [];
            let { code, message, data } = json;
            myLogger.info("data %o", data)
            data.forEach((e) => {
                let { DistrictID, ProvinceID, DistrictName } = e;
                infomation.push({ DistrictID, ProvinceID, DistrictName })
            })
            ret = { statusCode: OK, data: { code, message, infomation } };
            return ret;
        });
}


export async function getInfoX(id_Xa) {
    let ret = { statusCode: SYSTEM_ERROR, error: 'ERROR', description: 'First error!' };
    const obj = {
        district_id: id_Xa,
    };
    const body = JSON.stringify(obj);
    return await fetch(apiGetX, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
            'token': process.env.UDPM11_TOKEN_GHN
        }
    }).then(response =>
        response.json()
    )
        .then(json => {
            let infomation = [];
            let { code, message, data } = json;
            data.forEach((e) => {
                let { WardCode, DistrictID, WardName } = e;
                infomation.push({ WardCode, DistrictID, WardName })
            })
            ret = { statusCode: OK, data: { code, message, infomation } };
            return ret;
        });
}

