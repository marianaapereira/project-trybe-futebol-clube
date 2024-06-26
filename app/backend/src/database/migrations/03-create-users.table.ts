import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IUser } from '../../Interfaces/users/IUser';

const TABLE_NAME = 'users';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IUser>>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};