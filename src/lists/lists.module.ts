import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { ListGatewayHttp } from './gateways/list-gateway-http';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
//import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { BullModule } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateListInCrmJob } from './jobs/create-list-in-crm.job';
import { PublishListCreatedListener } from './listeners/publish-list-created.listener';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 1 },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    //CreateListInCrmListener,
    PublishListCreatedListener,
    CreateListInCrmJob,
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewaySequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}