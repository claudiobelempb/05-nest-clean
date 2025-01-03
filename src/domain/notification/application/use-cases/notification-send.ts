import { Either, right } from '@/core/application/enterprise/either'
import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

export interface NotificationSendRequest {
  recipientId: string
  title: string
  content: string
}

export type NotificationSendResponse = Either<
  null,
  {
    notification: Notification
  }
>

@Injectable()
export class NotificationSendUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: NotificationSendRequest): Promise<NotificationSendResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
