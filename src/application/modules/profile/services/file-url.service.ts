export interface IFileUrlService {
    createUrlToUserAvatar(avatar: string | null): string | null;
}

export const IFileUrlService = Symbol('IFileUrlService');
