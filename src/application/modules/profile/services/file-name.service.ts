import {Express} from 'express';

export interface IFileNameService {
    createNameToUserAvatar(file: Express.Multer.File): string;
}

export const IFileNameService = Symbol('IFileNameService');
