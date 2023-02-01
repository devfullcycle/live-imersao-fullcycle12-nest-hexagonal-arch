import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { of } from 'rxjs';
import { ListCreatedEvent } from './events/list-created.event';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: ListGatewayInMemory;
  const eventEmitterMock = {
    emit: jest.fn(),
  };
  beforeEach(() => {
    listPersistenceGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, eventEmitterMock as any);
  });

  it('deve criar uma lista', async () => {
    const list = await service.create({ name: 'my list' });
    expect(listPersistenceGateway.items).toEqual([list]);
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'list.created',
      new ListCreatedEvent(list),
    );
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
