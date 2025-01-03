import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from '../../domain/repositories/prisma/prisma-questions-repository'
import { PrismaQuestionCommentsRepository } from '../../domain/repositories/prisma/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from '../../domain/repositories/prisma/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from '../../domain/repositories/prisma/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from '../../domain/repositories/prisma/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from '../../domain/repositories/prisma/prisma-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/question/application/repositories/questions-repository'
import { PrismaStudentsRepository } from '../../domain/repositories/prisma/prisma-students-repository'
import { AnswerAttachmentsRepository } from '@/domain/answer/application/repositories/answer-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/answer/application/repositories/answer-comments-repository'
import { AnswersRepository } from '@/domain/answer/application/repositories/answers-repository'
import { QuestionAttachmentsRepository } from '@/domain/question/application/repositories/question-attachments-repository'
import { QuestionCommentsRepository } from '@/domain/question/application/repositories/question-comments-repository'
import { PrismaAttachmentsRepository } from '../../domain/repositories/prisma/prisma-attachments-repository'
import { PrismaNotificationsRepository } from '../../domain/repositories/prisma/prisma-notifications-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { CacheModule } from '../cache/cache.module'
import { StudentsRepository } from '@/domain/student/application/repositories/students-repository'
import { AttachmentsRepository } from '@/domain/attachment/application/repositories/attachments-repository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
