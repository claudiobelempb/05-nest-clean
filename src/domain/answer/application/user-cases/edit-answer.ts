import { Either, left, right } from '@/core/application/enterprise/either'
import { AnswersRepository } from '../repositories/answers-repository'

import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { NotAllowedError } from '@/core/infra/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/infra/errors/resource-not-found-error'
import { AnswerAttachmentsRepository } from '@/domain/answer/application/repositories/answer-attachments-repository'
import { Injectable } from '@nestjs/common'
import { Answer } from '../../enterprice/entities/answer'
import { AnswerAttachment } from '../../enterprice/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprice/entities/answer-attachment-list'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
