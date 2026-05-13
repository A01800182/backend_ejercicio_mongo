import mongoose from "mongoose";
import { DB_NOSQL_NAME,DB_NOSQL_USER,DB_NOSQL_PASS,DB_NOSQL_HOST,DB_NOSQL_PORT } 
from "../config";

class MongoConnection{
    private readonly mongoUri:string;

    constructor(){
        const host = DB_NOSQL_HOST.includes(":") ?
            DB_NOSQL_HOST :
            `${DB_NOSQL_HOST}:${DB_NOSQL_PORT}`;
        const username = encodeURIComponent(DB_NOSQL_USER);
        const password = encodeURIComponent(DB_NOSQL_PASS);

        this.mongoUri=
        `mongodb://${username}:${password}@${host}/${DB_NOSQL_NAME}?authSource=admin`
    }
    public async connect():Promise<void>{
        try{
            await mongoose.connect(this.mongoUri, {
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 5000
            });
            console.log("Conexión exitosa a MongoDB")
        }catch(err){
            throw err;
        }
    }
}

export const dbnosql = new MongoConnection();
