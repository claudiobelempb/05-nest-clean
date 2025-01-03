import { AnswerAttachmentsRepository } from '@/domain/answer/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/answer/enterprice/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  createMany(attachments: AnswerAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
