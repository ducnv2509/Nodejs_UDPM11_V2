import myLogger from "../winstonLog/winston.js";
export function makeInfo(req,res,next) {
    let requestedTime = Date.now();
    req.requestedTime = requestedTime;
    let {method, body, url} = req;
    myLogger.info("%o",{method, body, url},{label:'REQUEST'});
    next();
}