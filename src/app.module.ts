import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaqModule } from './faq/faq.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Grisdo1@',
      database: 'project',
      autoLoadModels: true,
      synchronize: true,
      sync: {force: false}
    })
    ,FaqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
