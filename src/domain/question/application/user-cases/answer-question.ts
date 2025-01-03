import { Either, right } from '@/core/application/enterprise/either'
import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { Answer } from '@/domain/answer/enterprice/entities/answer'
import { AnswerAttachment } from '@/domain/answer/enterprice/entities/answer-attachment'
import { AnswerAttachmentList } from '@/domain/answer/enterprice/entities/answer-attachment-list'
import { Injectable } from '@nestjs/common'
import { AnswersRepository } from '../../../answer/application/repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  authorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
