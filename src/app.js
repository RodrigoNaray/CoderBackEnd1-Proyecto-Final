import express from "express";
import routes from "./routes/index.js";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productManager from "./persistance/fileSystem/productManager.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import envs from "./config/envs.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import cookieParser from "cookie-parser";

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); // Inicia el motor del la plantilla
app.set("views", __dirname + "/views"); // Indicamos que ruta se encuentras las vistas
app.set("view engine", "handlebars"); // Indicamos con que motor vamos a utilizar las vistas 
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: envs.SECRET_CODE, // palabra secreta
    resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
    saveUninitialized: true, // Guarda la session
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas de la API
app.use("/api", routes);


//Rutas de las vistas
app.use("/", viewsRoutes)


const httpServer = app.listen(envs.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envs.PORT} , Link: http://localhost:${envs.PORT}/`);
});

export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo Cliente Conectado");
  const products = await productManager.getProducts();
  socket.emit("products", products);
});
