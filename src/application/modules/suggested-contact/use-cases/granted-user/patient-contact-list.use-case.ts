import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';
import {User} from 'domain/entities';
import {EntityNotFoundError} from 'app/errors';
import {IUserRepository} from 'app/modules/auth/repositories';

export class PatientContactListUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly suggestedContactRepository: ISuggestedContactRepository,
    ) {}

    public async getList(patientUserId: string): Promise<SuggestedContactDto[]> {
        const grantedUser = await this.authedUserService.getUser();
        const patient = await this.getPatient(patientUserId);

        const items = await this.suggestedContactRepository.getByPatientUserIdAndSuggestedBy(
            patient.id,
            grantedUser.id,
        );

        return items.map((item) => SuggestedContactDto.fromSuggestedContact(item));
    }

    private async getPatient(patientUserId: string): Promise<User> {
        const patient = await this.userRepository.getOneById(patientUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        return patient;
    }
}
