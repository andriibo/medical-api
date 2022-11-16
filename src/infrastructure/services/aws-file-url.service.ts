import {ConfigService} from '@nestjs/config';
import {Injectable} from '@nestjs/common';
import {IAWSFileUrlService} from 'app/modules/profile/services/aws-file-url.service';

@Injectable()
export class AWSFileUrlService implements IAWSFileUrlService {
    public constructor(private readonly configService: ConfigService) {}

    public generateFileUrl(avatar: string | null): string {
        const filename = avatar !== null ? avatar : 'default-avatar.png';

        return this.configService.get<string>('AWS_PUBLIC_FILE_URL') + filename;
    }
}
