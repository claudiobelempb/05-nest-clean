import { Either, left, right } from '@/core/application/enterprise/either'
import { NotAllowedError } from '@/core/infra/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/infra/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface NotificationReadRequest {
  recipientId: string
  notificationId: string
}

type NotificationReadResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

@Injectable()
export class NotificationReadUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: NotificationReadRequest): Promise<NotificationReadResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
