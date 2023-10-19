import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ExpressLoader } from '@nestjs/serve-static';
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({ origin: '*' });
   app.use(graphqlUploadExpress());
   console.log("http://localhost:3000/graphql")
  await app.listen(3000);
}
bootstrap();
