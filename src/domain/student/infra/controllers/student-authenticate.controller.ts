import { WrongCredentialsError } from '@/domain/student/application/use-cases/errors/wrong-credentials-error'
import { ZodValidationPipe } from '@/core/infra/http/pipes/zod-validation-pipe'
import { StudentAuthenticateUseCase } from '@/domain/student/application/use-cases/student-authenticate'
import { Public } from '@/core/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const studentAuthenticateRequest = z.object({
  email: z.string().email(),
  password: z.string(),
})

type StudentAuthenticateResponse = z.infer<typeof studentAuthenticateRequest>

@Controller('/sessions')
@Public()
export class StudentAuthenticateController {
  constructor(private authenticateStudent: StudentAuthenticateUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(studentAuthenticateRequest))
  async handle(@Body() body: StudentAuthenticateResponse) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
