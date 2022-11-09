import {ApiProperty} from '@nestjs/swagger';
import {ForgotPasswordMailSentDto} from 'domain/dtos/response/auth/forgot-password-mail-sent.dto';

export class ForgotPasswordResponseView extends ForgotPasswordMailSentDto {
    @ApiProperty()
    public attributeName: string;

    @ApiProperty()
    public deliveryMedium: string;

    @ApiProperty()
    public destination: string;
}
