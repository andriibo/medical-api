import {ApiProperty} from '@nestjs/swagger';

class UserDto {
    @ApiProperty()
    name: string;
}

export class CreateUserDto extends UserDto {
}

export class UpdateUserDto extends UserDto {
}