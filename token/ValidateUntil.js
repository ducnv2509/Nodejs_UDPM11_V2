import moment from "moment";
import { BAD_REQUEST } from '../constant/HttpResponseCode.js'
import myLogger from "../winstonLog/winston.js";


export function verifyTooLong(data, len) {
    if (data && data.length > len) {
        return { statusCode: BAD_REQUEST, error: "DATA_INVALID", description: `DATA_INVALID` };
    }
    
    return undefined;
}
export function verifyExists(data) {
    if (!data) {
        let name = Object.keys({ data })[0];
        let dataInvaid = { status: 'Failed', description: `${name} is required`, error: "DATA_INVALID" }
        return { statusCode: BAD_REQUEST, data: { dataInvaid } };
    }

    return undefined;
}

export function isEmpty(data) {
    if (data.length == 0) {
        return { statusCode: BAD_REQUEST, error: "DATA_INVALID", description: `${name} is too long (more than ${len})` };
    }
    return undefined;
}
export function isInteger(n) {
    if (!isInteger_(n)) {
        return { statusCode: BAD_REQUEST, error: "DATA_INVALID", description: 'Data invalid' };
    }
    return undefined;
}

function isInteger_(n) {
    if (!n) return false;
    try {
        n = n.trim();
    } catch (error) {

    }
    return +n === parseInt(n);

}
export function isPositiveInteger(n) {//include 0
    if (!isPositiveInteger_(n)) {
        return { statusCode: BAD_REQUEST, error: "DATA_INVALID", description: 'Data invalid' };
    }
    return undefined;
}
export function isPositiveInteger_(n) {//include 0
    if (!n) return false;
    try {
        n = n.trim();
    } catch (e) {

    }
    return (+n === parseInt(n) && n >= 0);
}

export function isBoolean(n) {//include 0
    if (!n) return false;
    n = n.trim().toLowerCase();
    return (n === 'true' || n === 'false');
}

export function isValidDateTime(datetime) {
    let date = moment(datetime);
    return date.isValid();
}

export function isValidDate(myDate, format) {//include 0
    let l = parseDate(myDate, format);
    myLogger.info(l);
    if (!parseDate(myDate, format)) {
        return { statusCode: BAD_REQUEST, error: "DATA_INVALID", description: 'Data (Date) invalid' };
    }
    return undefined;
}
export function parseDate(myDate, format) {
    if (format) {
        return moment(myDate, format);
    } else {
        return moment(myDate, 'YYYY-MM-dd HH:mm:ss');
    }
}
export function formatDate(date) {
    if (!date) {
        return "";
    }
    let date_ = moment(date).format("YYYY-MM-dd HH:mm:ss");
    return date_;
}

export function formatDateFMT(fmt, date) {
    if (!date) {
        return "";
    }
    let date_ = moment(date).format(fmt);
    return date_;
}