import { Either, left, right } from '@/core/application/enterprise/either'
import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { StudentsRepository } from '@/domain/student/application/repositories/students-repository'
import { WrongCredentialsError } from '@/domain/student/application/use-cases/errors/wrong-credentials-error'

interface StudentAuthenticateRequest {
  email: string
  password: string
}

type StudentAuthenticateResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class StudentAuthenticateUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: StudentAuthenticateRequest): Promise<StudentAuthenticateResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
