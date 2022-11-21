import {
    Controller,
    HttpStatus,
    Body,
    HttpCode,
    Post,
    UseInterceptors,
    UploadedFile,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
} from '@nestjs/common';
import {ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {UploadAvatarProfileView} from 'views/request/profile/upload-avatar-profile.view';
import {Express} from 'express';
import {UserAvatarUseCasesFactory} from 'infrastructure/factories/user-avatar-use-cases.factory';

@Controller('avatar')
@ApiBearerAuth()
@ApiTags('Profile')
export class AvatarController {
    public constructor(private readonly userAvatarUseCasesFactory: UserAvatarUseCasesFactory) {}

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @UseInterceptors(FileInterceptor('file'))
    public async uploadAvatar(
        @Body() requestBody: UploadAvatarProfileView,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: 1024000}),
                    new FileTypeValidator({fileType: 'png|jpeg|gif|webp'}),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        const useCase = this.userAvatarUseCasesFactory.createUploadUserAvatarUseCase();

        await useCase.uploadAvatarProfile(file.buffer, file.mimetype);
    }
}
