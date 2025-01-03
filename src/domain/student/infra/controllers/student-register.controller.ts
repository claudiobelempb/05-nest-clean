import { StudentAlreadyExistsError } from '@/domain/student/application/use-cases/errors/student-already-exists-error'
import { ZodValidationPipe } from '@/core/infra/http/pipes/zod-validation-pipe'
import { StudentRegisterUseCase } from '@/domain/student/application/use-cases/student-register'
import { Public } from '@/core/infra/auth/public'

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

const studentRegisterRequest = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type StudentRegisterRequest = z.infer<typeof studentRegisterRequest>

@Controller('/accounts')
@Public()
export class StudentRegisterController {
  constructor(private registerStudent: StudentRegisterUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(studentRegisterRequest))
  async handle(@Body() body: StudentRegisterRequest) {
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
