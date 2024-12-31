import { Module } from '@nestjs/common'

import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer-comment'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/answer/edit-answer'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/answer/fetch-answer-comments'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/auth/authenticate-student'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment/comment-on-answer'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment/comment-on-question'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/question/answer-question'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/question/choose-question-best-answer'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/question/delete-question'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/question/delete-question-comment'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/question/edit-question'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-answers'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-comments'

import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { CreateAccountController } from './controllers/account/create-account.controller'
import { AnswerQuestionController } from './controllers/answer/answer-question.controller'
import { DeleteAnswerCommentController } from './controllers/answer/delete-answer-comment.controller'
import { DeleteAnswerController } from './controllers/answer/delete-answer.controller'
import { EditAnswerController } from './controllers/answer/edit-answer.controller'
import { FetchAnswerCommentsController } from './controllers/answer/fetch-answer-comments.controller'
import { AuthenticateController } from './controllers/auth/authenticate.controller'
import { CommentOnAnswerController } from './controllers/comment/comment-on-answer.controller'
import { CommentOnQuestionController } from './controllers/comment/comment-on-question.controller'
import { ChooseQuestionBestAnswerController } from './controllers/question/choose-question-best-answer.controller'
import { CreateQuestionController } from './controllers/question/create-question.controller'
import { DeleteQuestionCommentController } from './controllers/question/delete-question-comment.controller'
import { DeleteQuestionController } from './controllers/question/delete-question.controller'
import { EditQuestionController } from './controllers/question/edit-question.controller'
import { FetchQuestionAnswersController } from './controllers/question/fetch-question-answers.controller'
import { FetchQuestionCommentsController } from './controllers/question/fetch-question-comments.controller'

import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/attachment/upload-and-create-attachment'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/question/get-question-by-slug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student'
import { UploadAttachmentController } from './controllers/attachment/upload-attachment.controller'
import { ReadNotificationController } from './controllers/notification/read-notification.controller'
import { FetchRecentQuestionsController } from './controllers/question/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './controllers/question/get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
    ReadNotificationController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase,
    ReadNotificationUseCase,
  ],
})
export class HttpModule {}
