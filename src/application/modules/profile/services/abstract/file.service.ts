export interface IFileService {
    uploadPublicFile(dataBuffer: Buffer, filename: string): Promise<string>;
    deletePublicFile(filename: string): Promise<void>;
}

export const IFileService = Symbol('IFileService');
