import {User} from 'domain/entities';
import {Express} from 'express';

export interface IUploadUserAvatarService {
    uploadFile(user: User, file: Express.Multer.File): Promise<string>;
}

export const IUploadUserAvatarService = Symbol('IUploadUserAvatarService');
