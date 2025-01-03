import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import { QuestionAttachmentsRepository } from '@/domain/question/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/question/enterprice/entities/question-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionAttachmentMapper } from './mappers/prisma-question-attachment-mapper'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  createMany(attachments: QuestionAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    })
    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({ where: { id: questionId } })
  }
}
