import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';
import {User} from 'domain/entities';

export class PatientContactListUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async getList(patientUserId: string): Promise<ContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();
        const patient = await this.getPatient(patientUserId);

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(grantedUser, patient.id);

        const items = await this.emergencyContactRepository.getByUserId(patient.id);

        return items.map((item) => ContactDto.fromEmergencyContact(item));
    }

    private async getPatient(patientUserId: string): Promise<User> {
        const patient = await this.userRepository.getOneById(patientUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        return patient;
    }
}
