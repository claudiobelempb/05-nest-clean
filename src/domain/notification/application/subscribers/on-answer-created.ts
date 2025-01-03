import { DomainEvents } from '@/core/application/enterprise/events/domain-events'
import { EventHandler } from '@/core/application/enterprise/events/event-handler'
import { AnswerCreatedEvent } from '@/domain/answer/enterprice/events/answer-created-event'
import { NotificationSendUseCase } from '@/domain/notification/application/use-cases/notification-send'
import { QuestionsRepository } from '@/domain/question/application/repositories/questions-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: NotificationSendUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}
