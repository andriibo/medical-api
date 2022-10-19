import {Controller, Get, HttpStatus, Post, Body} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {IMailService} from 'app/services/mail.service';
import {Inject, Injectable} from '@nestjs/common';
import {InviteToSignUpView} from 'views/request/invite-to-sign-up.view';

@Injectable()
@Controller()
@ApiTags('App')
export class AppController {
    constructor(@Inject(IMailService) private readonly mailService: IMailService) {}

    @Get()
    public getHello(): object {
        return {message: 'Hello World!'};
    }

    @Post('invite-to-sign-up')
    @ApiResponse({status: HttpStatus.OK})
    public async inviteToSignUp(@Body() requestBody: InviteToSignUpView): Promise<void> {
        await this.mailService.sendInviteToSignUp(requestBody.email);
    }
}
