import { isBoolean, isInteger, verifyExists, verifyTooLong, isPositiveInteger, isValidDateTime, parseDate, formatDate, isEmpty, isValidDate } from '../validator/ValidationUtil.js'



export function registerValidate(req, res, next) {
    let { email, name, pass, phone, username } = req.body;
    let v = verifyExists(username);
    if (v) return next(v);
    v = verifyExists(phone);
    if (v) return next(v);
    v = verifyExists(pass);
    if (v) return next(v);
    v = verifyExists(name);
    if (v) return next(v);
    v = verifyExists(email);
    if (v) return next(v);
    return next();
}
