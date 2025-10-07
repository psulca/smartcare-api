const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

// 🔧 Bind router.db to server.db (requerido por json-server-auth)
server.db = router.db;

// ✅ CORS middleware (habilitado para cualquier origen)
server.use(cors({
  origin: true, // Permite cualquier origen
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
}));

// ✅ Manejar preflight correctamente
server.options('*', cors());

// ✅ Middlewares por defecto de json-server
server.use(middlewares);

// ✅ Middleware de autenticación (debe ir antes del router)
server.use(auth);

// ✅ Rutas principales
server.use(router);

// ✅ Configuración de puerto y host
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
