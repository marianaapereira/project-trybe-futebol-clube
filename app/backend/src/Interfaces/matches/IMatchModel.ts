import { IMatch } from './IMatch';

export interface IMatchModel {
  findAllInProgress(inProgress: boolean): Promise<IMatch[]>,
  create(data: Partial<IMatch>): Promise<IMatch>,
  findAll(): Promise<IMatch[]>,
  findById(id: IMatch[ 'id' ]): Promise<IMatch | null>
  update(updatedData: object, id: number): Promise<void>,
}
