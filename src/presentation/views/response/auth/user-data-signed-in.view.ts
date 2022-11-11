import {ApiProperty} from '@nestjs/swagger';
import {UserDataSignedInDto} from 'domain/dtos/response/auth/user-data-signed-in.dto';

export class UserDataSignedInView extends UserDataSignedInDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public roles: string[];
}
