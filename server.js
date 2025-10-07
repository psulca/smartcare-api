const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./bd.json');
const middlewares = jsonServer.defaults({
  static: false, // Deshabilitar archivos estáticos
  noCors: false  // Permitir CORS
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Usar middlewares
server.use(middlewares);

// Usar el router
server.use(router);

// Iniciar el servidor
server.listen(PORT, HOST, () => {
  console.log(`🚀 SmartCare API Server running on http://${HOST}:${PORT}`);
  console.log(`📊 Database: bd.json`);
  console.log(`🔗 API Endpoints available at http://${HOST}:${PORT}/`);
});
