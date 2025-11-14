const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);

server.use(auth);

server.use(router);

// Export the Server API for Vercel
module.exports = server;

