export interface IUserAvatarService {
    uploadFile(dataBuffer: Buffer, filename: string): Promise<string>;
    deleteFile(filename: string): Promise<void>;
}

export const IUserAvatarService = Symbol('IUserAvatarService');
