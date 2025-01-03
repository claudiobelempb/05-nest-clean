import { CurrentUser } from '@/core/infra/auth/current-user-decorator'
import { UserPayload } from '@/core/infra/auth/jwt.strategy'
import { NotificationReadUseCase } from '@/domain/notification/application/use-cases/notification-read'
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('/notifications/:notificationId/read')
export class NotificationReadController {
  constructor(private readNotification: NotificationReadUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('notificationId') notificationId: string,
  ) {
    const result = await this.readNotification.execute({
      notificationId,
      recipientId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
