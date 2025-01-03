import { Module } from '@nestjs/common'

import { NotificationReadUseCase } from '@/domain/notification/application/use-cases/notification-read'

import { DatabaseModule } from '@/core/infra/database/database.module'
import { NotificationReadController } from '@/domain/notification/infra/controllers/notification-read.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationReadController],
  providers: [NotificationReadUseCase],
})
export class NotificationModule {}
