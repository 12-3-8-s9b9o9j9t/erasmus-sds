import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { seeding } from './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');

    const config = new DocumentBuilder()
      .setTitle('Erasmus+ API')
      .setDescription('The API for Erasmus+ students at PUT')
      .setVersion('1.0')
      .addBasicAuth()
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors();

  app.use(helmet());

  await seeding();

  await app.listen(3000);
}
bootstrap();
