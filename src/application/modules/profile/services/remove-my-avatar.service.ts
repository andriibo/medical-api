import {User} from 'domain/entities';

export interface IRemoveMyAvatarService {
    removeAvatar(user: User): Promise<void>;
}

export const IRemoveMyAvatarService = Symbol('IRemoveMyAvatarService');
