import jsonwebtoken from 'jsonwebtoken';
import { privateKEY, publicKEY } from '../ConfigKey.js';
import { Unauthorized } from '../constant/HttpResponseCode.js';
import myLogger from '../winstonLog/winston.js'

export function ValidateToken(req, res, next) {
    let { token } = req.headers;
    if (!token) {
        return next({ statusCode: Unauthorized, error: "NO_TOKEN", description: "Không có Token" });
    }
    let verifyOptions = {
        algorithm: "RS256"
    }
    try {
        let payload = jsonwebtoken.verify(token, publicKEY, verifyOptions);
        req.payload = payload;
        let { username, type, name, email, phone, id } = payload;
        // myLogger.info("tenants: %o", tenants)
        if (type !== "ACCESS_TOKEN") {
            return next({ statusCode: Unauthorized, error: "WRONG_TOKEN", description: "Wrong token type" });
        }
        return next();
    } catch (e) {
        return next({ statusCode: Unauthorized, error: "TOKEN_EXPIRED", description: "Token hết hạn" });
    }
}


export function genToken(username, name, email, phone, id) {
    let signOptions = {
        expiresIn: "3h",
        algorithm: "RS256"
    }
    myLogger.info('Generate accesstoken for:' + username);
    let payload = { username, type: "ACCESS_TOKEN", name, email, phone, id };
    let accessToken = jsonwebtoken.sign(payload, privateKEY, signOptions);
    return accessToken;
}

export function genRefreshToken(username, name, email, phone) {
    let signOptions = {
        expiresIn: "24h",
        algorithm: "RS256"
    }
    let payload = { username, type: "REFRESH_TOKEN", name, email, phone };
    let refreshToken = jsonwebtoken.sign(payload, privateKEY, signOptions);
    return refreshToken;
}

export function refreshToken(refreshtoken) {
    if (!refreshtoken) {
        return { status: false };
    }
    let verifyOptions = {
        algorithm: "RS256"
    }
    try {
        myLogger.info("refreshtoken: %o", refreshtoken)
        let payload = jsonwebtoken.verify(refreshtoken, publicKEY, verifyOptions);
        let { type, roleCode, tenants, permissions, fullname, email } = payload;
        payload = { type, roleCode, tenants, permissions, fullname, email }
        // myLogger.info("%o", payload)
        if (type !== "REFRESH_TOKEN") {
            return { status: false };
        } else {
            let accessToken = undefined;
            // if (role == "STAFF") {
            accessToken = genTokenStaff(payload);
            // } else {
            //     accessToken = genRefreshTokenCustomer(username, full_name, email, role);
            // }
            return { status: true, accessToken }
        }
    } catch (e) {
        myLogger.info("-----------%o", e)
        return { status: false };
    }
}



export function genResetPasswordToken(payload) {
    let signOptions = {
        expiresIn: "1d",
        algorithm: "RS256"
    }
    payload = { ...payload, type: "RESET_PASSWORD_TOKEN" };
    let accessToken = jsonwebtoken.sign(payload, privateKEY, signOptions);
    return accessToken;
}


export function validateResetPasswordToken(req, res, next) {
    let { token } = req.body;
    if (!token) {
        return next({ statusCode: BAD_REQUEST, error: "NO_TOKEN", description: "Không có Token" });
    }
    let verifyOptions = {
        algorithm: "RS256"
    }
    try {
        let payload = jsonwebtoken.verify(token, publicKEY, verifyOptions);
        req.payload = payload;
        let { type } = payload;
        if (type !== "RESET_PASSWORD_TOKEN") {
            return next({ statusCode: BAD_REQUEST, error: "WRONG_TOKEN", description: "Wrong token type" });
        }
        return next();
    } catch (e) {
        return next({ statusCode: Unauthorized, error: "TOKEN_EXPIRED", description: "Token hết hạn" });
    }
}