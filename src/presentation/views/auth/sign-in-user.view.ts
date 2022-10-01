import {ApiProperty} from '@nestjs/swagger';
import {AuthUserDto} from 'domain/dtos/auth-user.dto';

export class SignInUserView extends AuthUserDto {
    @ApiProperty()
    public userName: string;
    @ApiProperty()
    public password: string;
}
