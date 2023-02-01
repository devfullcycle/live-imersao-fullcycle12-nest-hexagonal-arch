import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { of } from 'rxjs';

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  let listIntegrationGateway: ListGatewayInMemory;
  beforeEach(() => {
    listPersistenceGateway = new ListGatewayInMemory();
    listIntegrationGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, listIntegrationGateway);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'my list' });
    expect(listPersistenceGateway.items).toEqual([list]);
    expect(listIntegrationGateway.items).toEqual([list]);
  });
  // let service: ListsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
