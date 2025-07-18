import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';


async function bootstrap() {
  console.log("run");
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,  // Ensure transform is enabled
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  if (configuration['ENVIRONMENT'] !== 'prod') {
    const config = new DocumentBuilder()
      .setTitle('Prime Hao Hao nestjs')
      .setDescription('The Prime Hao Hao API description')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }
  app.enableCors();
  const port = configuration['PORT'];
  app.use(json({ limit: '4mb' }));
  app.use(urlencoded({ extended: true, limit: '4mb' }));
  await app.listen(Number(port), '0.0.0.0');
}

bootstrap().then();
