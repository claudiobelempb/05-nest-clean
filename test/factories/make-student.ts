import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { PrismaStudentMapper } from '@/core/domain/repositories/prisma/mappers/prisma-student-mapper'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import {
  Student,
  StudentProps,
} from '@/domain/student/enterprice/entities/student'
import { Injectable } from '@nestjs/common'

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })

    return student
  }
}
