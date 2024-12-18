// Get variables from .env file for database connection
const mysql = require("mysql2/promise");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const client = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

client.checkConnection = async () => {
  try {
    const connection = await client.getConnection();
    console.info(`Using database ${DB_NAME}`);
    connection.release();
  } catch (error) {
    console.warn(
      "Warning:",
      "Failed to establish a database connection.",
      "Please check your database credentials in the .env file if you need a database access."
    );
    console.warn(error.message);
  }
};

module.exports = client;