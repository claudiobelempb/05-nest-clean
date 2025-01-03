import { Module } from '@nestjs/common'

import { CommentOnAnswerUseCase } from '@/domain/answer/application/user-cases/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/question/application/user-cases/comment-on-question'

import { CryptographyModule } from '../../core/infra/cryptography/cryptography.module'
import { StorageModule } from '../../core/infra/storage/storage.module'
import { CommentOnAnswerController } from './infra/controllers/comment-on-answer.controller'
import { CommentOnQuestionController } from './infra/controllers/comment-on-question.controller'

import { DatabaseModule } from '@/core/infra/database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [CommentOnQuestionController, CommentOnAnswerController],
  providers: [CommentOnQuestionUseCase, CommentOnAnswerUseCase],
})
export class CommentModule {}
