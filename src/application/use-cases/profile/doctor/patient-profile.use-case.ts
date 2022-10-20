import {IUserRepository, IPatientMetadataRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class PatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getProfileInfo(patientUserId: string): Promise<PatientDto> {
        const doctor = await this.authedUserService.getUser();
        const patient = await this.userRepository.getOneByUserId(patientUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(doctor, patient.userId);

        const patientMetadata = await this.patientMetadataRepository.getOneByUserId(patient.userId);

        return PatientDto.fromUserAndPatientMetadata(patient, patientMetadata);
    }
}
