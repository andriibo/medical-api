import {SuggestedContact, User} from 'domain/entities';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {SuggestedContactSpecificationError} from 'app/modules/suggested-contact/errors';

export class SuggestedContactSpecification {
    public constructor(private readonly patientDataAccessSpecification: PatientDataAccessSpecification) {}

    public async assertUserCanCreateContact(user: User, patientUserId: string): Promise<void> {
        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(user, patientUserId);
    }

    public assertUserCanDeleteContact(grantedUser: User, suggestedContact: SuggestedContact): void {
        const isSuggestedBy = suggestedContact.suggestedBy === grantedUser.id;

        if (!isSuggestedBy) {
            throw new SuggestedContactSpecificationError('Delete Not Allowed.');
        }
    }

    public assertPatientCanModifyContact(patient: User, suggestedContact: SuggestedContact): void {
        const isSuggestedBy = suggestedContact.patientUserId === patient.id;

        if (!isSuggestedBy) {
            throw new SuggestedContactSpecificationError('Action Not Allowed.');
        }
    }
}
