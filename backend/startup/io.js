var express = require("express");
var socketio = require("socket.io");
var http = require("http");

module.exports = function (app) {
  const server = http.createServer(app);
  const io = socketio(server);

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use("/static", express.static("node_modules"));

  //ConnectionStatus(io);

  let port = process.env.SOCKET_PORT || 9000;
  server.listen(port, () => {
    console.log(`Socket IO Server has started lisenting on port ${port}`);
  });
};