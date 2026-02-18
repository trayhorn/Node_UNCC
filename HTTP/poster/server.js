const { SESSIONS, USERS, POSTS } = require("./db.js");
const Butter = require("../butter.js");

const PORT = 8000;

const server = new Butter();

// For Authentication
server.beforeEach((req, res, next) => {
  const routesToAuthenticate = [
    "GET /api/user",
    "PUT /api/user",
    "POST /api/posts",
    "DELETE /api/logout",
  ];

  if (routesToAuthenticate.indexOf(req.method + " " + req.url) !== -1) {
    if (req.headers.cookie) {
      const token = req.headers.cookie.split("=")[1];

      const session = SESSIONS.find((session) => session.token === token);

      if (session) {
        req.userId = session.userId;
        return next();
      } else {
        res.status(401).json({ error: "Unathorized" });
      }
    } else {
      return res.status(401).json({ error: "Unathorized" });
    }
  } else {
    next();
  }
});

// For parsing JSON body
server.beforeEach((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf-8");
    });

    req.on("end", () => {
      body = JSON.parse(body);
      req.body = body;
      return next();
    });
  } else {
    next();
  }
});

// For different routes that need index.html
server.beforeEach((req, res, next) => {
  const paths = ["/", "/login", "/profile", "/new-post"];

  if (paths.includes(req.url) && req.method === "GET") {
    return res.status(200).sendFile("./public/index.html", "text/html");
  } else {
    next();
  }
});

// ------ Files Routes ------

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

// ------ JSON Routes ------

// Log a user in and give them a token
server.route("post", "/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = USERS.find((user) => user.username === username);

  // Check the password
  if (!(user && user.password === password)) {
    res.status(401).json({ error: "Invalid username or password" });
  }

  const token = Math.floor(Math.random() * 10000000000).toString();

  SESSIONS.push({ userId: user.id, token });

  res.setHeader("Set-Cookie", `token=${token}; Path=/;`);
  res.status(200).json({ message: "Logged in successfully!" });
});

server.route("get", "/api/user", (req, res) => {
  const user = USERS.find((user) => user.id === req.userId);
  res.json({ username: user.username, name: user.name });
});

server.route("put", "/api/user", (req, res) => {
  const { name, password, username } = req.body;

  const user = USERS.find((user) => user.id === req.userId);
  user.name = name;
  user.username = username;
  if (password) user.password = password;

  res.status(200).json({
    username: user.username,
    name: user.name,
    password_status: password ? "updated" : "unchanged",
  });
});

server.route("delete", "/api/logout", (req, res) => {
  // Remove the session obj from the SESSIONS array
  const sessionIndex = SESSIONS.findIndex(
    (session) => (session.userId = req.userId),
  );
  if (sessionIndex !== -1) SESSIONS.splice(sessionIndex, 1);

  res.setHeader(
    "Set-Cookie",
    `token=deleted; Path=/; Expires:Thu, 01 Jan 1970 00:00:00 GMT`,
  );
  res.status(200).json({ message: "Logged out successfully" });
});

server.route("post", "/api/posts", (req, res) => {
  const { title, body } = req.body;

  const post = {
    id: POSTS.length + 1,
    title,
    body,
    userId: req.userId,
  };

  POSTS.unshift(post);
  res.status(201).json(post);
});

server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);

    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});