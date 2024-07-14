import pool from "./db.js";


// Agregar un nuevo piloto
export async function agregarPiloto({
  nombre_piloto, apellido_piloto, licencia_piloto,
}) {
  try {
    await pool.query(
      "INSERT INTO piloto (nombre_piloto, apellido_piloto, licencia_piloto, fechacontrato) VALUES (?, ?, ?, ?)",
      [nombre_piloto, apellido_piloto, licencia_piloto, new Date()]
    );
  } catch (error) {
    console.log(error);
    throw { status: 500, message: "Error al crear el piloto" };
    
  }
}

// Obtener todos los piloto
export const listarPilotos = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM piloto");
    return rows;
  } catch (error) {
    throw { status: 500, message: "Error al obtener pilotos" };
  }
};

// Obtener detalles de un piloto por ID
export const obtenerDetallesPiloto = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM piloto WHERE PilotoID = ?",[id]);

    if (rows.length === 1) {
      const piloto = rows[0];
      return piloto;
    } else {
      throw { status: 404, message: "Piloto no encontrado" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles del piloto" };
  }
};

// Actualizar un piloto por ID
export const actualizarPiloto = async (
  id,
  { nombre_piloto, apellido_piloto, licencia_piloto }
) => {
  try {
    await pool.query(
      "UPDATE piloto SET nombre_piloto = ?, apellido_piloto = ?, licencia_piloto = ? WHERE PilotoID = ?",
      [nombre_piloto, apellido_piloto, licencia_piloto, id]
    );
  } catch (error) {
    throw {
      status: 500,
      message: `Error al actualizar el piloto con ID ${id}`,
    };
  }
};

// Eliminar un piloto por ID
export const eliminarPiloto = async (id) => {
  try {
    await pool.query("DELETE FROM piloto WHERE PilotoID = ?", [id]);
  } catch (error) {
    throw {
      status: 500,
      message: `Error al eliminar el piloto con ID ${id}`,
    };
  }
};
