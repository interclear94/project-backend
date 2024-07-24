import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagget';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 스웨거 설정
  setupSwagger(app);

  // cors 설정
  app.enableCors({
    origin: "http://127.0.0.1:5501", // 나중에 수정
    methods: ['GET, HEAD, PATCH, POST, DELETE, OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })  


  await app.listen(3000);
}
bootstrap();
