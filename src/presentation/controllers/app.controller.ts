import {Controller, Get, HttpStatus, HttpCode} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Injectable} from '@nestjs/common';

@Injectable()
@Controller()
@ApiTags('App')
export class AppController {
    public constructor() {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public getHello(): object {
        return {message: 'Hello World!'};
    }
}
