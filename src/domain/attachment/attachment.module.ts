import { Module } from '@nestjs/common'

import { CryptographyModule } from '../../core/infra/cryptography/cryptography.module'
import { StorageModule } from '../../core/infra/storage/storage.module'

import { DatabaseModule } from '@/core/infra/database/database.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/attachment/application/user-cases/upload-and-create-attachment'
import { UploadAttachmentController } from '@/domain/attachment/infra/controllers/upload-attachment.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [UploadAttachmentController],
  providers: [UploadAndCreateAttachmentUseCase],
})
export class AttachmentModule {}
