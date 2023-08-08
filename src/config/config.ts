import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'ebtikar',
  username: 'root',
  password: '',
  host: 'localhost', // Use 'localhost' for a local MySQL server
  port: 3306,        // Port number for MySQL (default is 3306)
  dialect: 'mysql',
});

export default sequelize;
