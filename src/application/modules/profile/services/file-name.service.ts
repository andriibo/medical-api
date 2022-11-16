export interface IFileNameService {
    createNameToUserAvatar(mimetype: string): string;
}

export const IFileNameService = Symbol('IFileNameService');
