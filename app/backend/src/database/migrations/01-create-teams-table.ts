import { Model, QueryInterface, DataTypes } from 'sequelize';
import Team from '../../Interfaces/Team';

const TABLE_NAME = 'teams';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Team>>(TABLE_NAME, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable(TABLE_NAME);
  },
};