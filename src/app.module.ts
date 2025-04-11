


import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { OutroMiddleware } from 'src/common/middlewares/outro.middleware';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
import { ErrorExceptionFilter } from 'src/common/filters/error-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:'ismael',
      database: 'crud_nest',
      password: 'MC133011',
      autoLoadEntities: true, // carrega entidades sem precisa especificar
      synchronize: true, //não deve ser usado em produção
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(OutroMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}