import express from 'express';
import pranchaRoutes from './routes/pranchaRoutes.';
import sequelize from './config/database';

const app = express();
app.use(express.json());

app.use(pranchaRoutes);

sequelize
  .authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((error) => console.error('Erro ao conectar ao banco de dados', error));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

