import express from "express";

import {
  agregarPiloto,
  listarPilotos,
  eliminarPiloto,
  actualizarPiloto,
  obtenerDetallesPiloto,
  obtenerDetallesPilotoUpdate,
} from "./pilotoController.js";

const router = express.Router();

router.get("/Vuelos-con-CM", async (req, res) => {
  try {
    const pilotos = await listarPilotos();
    res.render("pages/pilotos", { pilotos });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo piloto
router.post("/pilotos", async (req, res) => {
  const { nombre_piloto, apellido_piloto, licencia_piloto } = req.body;

  try {
    await agregarPiloto({ nombre_piloto, apellido_piloto, licencia_piloto });
    res.redirect("/");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Detalles del piloto
router.get("/detalles/:id", async (req, res) => {
  const PilotoId = req.params.id;

  try {
    const piloto = await obtenerDetallesPiloto(PilotoId);
    res.render("pages/detalles_piloto", { piloto });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Mostrar formulario para actualizar un piloto
router.get("/formulario-actualizar-piloto/:id", async (req, res) => {
  const PilotoID = req.params.id;

  try {
    const piloto = await obtenerDetallesPilotoUpdate(PilotoID);

    res.render("pages/update_piloto", { piloto });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar un piloto por ID
router.post("/actualizar-piloto/:id", async (req, res) => {
  const { nombre_piloto, apellido_piloto, licencia_piloto } = req.body;
  const id = req.params.id;

  try {
    await actualizarPiloto(id, {
      nombre_piloto,
      apellido_piloto,
      licencia_piloto,
    });

    res.redirect("/Vuelos-con-CM");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para borrar un piloto por ID
router.post("/borrar-piloto/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarPiloto(id);
    res.redirect("/Vuelos-con-CM");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default router;
