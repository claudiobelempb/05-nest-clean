import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { PrismaQuestionMapper } from '@/core/domain/repositories/prisma/mappers/prisma-question-mapper'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import {
  Question,
  QuestionProps,
} from '@/domain/question/enterprice/entities/question'
import { Injectable } from '@nestjs/common'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data)

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })

    return question
  }
}
