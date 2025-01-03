import { Either, left, right } from '@/core/application/enterprise/either'
import { StudentAlreadyExistsError } from '@/domain/student/application/use-cases/errors/student-already-exists-error'
import { Student } from '@/domain/student/enterprice/entities/student'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentsRepository } from '../repositories/students-repository'

interface StudentRegisterRequest {
  name: string
  email: string
  password: string
}

type StudentRegisterResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class StudentRegisterUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: StudentRegisterRequest): Promise<StudentRegisterResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}
