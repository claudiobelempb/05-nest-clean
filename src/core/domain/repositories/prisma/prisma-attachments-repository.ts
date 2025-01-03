import { AttachmentsRepository } from '@/domain/attachment/application/repositories/attachments-repository'
import { Attachment } from '@/domain/attachment/enterprice/entities/attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  create(attachment: Attachment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
