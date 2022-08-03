// preparacion del servidor
/* const { networkInterfaces } = require("os");
const nets = networkInterfaces();
const localhost = nets["Loopback Pseudo-Interface 1"][1].address; */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");

// Crear el servidor de Express
const app = express();

// Base de datos -
dbConnection();

// CORS
app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("*", (req, res) => {
  res.sendFile(__dirname, "/public/index.html");
}); // para que no se muestre error en el navegador

// Oye peticiones
app.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT}`
  );
});
