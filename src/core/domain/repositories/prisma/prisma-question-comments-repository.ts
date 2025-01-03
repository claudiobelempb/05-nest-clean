import { PaginationParams } from '@/core/application/repositories/pagination-params'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import { CommentWithAuthor } from '@/domain/answer/enterprice/entities/value-objects/comment-with-author'
import { QuestionCommentsRepository } from '@/domain/question/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/question/enterprice/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionCommentMapper } from './mappers/prisma-question-comment-mapper'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: { id },
    })
    if (!questionComment) {
      return null
    }
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = await this.prisma.comment.findMany({
      where: { questionId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })
    return questionComments.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    throw new Error('Method not implemented.')
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.create({ data })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    this.prisma.comment.delete({ where: { id: questionComment.id.toString() } })
  }
}
