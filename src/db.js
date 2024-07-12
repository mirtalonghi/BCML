import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "mirtaw",
  password: "moebiuswolf59", // Coloca tu contraseña de MySQL
  database: "mirta_cmvuelos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
