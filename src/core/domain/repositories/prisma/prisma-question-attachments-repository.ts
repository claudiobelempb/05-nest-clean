import { QuestionAttachmentsRepository } from '@/domain/question/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/question/enterprice/entities/question-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  createMany(attachments: QuestionAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
