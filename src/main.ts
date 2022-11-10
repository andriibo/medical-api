import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Medical API')
        .setDescription('The Medical API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({origin: '*'});

    await app.listen(process.env.SERVER_PORT || 3000);

    process.on('unhandledRejection', (error) => {
        console.log(error);
    });
}

bootstrap();
