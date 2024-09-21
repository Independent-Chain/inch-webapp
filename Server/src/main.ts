import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: (origin, callback) => {
  //     const allowedOrigins = process.env.ALLOW_DOMAINS.split(',')
  //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //       callback(null, true);
  //     } else {
  //       callback(null, false);
  //     }
  //   },
  // });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
