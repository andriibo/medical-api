import {S3} from 'aws-sdk';
import {ConfigService} from '@nestjs/config';
import {v4 as uuidv4} from 'uuid';
import {IFileService} from 'app/modules/profile/services/abstract/file.service';
import {Inject} from '@nestjs/common';

export class FileService implements IFileService {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public async uploadPublicFile(dataBuffer: Buffer, name: string): Promise<string> {
        const s3 = new S3();
        const filename = `${uuidv4()}-${name}`;
        const filePath = this.getAvatarFilePath(filename);
        await s3
            .upload({
                Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
                Body: dataBuffer,
                Key: filePath,
            })
            .promise();

        return filename;
    }

    public async deletePublicFile(filename: string): Promise<void> {
        const s3 = new S3();
        const filePath = this.getAvatarFilePath(filename);
        await s3
            .deleteObject({
                Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
                Key: filePath,
            })
            .promise();
    }

    private getAvatarFilePath(filename: string): string {
        return `avatars/${filename}`;
    }
}
