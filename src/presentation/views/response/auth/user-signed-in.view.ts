import {ApiProperty} from '@nestjs/swagger';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';
import {UserView} from 'views/response/user';

export class UserSignedInView extends UserSignedInDto {
    @ApiProperty()
    public accessToken: string;

    @ApiProperty()
    public accessTokenExpireTime: Date;

    @ApiProperty({nullable: true})
    public refreshToken: string | null;

    @ApiProperty()
    public user: UserView;
}
