import { StudentModule } from '@/domain/student/student.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './core/infra/auth/auth.module'
import { envSchema } from './core/infra/env/env'
import { EnvModule } from './core/infra/env/env.module'

import { EventsModule } from '@/core/infra/events/events.module'
import { AccountModule } from './domain/account/account.module'
import { AnswerModule } from './domain/answer/answer.module'
import { AttachmentModule } from './domain/attachment/attachment.module'
import { CommentModule } from './domain/comment/comment.module'
import { NotificationModule } from './domain/notification/notification.module'
import { QuestionModule } from './domain/question/question.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
    EventsModule,
    StudentModule,
    AccountModule,
    AnswerModule,
    AttachmentModule,
    CommentModule,
    NotificationModule,
    QuestionModule,
  ],
})
export class AppModule {}
