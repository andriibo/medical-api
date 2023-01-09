import {ApiProperty} from '@nestjs/swagger';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';
import {UserView} from 'views/response/user';

export class UserSignedInView extends UserSignedInDto {
    @ApiProperty()
    public token: string;

    @ApiProperty()
    public tokenExpireTime: Date;

    @ApiProperty()
    public user: UserView;
}
