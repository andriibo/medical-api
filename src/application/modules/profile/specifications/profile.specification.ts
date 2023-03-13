import {User} from 'domain/entities/user.entity';
import {ProfileSpecificationError} from 'app/modules/profile/errors';

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

    public assertUserCanChangePassword(oldPassword: string, newPassword: string): void {
        if (oldPassword === newPassword) {
            throw new ProfileSpecificationError('Your new password cannot be the same as the old password.');
        }
    }
}
