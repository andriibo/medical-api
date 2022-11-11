import {User} from 'domain/entities';

export interface IUploadAvatarService {
    uploadFile(user: User, dataBuffer: Buffer, name: string): Promise<string>;
}

export const IUploadAvatarService = Symbol('IUploadAvatarService');
