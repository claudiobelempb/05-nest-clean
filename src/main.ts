import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './core/infra/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  })

  app.setGlobalPrefix('api/v1')

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port)
}
bootstrap()
