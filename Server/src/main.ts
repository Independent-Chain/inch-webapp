import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configureLaunch = () => {
    if (process.env.LAUNCH_MODE === 'DEVELOP') {
      app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      });
    } else {
      app.enableCors({
        origin: (origin, callback) => {
          const allowedOrigins = process.env.ALLOW_DOMAINS.split(',')
          if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        },
      });
    }
  }
  
  configureLaunch();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
