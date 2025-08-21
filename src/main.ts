import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  console.log("here1");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));


  const config = new DocumentBuilder()
    .setTitle('Stipendly API')
    .setDescription(`
      Welcome to the Stipendly API documentation.  
        
      This API uses JWT (JSON Web Tokens) for securing requests and responses.  
      Each module or endpoint group is signed using a different secret key, which is defined in the \`.env\` file.

      **How requests should be formatted:**  
      Normally, a request to \`/v1/auth/register\` would look like this:
      \`\`\`json
      {
        "email": "user@example.com",
        "password": "your_password",
        "referral_code": "optional_code"
      }
      \`\`\`

      However, with this API, the JSON payload must be **signed** using the corresponding secret key (e.g. \`AUTH_SECRET\`).  
      This signed string becomes your request \`token\`.

      So, your final request body will look like this:
      \`\`\`json
      {
        "token": "signed_json"
      }
      \`\`\`

      Ensure the correct signing key is used depending on the endpoint you are calling.
    `)
    .addTag('Auth', `
      This section covers all endpoints related to user authentication.

      When a user is successfully registered or logged in, an authentication token is returned in the response.  
      This token must be included in the \`Authorization\` header for all protected endpoints.
    `)
    .addTag('Users', `
      This section provides endpoints related to user profile.
    `)
    .setVersion('1.0')
  .build();

  const prisma = app.get(PrismaService); 

  const users = await prisma.user.findMany();
  //await prisma.user.deleteMany();
  console.log('All users:', users); 


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
