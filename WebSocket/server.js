


/**
 * IMP
 * Before running the node js
 * Run - npm i
 */

const webSocket = require("ws");

const server = new webSocket.Server({ port: 3000 });

console.log("Server connected.");

server.on("connection", (socket) => {
  socket.send("Welcome to WebSocket chat!");

  socket.on("message", (message) => {
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === webSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });

  socket.on("close", () => {
    console.log(" Client disconnected");
  });
});
