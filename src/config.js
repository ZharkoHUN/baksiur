import { config } from "dotenv";
config();

export let database = {
    connectionLimit: 10,
    host: process.env.DATABASE_HOST || "127.0.0.1",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "hpeti",
};



export const port = process.env.PORT || 8000;
//80.211.213.86