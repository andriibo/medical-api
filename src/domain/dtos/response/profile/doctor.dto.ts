import {UserDto} from 'domain/dtos/response/user/user.dto';

export class DoctorDto extends UserDto {
    public institution: string;
}
