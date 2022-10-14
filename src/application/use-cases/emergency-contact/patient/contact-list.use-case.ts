import {IEmergencyContactRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {EmergencyContactView} from 'views/emergency-contact';

export class ContactListUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
    ) {}

    public async getList(): Promise<EmergencyContactView[]> {
        const user = await this.authedUserService.getUser();

        const items = await this.emergencyContactRepository.getByUserId(user.userId);

        return items.map((item) => EmergencyContactView.fromEmergencyContact(item));
    }
}
