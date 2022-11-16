import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable()
export class FileUrlService implements IFileUrlService {
    public constructor(private readonly configService: ConfigService) {}

    public createUrlToUserAvatar(avatar: string | null): string {
        const filename = avatar !== null ? avatar : 'default-avatar.png';

        return this.configService.get<string>('AWS_PUBLIC_FILE_URL') + filename;
    }
}
