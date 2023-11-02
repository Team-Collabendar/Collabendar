import dotenv from "dotenv";
import {Pool, PoolConfig} from "pg";

dotenv.config()

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const pool = new Pool(poolConfig)

export default pool;


