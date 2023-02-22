import {Module} from '@nestjs/common';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

@Module({
    imports: [FileModule],
    exports: [UserDtoService],
    providers: [
        {
            provide: UserDtoService,
            useFactory: (fileUrlService: IFileUrlService) => {
                return new UserDtoService(fileUrlService);
            },
            inject: [IFileUrlService],
        },
    ],
})
export class ProfileIndependentModule {}
