import {IEmergencyContactRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class PatientContactListUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<ContactDto[]> {
        const doctor = await this.authedUserService.getUser();
        const patient = await this.userRepository.getOneByUserId(patientUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(doctor, patient);

        const items = await this.emergencyContactRepository.getByUserId(patient.userId);

        return items.map((item) => ContactDto.fromEmergencyContact(item));
    }
}
