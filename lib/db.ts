import { Pool } from "pg";
// Pool to make DB connection and ready to use
// lot of users can use the same pool to connect to the database and execute queries

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
