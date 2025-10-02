import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// DOAR TEMPORAR pentru debug – ȘTERGE după ce merge!
console.log('DB_USER=', process.env.DB_USER);
console.log('DB_PASS type=', typeof process.env.DB_PASS);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
