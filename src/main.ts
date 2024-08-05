import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagget';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

    app.enableCors({
      origin: "http://127.0.0.1:5500",
      methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
      credentials : true      
    });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  await app.listen(3000);
}
bootstrap();
