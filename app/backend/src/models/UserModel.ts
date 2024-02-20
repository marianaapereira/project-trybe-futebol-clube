import SequelizeUser from '../database/models/SequelizeUser';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { NewEntity } from '../Interfaces';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const dbData = await this.model.create(data);
    const { id, username, role, email, password }: IUser = dbData;

    return { id, username, role, email, password };
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();

    return dbData.map(
      ({ id, username, role, email, password }) => ({ id, username, role, email, password }),
    );
  }

  async findById(id: IUser[ 'id' ]): Promise<IUser | null> {
    const dbData = await this.model.findByPk(id);

    if (dbData == null) return null;

    const { username, role, email, password }: IUser = dbData;

    return { id, username, role, email, password };
  }
}
