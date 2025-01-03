import { Module } from '@nestjs/common'

import { CommentOnAnswerUseCase } from '@/domain/answer/application/user-cases/comment-on-answer'
import { DeleteAnswerUseCase } from '@/domain/answer/application/user-cases/delete-answer'
import { DeleteAnswerCommentUseCase } from '@/domain/answer/application/user-cases/delete-answer-comment'
import { EditAnswerUseCase } from '@/domain/answer/application/user-cases/edit-answer'
import { FetchAnswerCommentsUseCase } from '@/domain/answer/application/user-cases/fetch-answer-comments'

import { CryptographyModule } from '../../core/infra/cryptography/cryptography.module'
import { StorageModule } from '../../core/infra/storage/storage.module'

import { DatabaseModule } from '@/core/infra/database/database.module'
import { CommentOnAnswerController } from '@/domain/comment/infra/controllers/comment-on-answer.controller'
import { DeleteAnswerCommentController } from './infra/controllers/delete-answer-comment.controller'
import { DeleteAnswerController } from './infra/controllers/delete-answer.controller'
import { EditAnswerController } from './infra/controllers/edit-answer.controller'
import { FetchAnswerCommentsController } from './infra/controllers/fetch-answer-comments.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    EditAnswerController,
    DeleteAnswerController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchAnswerCommentsController,
  ],
  providers: [
    CommentOnAnswerUseCase,
    DeleteAnswerUseCase,
    DeleteAnswerCommentUseCase,
    EditAnswerUseCase,
    FetchAnswerCommentsUseCase,
  ],
})
export class AnswerModule {}
