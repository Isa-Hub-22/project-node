const express = require("express");
const moviesRouter = require('./routes/movies.routes.js');
const cinemaRouter = require('./routes/cinema.routes.js');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const createError = require ('./utils/erros/create-error.js');
const passport = require('passport');
const userRouter = require('./routes/user.routes.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { patch } = require("./routes/movies.routes.js");
const path = require("path");

const DB_URL = "mongodb+srv://root:1k6NEWRHPhslAuPu@moneyheist.alb4hxg.mongodb.net/?retryWrites=true&w=majority";   



//Conecta con la base de datos
connect();


const PORT = 3000;
const server = express();

//Evita errores de CORS
server.use(cors());

//Parsea los body de las peticiones POST y PUT que vienen como JSON
server.use(express.json());
//Parsea los body de las peticiones POST y PUT que vienen como STRING o ARRAY
server.use(express.urlencoded({extended: false}));
// Express.static crea la ruta en nuestro servidor de archivos estáticos        
server.use(express.static(path.join(__dirname,'public')));

//Inicializar y configurar passport
//Ejecuta passport
require('./utils/authentication/passport.js');

server.use(session({
    secret:'hola_mundo',
    resave: false,
    saveUninitialized : false,
    cookie: {
        maxAge: 120000 
    },
    store: MongoStore.create({
        mongoUrl: DB_URL
    })
}));

server.use(passport.initialize());
server.use(passport.session());

//Llama al end point de movies/cinema/user
server.use('/user', userRouter);
server.use('/movies', moviesRouter);
server.use('/cinema', cinemaRouter);

//* --> rutas de errores no identificadas entran por aquí
server.use('*', (req, res, next) => {
    next(createError('Esta ruta no existe', 404));
});

// Manejo de errores
// Además de los típicos req, res y next se añade un parámetro error
// - Error: error emitido desde el paso previo del servidor
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});
server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});