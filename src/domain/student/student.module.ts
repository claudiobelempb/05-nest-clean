import { CryptographyModule } from '@/core/infra/cryptography/cryptography.module'
import { StorageModule } from '@/core/infra/storage/storage.module'

import { StudentRegisterUseCase } from './application/use-cases/student-register'

import { Module } from '@nestjs/common'
import { StudentAuthenticateUseCase } from './application/use-cases/student-authenticate'
import { StudentAuthenticateController } from './infra/controllers/student-authenticate.controller'
import { StudentRegisterController } from './infra/controllers/student-register.controller'
import { DatabaseModule } from '@/core/infra/database/database.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [StudentRegisterController, StudentAuthenticateController],
  providers: [StudentRegisterUseCase, StudentAuthenticateUseCase],
  exports: [],
})
export class StudentModule {}
