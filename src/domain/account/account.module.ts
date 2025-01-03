import { CryptographyModule } from '@/core/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/core/infra/database/database.module'
import { StorageModule } from '@/core/infra/storage/storage.module'
import { Module } from '@nestjs/common'
import { StudentRegisterUseCase } from '../student/application/use-cases/student-register'
import { StudentModule } from '../student/student.module'
import { AccountCreateController } from './infra/controllers/account-create.controller'

@Module({
  imports: [DatabaseModule, StudentModule, CryptographyModule, StorageModule],
  controllers: [AccountCreateController],
  providers: [StudentRegisterUseCase],
})
export class AccountModule {}
