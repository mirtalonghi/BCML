import pool from "./db.js";
import bcrypt from "bcryptjs";

// Agregar un nuevo usuario
export async function addUser({
  userName, password, email, role
}) {
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    await pool.query(
      "INSERT INTO usuario (userName, password, email, role) VALUES (?, ?, ?, ?)",
      [userName, hashedPassword, email, role],
    );
  } catch (error) {
    throw { status: 500, message: "Error al crear el usuario" };
  }
}

// Verificamos que un usuario existe y su password es correcta
export const verifyUser = async ({userName, password}) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE userName = ?",
      [userName]
    );
    console.log(rows);
    if (rows.length === 1) {
      const user = rows[0];
      return bcrypt.compare(password, user.password);
    } else {
      console.log(error)
      throw { status: 404, message: "Usuario no encontrado" };
    }
  } catch (error) {
    console.log(error);
    throw { status: 500, message: "Error al verificar el usuario" };
  }
}
