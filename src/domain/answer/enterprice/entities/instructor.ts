import { Entity } from '@/core/application/enterprise/entities/entity'
import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityID) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
