import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      connectorPackage: process.env.DATABASE_TYPE as 'mysql',
      host:process.env.DATABASE_TYPE,
      port: +(process.env.DATABASE_PORT ?? 3306),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),  // Carrega entidades sem precisar especifica-las
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // Sincroniza com o BD. Não deve ser usado em produção
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}