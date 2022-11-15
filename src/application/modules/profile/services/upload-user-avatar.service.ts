import {User} from 'domain/entities';

export interface IUploadUserAvatarService {
    uploadFile(user: User, dataBuffer: Buffer): Promise<string>;
}

export const IUploadUserAvatarService = Symbol('IUploadUserAvatarService');
