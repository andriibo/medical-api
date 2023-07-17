import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {DoctorMetadata, PatientMetadata, User, CaregiverMetadata} from 'domain/entities';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {CaregiverDto} from 'domain/dtos/response/profile/caregiver.dto';

export class UserDtoMapper {
    public constructor(private readonly fileUrlService: IFileUrlService) {}

    public mapUserDtoByUser(user: User): UserDto {
        const dto = new UserDto();
        dto.userId = user.id;
        dto.email = user.email;
        dto.firstName = user.firstName;
        dto.lastName = user.lastName;
        dto.phone = user.phone;
        dto.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);
        dto.role = user.role;
        dto.roleLabel = user.roleLabel;
        dto.deletedAt = user.deletedAt;
        dto.passwordUpdatedAt = user.passwordUpdatedAt;

        return dto;
    }

    public mapDoctorDtoByUserAndMetadata(user: User, metadata: DoctorMetadata): DoctorDto {
        const dto = this.mapUserDtoByUser(user) as DoctorDto;
        dto.institution = metadata?.institution || '';
        dto.specialty = metadata?.specialty || '';

        return dto;
    }

    public mapCaregiverDtoByUserAndMetadata(user: User, metadata: CaregiverMetadata): CaregiverDto {
        const dto = this.mapUserDtoByUser(user) as CaregiverDto;
        dto.institution = metadata?.institution || '';

        return dto;
    }

    public mapPatientDtoByUserAndMetadata(user: User, metadata: PatientMetadata): PatientDto {
        const dto = this.mapUserDtoByUser(user) as PatientDto;
        dto.dob = metadata.dob;
        dto.gender = metadata.gender;
        dto.height = metadata.height;
        dto.weight = metadata.weight;

        return dto;
    }

    public mapUserDtoByEmail(email: string): UserDto {
        const dto = new UserDto();
        dto.userId = '';
        dto.email = email;
        dto.firstName = '';
        dto.lastName = '';
        dto.phone = '';
        dto.role = '';
        dto.roleLabel = '';

        return dto;
    }
}
