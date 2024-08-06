import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // cors error 방지
  app.enableCors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders:['Content-Type'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
  await app.listen(3000);
  
}
bootstrap();
