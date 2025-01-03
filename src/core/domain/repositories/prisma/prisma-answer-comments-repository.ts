import { PaginationParams } from '@/core/application/repositories/pagination-params'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import { AnswerCommentsRepository } from '@/domain/answer/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/answer/enterprice/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/answer/enterprice/entities/value-objects/comment-with-author'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerCommentMapper } from './mappers/prisma-answer-comment-mapper'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    })
    if (!answerComment) {
      return null
    }
    return PrismaAnswerCommentMapper.toDomain(answerComment)
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerCommnets = this.prisma.comment.findMany({
      where: {
        answerId,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })
    return (await answerCommnets).map(PrismaAnswerCommentMapper.toDomain)
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    throw new Error('Method not implemented.')
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)
    this.prisma.comment.create({ data })
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    this.prisma.comment.delete({ where: { id: answerComment.id.toString() } })
  }
}
