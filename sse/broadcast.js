const express = require("express");
const path = require("path");

const PORT = 3001

const app = express();


app.use(express.static(path.join(__dirname, "public")));

const clients = [];
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Client Connected");

  const intervalId = setInterval(() => {
    res.write(": keep-alive\n\n");
  }, 15000);

  const user = { res };

  clients.push(user);
  console.log("🔌 Client connected. Total:", clients.length);
  req.on("close", () => {
    clearInterval(intervalId);
    clients.splice(clients.indexOf(user), 1);
    console.log("Client Disconnected -");
  });
});

app.get('/notify', (req, res) => {
    const msg = req.query.msg || 'No Message'

    clients?.forEach(client => {
        client.res.write(`data: ${msg}\n\n`)
    })

    console.log("Message broadcasted from server - ", msg)
    res.send('Broadcast sent')
})

app.listen(PORT, () => {
    console.log(`Broadcast event connected on ${PORT}`)
})
