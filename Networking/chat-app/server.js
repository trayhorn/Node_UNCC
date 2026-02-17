const net = require("net");

const server = net.createServer();

const port = 3008;
const host = "127.0.0.1";
// const host = '192.168.0.101';

const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server");

  // Assigning a userID on a server
  const clientId = clients.length + 1;

  clients.map(({socket}) => {
    socket.write(`User ${clientId} joined`);
  });

  // Sending userID back to client
  socket.write(`id-${clientId}`);

  socket.on("error", () => {
    clients.map(({ socket }) => {
      socket.write(`User ${clientId} left!`);
    });
  });

  socket.on("end", () => {
    clients.map(({ socket }) => {
      socket.write(`User ${clientId} left`);
    });
  });

  // Creating a user object
  clients.push({
    id: clientId.toString(),
    socket,
    name: ''
  });

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);

    clients.forEach(({ socket }) => {
      socket.write(`> User ${id}: ${message}`);
    });
  });
});

server.listen(port, host, () => {
  console.log("Opened server on ", server.address());
});