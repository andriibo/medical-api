import {Module} from '@nestjs/common';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {FileUrlService} from 'infrastructure/services/file-url.service';
import {S3Service} from 'infrastructure/aws/s3/s3.service';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';
import {FileNameService} from 'infrastructure/services/file-name.service';

@Module({
    exports: [IUserAvatarService, IFileUrlService, IFileNameService],
    providers: [
        {
            provide: IUserAvatarService,
            useClass: S3Service,
        },
        {
            provide: IFileUrlService,
            useClass: FileUrlService,
        },
        {
            provide: IFileNameService,
            useClass: FileNameService,
        },
    ],
})
export class FileModule {}
