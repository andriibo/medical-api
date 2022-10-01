import {ApiProperty} from '@nestjs/swagger';
import {ConfirmSignUpUserDto} from 'domain/dtos/confirm-sign-up-user.dto';

export class ConfirmSignUpUserView extends ConfirmSignUpUserDto {
    @ApiProperty()
    public userName: string;
    @ApiProperty()
    public code: string;
}
