import express from "express";
import http from "http";

const router = express.Router();

router.get("/pilotos", async (request, response) => {
  try {
    http.get('http://localhost:3600/api/pilotos', res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data.push(chunk);
      });
    
      res.on('end', () => {
        console.log('Response ended: ');
        const pilotos = JSON.parse(Buffer.concat(data).toString());
        response.render("pages/pilotos", {pilotos});
      });
    }).on('error', err => {
      console.log('Error: ', err.message);
    });
  } catch (error) {
    const { status, message } = error;
    response.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo piloto
router.post("/pilotos", async (request, response) => {
  const { nombre_piloto, apellido_piloto, licencia_piloto } = request.body;

  try {
    const postData = JSON.stringify({ nombre_piloto, apellido_piloto, licencia_piloto });

    const options = {
      hostname: 'localhost',
      port: 3600,
      path: '/api/pilotos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    
    http.request(options, (res) => {
      console.log("hola")
      let data = [];
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data.push(chunk);
      });
      res.on('end', () => {
        response.redirect("/pilotos");
      });
    });
  } catch (error) {
    const { status, message } = error;
    response.status(status || 500).json({ error: message });
  }
});

// Detalles del piloto
router.get("/piloto/:id", async (request, response) => {
  const pilotoId = request.params.id;
  try {
    http.get('http://localhost:3600/api/piloto' + pilotoId, res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data.push(chunk);
      });
    
      res.on('end', () => {
        console.log('Response ended: ');
        const piloto = JSON.parse(Buffer.concat(data).toString());
        res.render("pages/detalles_piloto", { piloto });
      });
    }).on('error', err => {
      console.log('Error: ', err.message);
    });
  } catch (error) {
    response.status(500).json({ error: message });
  }
});

// Mostrar formulario para actualizar un piloto
router.get("/formulario-actualizar-piloto/:id", async (request, response) => {
  const pilotoID = request.params.id;
  try {
    http.get('http://localhost:3600/api/piloto' + pilotoId, res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data.push(chunk);
      });
    
      res.on('end', () => {
        console.log('Response ended: ');
        const piloto = JSON.parse(Buffer.concat(data).toString());
        res.render("pages/update_piloto", { piloto });
      });
    }).on('error', err => {
      console.log('Error: ', err.message);
    });
  } catch (error) {
    response.status(500).json({ error: message });
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

    res.redirect("/pilotos");
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
    res.redirect("/pilotos");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { userName, password, email, role } = req.body;

  try {
    await addUser({ userName, password, email, role });
    res.redirect("/login");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

router.post("/auth", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const loginAttempt = await verifyUser({ userName, password });
    if (loginAttempt) {
      req.session.loggedin = true;                
      req.session.name = userName;    	
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default router;
