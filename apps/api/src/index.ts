import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pathToFileURL } from 'node:url';
import prisma from './db.js'; 

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.CORS_ORIGINS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: allowedOrigins?.length ? allowedOrigins : false,
  methods: ['GET', 'HEAD', 'OPTIONS'],
}));
app.use(express.json({ limit: '100kb' }));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API Date Un Leon funcionando' });
});

app.get('/db-check', async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'ok', message: 'Conexión a la base de datos exitosa' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Fallo al conectar a la base de datos' });
  }
});

export { app };

const isMainModule = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}