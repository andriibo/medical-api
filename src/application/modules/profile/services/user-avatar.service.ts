import {User} from 'domain/entities';

export interface IUserAvatarService {
    uploadFile(user: User, dataBuffer: Buffer, mimetype: string): Promise<string>;
}

export const IUserAvatarService = Symbol('IUserAvatarService');
