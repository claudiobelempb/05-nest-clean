import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { NotificationSendUseCase } from './notification-send'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: NotificationSendUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new NotificationSendUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
