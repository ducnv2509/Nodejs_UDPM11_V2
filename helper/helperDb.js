import connection from "../connection/dbConnection.js";


export default async (q, params) => new Promise(
    (resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }
        connection.query(q, params, handler);
    });