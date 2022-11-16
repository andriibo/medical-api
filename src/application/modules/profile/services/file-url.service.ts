export interface IFileUrlService {
    createUrlToUserAvatar(avatar: string | null): string;
}

export const IFileUrlService = Symbol('IFileUrlService');
