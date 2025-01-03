import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/core/infra/database/database.module'
import { FetchRecentQuestionsUseCase } from '@/domain/question/application/user-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@/domain/question/application/user-cases/get-question-by-slug'
import { ChooseQuestionBestAnswerUseCase } from './application/user-cases/choose-question-best-answer'
import { CreateQuestionUseCase } from './application/user-cases/create-question'
import { DeleteQuestionUseCase } from './application/user-cases/delete-question'
import { DeleteQuestionCommentUseCase } from './application/user-cases/delete-question-comment'
import { EditQuestionUseCase } from './application/user-cases/edit-question'
import { FetchQuestionAnswersUseCase } from './application/user-cases/fetch-question-answers'
import { FetchQuestionCommentsUseCase } from './application/user-cases/fetch-question-comments'
import { ChooseQuestionBestAnswerController } from './infra/controllers/choose-question-best-answer.controller'
import { CreateQuestionController } from './infra/controllers/create-question.controller'
import { DeleteQuestionCommentController } from './infra/controllers/delete-question-comment.controller'
import { DeleteQuestionController } from './infra/controllers/delete-question.controller'
import { EditQuestionController } from './infra/controllers/edit-question.controller'
import { FetchQuestionAnswersController } from './infra/controllers/fetch-question-answers.controller'
import { FetchQuestionCommentsController } from './infra/controllers/fetch-question-comments.controller'
import { FetchRecentQuestionsController } from './infra/controllers/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './infra/controllers/get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    DeleteQuestionCommentController,
    FetchQuestionCommentsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    DeleteQuestionCommentUseCase,
    FetchQuestionCommentsUseCase,
  ],
})
export class QuestionModule {}
