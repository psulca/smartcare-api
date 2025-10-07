const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

// Bind router.db to server.db
server.db = router.db;

// Configure CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Use middlewares
server.use(middlewares);

// Use auth middleware
server.use(auth);

// Use router
server.use(router);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 SmartCare API Server running on http://${HOST}:${PORT}`);
  console.log(`📊 Database: db.json`);
  console.log(`🔗 API Endpoints available at http://${HOST}:${PORT}/`);
  console.log(`👤 Users: http://${HOST}:${PORT}/users`);
  console.log(`🚗 Vehicles: http://${HOST}:${PORT}/vehicles`);
  console.log(`🔐 Auth endpoints: /login, /register, /me`);
  console.log(`🌐 CORS enabled for all origins`);
});
