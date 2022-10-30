import fs from 'fs'
export const privateKEY = fs.readFileSync('./config/private.key', 'utf8');
export const publicKEY = fs.readFileSync('./config/public.key', 'utf8');