import {ApiProperty} from '@nestjs/swagger';
import {UserSignedInDto} from 'domain/dtos/response/auth/user-signed-in.dto';

export class UserSignedInView extends UserSignedInDto {
    @ApiProperty()
    public token: string;
}
