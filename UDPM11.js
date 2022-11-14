import express from 'express';
import { BAD_REQUEST, CREATED, NO_CONTENT, OK } from './constant/HttpResponseCode.js';
import userAPI from './routers/UserRouter.js';
import productAPI from './routers/ProductRouter.js';
import fetchAPI from './routers/FetchAPIRouter.js';
import historyOrder from './routers/HistoryRouter.js';
import orderReturnAPI from './routers/OrderReturnRouter.js';
import cartAPI from './routers/CartRouter.js';
import myLogger from './winstonLog/winston.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { ValidateToken } from './token/ValidateToken.js';
dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors());
app.use(express.json());
app.use('/api/user', userAPI);
app.use('/api/product', productAPI);
app.use('/api/fetch', fetchAPI);
app.use('/api/cart', ValidateToken, cartAPI);
app.use('/api/history', ValidateToken, historyOrder);
app.use('/api/order', ValidateToken, orderReturnAPI);


app.use((data, req, res, next) => {
    let statusCode = data.statusCode;
    // myLogger.info(data)
    if (statusCode !== OK && statusCode !== CREATED && statusCode !== NO_CONTENT) {
        let { method, url } = req;
        // myLogger.info("Method:" + method + ", URl:" + url + ", Error: " + JSON.stringify(data), { label: "RESPONSE-ERROR" });
        res.status(statusCode || BAD_REQUEST).send({
            code: statusCode,
            error: data.data ? data.data : data.error,
            description: data.description
        })
    } else {
        let { method, url } = req;
        // myLogger.info("Method:" + method + ", URl:" + url + ", Data: %o", data.data, { label: "RESPONSE-OK" });
        // myLogger.info("Method:" + method + ", URl:" + url + ", Data: " + JSON.stringify(data.data), { label: "RESPONSE-OK" });
        res.status(statusCode).send(data.data)
    }
});
const port = process.env.UDPM11_API_PORT || 3000
const host = '0.0.0.0';
function myListener() {
    myLogger.info(`Listening on port ${port}..`);
}
app.listen(port, host, myListener)