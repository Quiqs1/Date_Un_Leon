import express from 'express';
import cors from 'cors';
import prisma from './db.js'; 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});