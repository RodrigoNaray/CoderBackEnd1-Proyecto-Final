import express from "express";
import routes from "./routes/index.js";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productManager from "./dao/fileSystem/productManager.js";
import { connectMongoDB } from "./config/mongoDB.config.js";

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views"); 
app.set("view engine", "handlebars"); 
app.use(express.static("public"));


app.use("/api", routes);

app.use("/", viewsRoutes)

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT} , Link: http://localhost:${PORT}/`);
});

export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo Cliente Conectado");
  const products = await productManager.getProducts();
  socket.emit("products", products);
});
