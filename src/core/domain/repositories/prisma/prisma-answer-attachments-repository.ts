import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import { AnswerAttachmentsRepository } from '@/domain/answer/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/answer/enterprice/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerAttachmentMapper } from './mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: { answerId },
    })
    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    this.prisma.attachment.deleteMany({ where: { answerId } })
  }
}
