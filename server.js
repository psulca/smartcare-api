const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

server.options('*', cors());

server.use(middlewares);

server.use(auth);

server.use(router);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`SmartCare API Server running on http://${HOST}:${PORT}`);
  console.log(`API Endpoints available at http://${HOST}:${PORT}/`);
  console.log(`Users: http://${HOST}:${PORT}/users`);
  console.log(`Vehicles: http://${HOST}:${PORT}/vehicles`);
  console.log(`Auth endpoints: /login, /register, /me`);
});
