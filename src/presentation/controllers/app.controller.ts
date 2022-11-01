import {Controller, Get, HttpStatus, Post, Body, HttpCode} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {IMailService} from 'app/modules/mail/services/mail.service';
import {Inject, Injectable} from '@nestjs/common';
import {InviteToSignUpView} from 'views/request/invite-to-sign-up.view';

@Injectable()
@Controller()
@ApiTags('App')
export class AppController {
    public constructor(@Inject(IMailService) private readonly mailService: IMailService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public getHello(): object {
        return {message: 'Hello World!'};
    }
}
