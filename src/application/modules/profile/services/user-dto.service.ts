import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {DoctorMetadata, PatientMetadata, User} from 'domain/entities';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';

export class UserDtoService {
    public constructor(private readonly fileUrlService: IFileUrlService) {}

    public createUserDtoByUser(user: User): UserDto {
        const dto = new UserDto();
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);
        dto.role = user.role;
        dto.deletedAt = user.deletedAt;

        return dto;
    }

    public createDoctorDtoByUserAndMetadata(user: User, metadata: DoctorMetadata): DoctorDto {
        const dto = this.createUserDtoByUser(user) as DoctorDto;
        dto.institution = metadata.institution;

        return dto;
    }

    public createPatientDtoByUserAndMetadata(user: User, metadata: PatientMetadata): PatientDto {
        const dto = this.createUserDtoByUser(user) as PatientDto;
        dto.dob = metadata.dob;
        dto.gender = metadata.gender;
        dto.height = metadata.height;
        dto.weight = metadata.weight;

        return dto;
    }

    public createUserDtoByEmail(email: string): UserDto {
        const dto = new UserDto();
        dto.userId = '';
        dto.email = email;
        dto.firstName = '';
        dto.lastName = '';
        dto.phone = '';
        dto.role = '';

        return dto;
    }
}
