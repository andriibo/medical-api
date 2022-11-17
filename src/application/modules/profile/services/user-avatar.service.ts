export interface IUserAvatarService {
    uploadFile(dataBuffer: Buffer, filename: string): Promise<void>;
    deleteFile(filename: string): Promise<void>;
}

export const IUserAvatarService = Symbol('IUserAvatarService');
