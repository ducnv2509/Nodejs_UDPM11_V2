import dotenv from 'dotenv'
dotenv.config();
export const POOL = {
    min: process.env.UDPM11_MIN_CONECTION_POOL || 0,
    acquire: process.env.UDPM11_ACQUIRE_CONECTION_POOL || 30000,
    idle: process.env.UDPM11_IDLE_CONECTION_POOL || 10000
};