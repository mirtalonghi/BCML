import express from "express";
import cors from "cors";
import router from "./src/frontRouter.js"; // Importa el enrutador
import apiRouter from "./src/apiRouter.js"; // Importa el enrutador de api
import session from "express-session";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

//Establece el motor de plantillas
app.set("view engine", "ejs");
app.set("views", "./views");

app.post('/', (req, res)=> {
	if (req.session.loggedin) {
		res.render('inicio',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('login', {
			login:false,			
		});				
	}
	res.end();
});

app.get('/login',(req, res)=>{
  res.render('login');
})

app.get('/register',(req, res)=>{
  res.render('register');
})

app.use(session({
      secret:'secret',
      resave:' true',
      saveUninitialized: 'true'
}));

// Carga la página de inicio cambio app.get ("/") a ("/login y en render de res.render("inicio") a res.render ()
app.get("/", (req, res) => {
	if (req.session.loggedin) {
		res.render('inicio',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('login', {
			login:false,			
		});				
	}
	res.end();
});

// Usa el enrutador para las rutas relacionadas con estudiantes
app.use("/", router);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3600;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://127.0.0.1:${PORT}`);
});
