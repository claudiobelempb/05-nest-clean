import { UniqueEntityID } from '@/core/application/enterprise/entities/unique-entity-id'
import { Optional } from '@/core/infra/types/optional'
import {
  Comment,
  CommentProps,
} from '../../../answer/enterprice/entities/comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
