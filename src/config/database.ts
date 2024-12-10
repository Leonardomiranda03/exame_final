import { Sequelize } from 'sequelize';

// A URL de conexão pode ser obtida na plataforma de banco de dados (Railway, Render, etc.)
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://exame_final_user:o5qdJejFjYtYVdLiUInWWg0ENZRCXqZb@dpg-ctcc4t3tq21c73fo41kg-a.oregon-postgres.render.com/exame_final';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Desabilita os logs SQL (opcional)
});

export default sequelize;

