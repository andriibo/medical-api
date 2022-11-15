import {ConfigService} from '@nestjs/config';
import {Inject} from '@nestjs/common';
import {IAWSFileUrlService} from 'app/modules/profile/services/aws-file-url.service';

export class AWSFileUrlService implements IAWSFileUrlService {
    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    public generateFileUrl(avatar: string | null): string {
        const filename = avatar !== null ? avatar : 'default-avatar.png';

        return this.configService.get<string>('AWS_PUBLIC_FILE_URL') + filename;
    }
}
