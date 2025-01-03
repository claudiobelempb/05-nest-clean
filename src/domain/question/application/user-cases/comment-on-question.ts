import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { QuestionComment } from '@/domain/question/enterprice/entities/question-comment'
import { QuestionCommentsRepository } from '@/domain/question/application/repositories/question-comments-repository'
import { Either, left, right } from '@/core/application/enterprise/either'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/infra/errors/resource-not-found-error'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
