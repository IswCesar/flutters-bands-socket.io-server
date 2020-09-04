const express = require("express");
const path = require("path");
const { Console } = require("console");
require("dotenv").config();

// Express app
const app = express();

// Node Server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Public path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// Config
server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(error);
  console.log("Servidor corriendo en puerto:", process.env.PORT);
});
