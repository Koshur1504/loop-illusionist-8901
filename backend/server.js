const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

// Set up the authentication middleware
server.use(auth);

// Enable CORS by adding this line
server.use(cors());

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`JSON Server with authentication is running on port ${port}`);
});

