const Butter = require("../butter.js");

const PORT = 8060;

const server = new Butter();

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/", (req, res) => {
  res.sendFile("./public/main.html", "text/javascript");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
})