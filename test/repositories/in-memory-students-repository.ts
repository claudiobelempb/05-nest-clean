import { DomainEvents } from '@/core/application/enterprise/events/domain-events'
import { StudentsRepository } from '@/domain/student/application/repositories/students-repository'
import { Student } from '@/domain/student/enterprice/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find(item => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
