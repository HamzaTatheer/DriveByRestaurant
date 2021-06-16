var express = require("express");
var socketio = require("socket.io");
var http = require("http");

module.exports = function (app) {

  // Expose the node_modules folder as static resources (to access socket.io.js in the browser)
  app.use("/static", express.static("node_modules"));


  const server = http.createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", function (socket) {
    socket.on("message",(data)=>{
      console.log(data)
      socket.broadcast.emit("message",data);
    })

    socket.on("status_change",({order_id,order_status})=>{
      socket.broadcast.emit("status_change",data);
    })


  });


  let port = process.env.SOCKET_PORT || 9000;
  server.listen(port, () => {
    console.log(`Socket IO Server has started lisenting on port ${port}`);
  });

};