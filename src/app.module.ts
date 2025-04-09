import { Module, RequestMethod, type MiddlewareConsumer, type NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { SimpleMiddleware } from './common/middlewares/simple.middleware';
import { OutroMiddleware } from './common/middlewares/outro.middleware';

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
    PessoasModule],
  controllers: [AppController],
  providers: [AppService],
})
//config middlewares
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    //throw new Error ('Method not implemented')
    consumer.apply(SimpleMiddleware, OutroMiddleware).forRoutes({ //a ordem dos 
      //middlewares no apply deve ser seguida ou podemos repetir o consumer

      path: 'recados', //poderia passar o recados/* para as demais rotas ou :id 
      method: RequestMethod.ALL,
    });
  }
}
