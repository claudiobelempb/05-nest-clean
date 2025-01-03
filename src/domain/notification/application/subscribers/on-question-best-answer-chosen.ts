import { DomainEvents } from '@/core/application/enterprise/events/domain-events'
import { EventHandler } from '@/core/application/enterprise/events/event-handler'
import { AnswersRepository } from '@/domain/answer/application/repositories/answers-repository'
import { NotificationSendUseCase } from '@/domain/notification/application/use-cases/notification-send'
import { QuestionBestAnswerChosenEvent } from '@/domain/question/enterprice/events/question-best-answer-chosen-event'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: NotificationSendUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')}" foi escolhida pelo autor!"`,
      })
    }
  }
}
