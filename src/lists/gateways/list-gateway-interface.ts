import { List } from '../entities/list.entity';

export interface ListGatewayInterface {
  create(list: List): Promise<List>;
  findAll(): Promise<List[]>;
  findById(id: number): Promise<List>;
}
