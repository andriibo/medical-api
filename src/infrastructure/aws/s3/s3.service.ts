import {S3} from 'aws-sdk';
import {ConfigService} from '@nestjs/config';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';
import {Inject, Injectable} from '@nestjs/common';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';

@Injectable()
export class S3Service implements IUserAvatarService {
    private readonly s3Client: S3;

    public constructor(
        private configService: ConfigService,
        @Inject(IFileNameService) private fileNameService: IFileNameService,
    ) {
        this.s3Client = new S3({
            region: configService.get<string>('AWS_REGION'),
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });
    }

    public async uploadFile(dataBuffer: Buffer, filename: string): Promise<void> {
        const filePath = this.getAvatarFilePath(filename);

        await this.s3Client
            .upload({
                Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
                Body: dataBuffer,
                Key: filePath,
            })
            .promise();
    }

    public async deleteFile(filename: string): Promise<void> {
        const filePath = this.getAvatarFilePath(filename);

        await this.s3Client
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
