import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {config} from 'aws-sdk';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.setGlobalPrefix('api');

    const configApi = new DocumentBuilder()
        .setTitle('Medical API')
        .setDescription('The Medical API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, configApi);

    SwaggerModule.setup('api', app, document);

    const configService = app.get(ConfigService);
    config.update({
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        region: configService.get<string>('AWS_REGION'),
    });

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({origin: '*'});

    await app.listen(process.env.SERVER_PORT || 3000);

    process.on('unhandledRejection', (error) => {
        console.log(error);
    });
}

bootstrap();
