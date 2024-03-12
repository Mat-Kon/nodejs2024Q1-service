import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { SwaggerModule } from '@nestjs/swagger';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = yaml.load(
    fs.readFileSync('doc/api.yaml', { encoding: 'utf-8' }),
  );

  SwaggerModule.setup('doc', app, swaggerDoc);
  await app.listen(process.env.PORT);
}
bootstrap();
