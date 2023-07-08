import {UserDto} from 'domain/dtos/response/user/user.dto';

export class CaregiverDto extends UserDto {
    public institution: string;
}
