import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.getOrThrow<'mysql'>('DATABASE_TYPE'),
        connectorPackage: configService.getOrThrow<'mysql2'>('DATABASE_CONNECTORPACKAGE'),
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: Number(configService.getOrThrow<string>('DATABASE_PORT')),
        username: configService.getOrThrow<string>('DATABASE_USERNAME'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        autoLoadEntities: configService.get<string>('DATABASE_AUTOLOADENTITIES') === 'true', // Carrega entidades sem precisar especifica-las
        synchronize: configService.get<string>('DATABASE_SYNCHRONIZE') === 'true', // Sincroniza com o BD. Não deve ser usado em produção
      }),
    }),
    RecadosModule,
    PessoasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}