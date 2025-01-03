import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'

import { PrismaQuestionCommentMapper } from '@/core/domain/repositories/prisma/mappers/prisma-question-comment-mapper'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/question/enterprice/entities/question-comment'
import { Injectable } from '@nestjs/common'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(
    data: Partial<QuestionCommentProps> = {},
  ): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data)

    await this.prisma.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    })

    return questionComment
  }
}
