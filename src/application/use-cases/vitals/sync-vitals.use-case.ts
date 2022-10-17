import {IAuthService} from 'app/services/auth.service';
import {SignUpModel} from 'app/models';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IUserRepository} from 'app/repositories';
import {CreateDoctorDto} from 'domain/dtos/auth/create-doctor.dto';

export class SyncVitalsUseCase {
    constructor() {}

    public async getVitals(): Promise<void> {
        // const authModel = await this.authService.signUp(SignUpModel.fromCreateDoctorDto(dto));

        // const user = this.userEntityMapper.mapByAuthModelAndCreateDoctorDto(authModel, dto);

        // await this.createUser(user);
    }
}
