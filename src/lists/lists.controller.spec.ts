import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

describe('ListsController', () => {
  let controller: ListsController;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        ListsService,
        ListGatewayInMemory,
        EventEmitter2,
        {
          provide: 'ListPersistenceGateway',
          useExisting: ListGatewayInMemory,
        },
        {
          provide: 'EventEmitter',
          useExisting: EventEmitter2,
        },
      ],
    }).compile();

    controller = module.get<ListsController>(ListsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
