import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove chaves que não estão presentes no DTO
    forbidNonWhitelisted: true, // levantar erro quando um chave estranha for inserido
    transform: true, // tenta transfomar os tipos de dados de params e DTO's
  }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
