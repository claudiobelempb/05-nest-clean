import { Public } from '@/core/infra/auth/public'
import { ZodValidationPipe } from '@/core/infra/http/pipes/zod-validation-pipe'
import { StudentAlreadyExistsError } from '@/domain/student/application/use-cases/errors/student-already-exists-error'
import { StudentRegisterUseCase } from '@/domain/student/application/use-cases/student-register'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const accountCreateRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type AccountCreateResponse = z.infer<typeof accountCreateRequest>

@Controller('/accounts')
@Public()
export class AccountCreateController {
  constructor(private registerStudent: StudentRegisterUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(accountCreateRequest))
  async handle(@Body() body: AccountCreateResponse) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
