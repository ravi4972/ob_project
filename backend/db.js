// db.js
const { Pool } = require('pg');
require('dotenv').config();

const dbPassword = process.env.db_password;

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:${dbPassword}@ep-purple-truth-a1fkrd0n-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
