import {IAuthService} from 'app/services/auth.service';
import {SignUpModel} from 'app/models';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IUserRepository} from 'app/repositories';
import {CreateDoctorDto} from 'domain/dtos/auth/create-doctor.dto';
import {CreatePatientDto} from 'domain/dtos/auth/create-patient.dto';
import {User} from 'domain/entities';

export class GetVitalsUseCase {
    constructor() {}

    public async getVitals(dto: CreateDoctorDto): Promise<void> {
        // const authModel = await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        // const user = this.userEntityMapper.mapByAuthModelAndCreateDoctorDto(authModel, dto);

        // await this.createUser(user);
    }
}
