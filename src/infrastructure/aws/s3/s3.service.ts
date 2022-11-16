import {S3} from 'aws-sdk';
import {ConfigService} from '@nestjs/config';
import {User} from 'domain/entities';
import {Express} from 'express';
import {IUserAvatarService} from 'app/modules/profile/services/s3.service';
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
            credentials: {
                accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            },
        });
    }

    public async uploadFile(user: User, file: Express.Multer.File): Promise<string> {
        if (user.avatar) {
            await this.deleteFile(user.avatar);
        }

        const filename = this.fileNameService.createNameToUserAvatar(file);
        const filePath = this.getAvatarFilePath(filename);
        await this.s3Client
            .upload({
                Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
                Body: file.buffer,
                Key: filePath,
            })
            .promise();

        return filename;
    }

    private async deleteFile(filename: string): Promise<void> {
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
