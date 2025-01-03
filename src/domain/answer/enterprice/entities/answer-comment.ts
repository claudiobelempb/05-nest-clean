import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { Optional } from '@/core/infra/types/optional'
import {
  CommentProps,
  Comment,
} from '@/domain/answer/enterprice/entities/comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
