import pgPromise from "pg-promise";
import dotenv from 'dotenv'
import 'dotenv/config'
import fs from "fs";
import path from "path";
const pgp = pgPromise();
let env =  dotenv.config({ quiet: true }).parsed
let db = pgp(`postgres://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`)

const sqlPath = path.join(process.cwd(), "/sql/tables.sql");
const sql = fs.readFileSync(sqlPath, "utf-8");

db.none(sql).then(() => {
    console.log("Tüm tablolar başarıyla oluşturuldu.");
});
export default db

