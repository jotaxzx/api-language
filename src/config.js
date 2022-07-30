import {config} from 'dotenv';

config();

console.log(process.env.USER)
console.log(process.env.SECRET)

export default {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    secret: process.env.SECRET
};
