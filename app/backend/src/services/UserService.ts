import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import UserModel from '../models/UserModel';
import { NewEntity } from '../Interfaces';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async createUser(user: NewEntity<IUser>): Promise<ServiceResponse<IUser>> {
    const newUser = await this.userModel.create(user);

    return { status: 'SUCCESSFUL', data: newUser };
  }

  public async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();

    return { status: 'SUCCESSFUL', data: allUsers };
  }

  public async getUserById(id: number): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);

    if (!user) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };

    return { status: 'SUCCESSFUL', data: user };
  }
}
