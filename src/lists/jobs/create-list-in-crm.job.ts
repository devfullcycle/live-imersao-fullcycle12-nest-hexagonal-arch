import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { ListCreatedEvent } from '../events/list-created.event';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGatewayInterface,
  ) {}

  @Process('list.created')
  async handle(job: Job<ListCreatedEvent>) {
    console.log('job processando...');
    console.log(job.data);
    const event = job.data;
    await this.listIntegrationGateway.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log('CreateListInCrmJob', error);
  }
}
