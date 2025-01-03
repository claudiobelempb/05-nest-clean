import { Student } from '@/domain/student/enterprice/entities/student'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../infra/database/prisma/prisma.service'
import { PrismaStudentMapper } from './mappers/prisma-student-mapper'
import { StudentsRepository } from '@/domain/student/application/repositories/students-repository'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }
    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}