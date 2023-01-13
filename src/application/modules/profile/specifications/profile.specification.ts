import {User} from 'domain/entities/user.entity';
import {ProfileSpecificationError} from 'app/modules/profile/errors';
import {PatientDataAccessSpecificationError} from "app/modules/patient-data-access/errors";

export class ProfileSpecification {
    public assertUserCanDeleteHisProfile(user: User): void {
        if (user.deletedAt !== null) {
            throw new ProfileSpecificationError('This action is not allowed.');
        }
    }

    public assertUserCanRecoverHisProfile(user: User): void {
        if (user.deletedAt === null) {
            throw new ProfileSpecificationError('This action is not allowed.');
        }
    }
}
