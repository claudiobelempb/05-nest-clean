import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { PrismaAttachmentMapper } from '@/core/domain/repositories/prisma/mappers/prisma-attachment-mapper'
import { PrismaService } from '@/core/infra/database/prisma/prisma.service'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/attachment/enterprice/entities/attachment'
import { Injectable } from '@nestjs/common'

export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return attachment
}

@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(
    data: Partial<AttachmentProps> = {},
  ): Promise<Attachment> {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment),
    })

    return attachment
  }
}
