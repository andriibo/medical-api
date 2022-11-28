import {ApiProperty} from '@nestjs/swagger';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class UserView implements UserDto {
    @ApiProperty()
    public userId?: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public firstName?: string;

    @ApiProperty()
    public lastName?: string;

    @ApiProperty()
    public avatar?: string;
}
