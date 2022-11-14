import {S3} from 'aws-sdk';
import {ConfigService} from '@nestjs/config';
import {v4 as uuidv4} from 'uuid';
import {Inject} from '@nestjs/common';
import {User} from 'domain/entities';
import {IUploadUserAvatarService} from 'app/modules/profile/services/upload-user-avatar.service';

export class UploadUserAvatarService implements IUploadUserAvatarService {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public async uploadFile(user: User, dataBuffer: Buffer): Promise<string> {
        if (user.avatar) {
            await this.deleteFile(user.avatar);
        }

        const s3 = new S3();
        const filename = `${uuidv4()}`;
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
