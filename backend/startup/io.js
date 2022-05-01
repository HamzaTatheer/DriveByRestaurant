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

    socket.on("status_change",(data)=>{
      console.log(data);
      let {order_id,order_status} = data;
      console.log(order_id);
      console.log(order_status);
      console.log("*******");
      socket.broadcast.emit("status_change",{order_id,order_status});
    })


  });

  return server;


};