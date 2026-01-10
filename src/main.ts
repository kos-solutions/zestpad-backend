import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ ACTIVĂM CORS (Vital pentru legătura cu Frontend-ul)
  app.enableCors({
    origin: '*', // Permite accesul de pe orice domeniu (inclusiv site-ul tău Vercel)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Pornim serverul pe portul dat de Railway
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on port: ${port}`);
}
bootstrap();