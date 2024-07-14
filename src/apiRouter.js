import express from "express";

import {
  agregarPiloto,
  listarPilotos,
  eliminarPiloto,
  actualizarPiloto,
  obtenerDetallesPiloto
} from "./pilotoController.js";

import {
  addUser,
  verifyUser,
} from "./userController.js";

const router = express.Router();

router.get("/pilotos", async (req, res) => {
  try {
    res.json(await listarPilotos())
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo piloto
router.post("/pilotos", async (req, res) => {
  const { nombre_piloto, apellido_piloto, licencia_piloto } = req.body;
  try {
    console.log("api")
    await agregarPiloto({ nombre_piloto, apellido_piloto, licencia_piloto });
    res.status(200).json({ message: "Piloto creado correctamente" });
  } catch (error) {
    const { status, message } = error;
    res.status(500).json({ error: message });
  }
});

// Detalles del piloto
router.get("/piloto/:id", async (req, res) => {
  const PilotoId = req.params.id;

  try {
    res.json(await obtenerDetallesPiloto(PilotoId))
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar un piloto por ID
router.post("/piloto/:id", async (req, res) => {
  const { nombre_piloto, apellido_piloto, licencia_piloto } = req.body;
  const id = req.params.id;

  try {
    await actualizarPiloto(id, {
      nombre_piloto,
      apellido_piloto,
      licencia_piloto,
    });

    res.status(200).json({ message: "Piloto actualizado correctamente" });
  } catch (error) {
    const { status, message } = error;
    res.status(500).json({ error: message });
  }
});

// Ruta para borrar un piloto por ID
router.delete("/piloto/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarPiloto(id);
    res.status(200).json({ message: "Piloto eliminado correctamente" });
  } catch (error) {
    const { status, message } = error;
    res.status(500).json({ error: message });
  }
});

// Registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { userName, password, email, role } = req.body;

  try {
    await addUser({ userName, password, email, role });
    res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    const { status, message } = error;
    res.status(500).json({ error: message });
  }
});

router.post("/auth", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const loginAttempt = await verifyUser({ userName, password });
    if (loginAttempt) {
      req.session.loggedin = true;                
      req.session.name = userName;    	
      res.status(200).json({ message: "Usuario logueado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    const { status, message } = error;
    res.status(500).json({ error: message });
  }
});

export default router;
