import { PaginationParams } from '@/core/application/repositories/pagination-params'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import { AnswersRepository } from '@/domain/answer/application/repositories/answers-repository'
import { Answer } from '@/domain/answer/enterprice/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerMapper } from './mappers/prisma-answer-mapper'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })
    if (!answer) {
      return null
    }
    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })
    return answers.map(answer => PrismaAnswerMapper.toDomain(answer))
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.create({
      data,
    })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prisma.answer.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: { id: answer.id.toString() },
    })
  }
}
