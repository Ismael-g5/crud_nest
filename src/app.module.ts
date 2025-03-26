import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    RecadosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
