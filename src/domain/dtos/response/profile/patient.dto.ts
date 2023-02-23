import {UserDto} from 'domain/dtos/response/user/user.dto';

export class PatientDto extends UserDto {
    public dob: Date;

    public gender: string;

    public height: number;

    public weight: number;
}
