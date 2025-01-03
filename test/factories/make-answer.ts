import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { PrismaAnswerMapper } from '@/core/domain/repositories/prisma/mappers/prisma-answer-mapper'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import { Answer, AnswerProps } from '@/domain/answer/enterprice/entities/answer'
import { Injectable } from '@nestjs/common'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}
