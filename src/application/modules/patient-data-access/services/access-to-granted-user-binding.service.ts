import {User} from 'domain/entities';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';

export class AccessToGrantedUserBindingService {
    public constructor(private readonly patientDataAccessRepository: IPatientDataAccessRepository) {}

    public async bindAccessToGrantedUser(grantedUser: User): Promise<void> {
        const items = await this.patientDataAccessRepository.getByGrantedEmail(grantedUser.email);

        if (!items.length) {
            return;
        }

        items.map((item) => {
            item.grantedUserId = grantedUser.id;
            item.grantedEmail = null;
        });

        await this.patientDataAccessRepository.update(items);
    }
}
