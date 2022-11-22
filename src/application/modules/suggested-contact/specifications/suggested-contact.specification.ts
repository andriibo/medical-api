import {SuggestedContact, User} from 'domain/entities';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessSpecificationError} from 'app/modules/patient-data-access/errors';

export class SuggestedContactSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertUserCanCreateContact(user: User, patientUserId: string): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(user, patientUserId);
    }

    public async assertUserCanDeleteContact(grantedUser: User, suggestedContact: SuggestedContact): Promise<void> {
        const isSuggestedBy = suggestedContact.suggestedBy === grantedUser.id;

        if (!isSuggestedBy) {
            throw new PatientDataAccessSpecificationError('Delete Not Allowed.');
        }
    }
}
