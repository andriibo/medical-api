export interface IAWSFileUrlService {
    generateFileUrl(avatar: string | null): string;
}

export const IAWSFileUrlService = Symbol('IAWSFileUrlService');
