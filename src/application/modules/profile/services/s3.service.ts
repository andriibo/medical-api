import {User} from 'domain/entities';
import {Express} from 'express';

export interface IUserAvatarService {
    uploadFile(user: User, file: Express.Multer.File): Promise<string>;
}

export const IUserAvatarService = Symbol('IUserAvatarService');
