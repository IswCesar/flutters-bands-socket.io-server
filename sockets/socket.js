const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Skillet"));
bands.addBand(new Band("Rev theory"));
bands.addBand(new Band("Nickelback"));
bands.addBand(new Band("AC/DC"));
bands.addBand(new Band("Green Day"));

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("msg", (payload) => {
    console.log("Msg from client: ", payload);
    // Emit to all clients
    io.emit("msg", { admin: "Socket consumed" });
  });

  client.on("vote-band", (payload) => {
    console.log("Cliente ha votado");
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    console.log("Cliente ha registrado nueva banda");
    const newBand = new Band((name = payload.name));
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    console.log("Cliente ha eliminado una banda");
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  // client.on("new-message", (payload) => {
  //   console.log(payload);
  //   // Emit to all clients exepts who had sent
  //   client.broadcast.emit("new-message", payload);
  // });
});
