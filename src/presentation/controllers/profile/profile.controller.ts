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
    BadRequestException,
    Patch,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {UploadAvatarProfileView} from 'views/request/profile/upload-avatar-profile.view';
import {Express} from 'express';
import {ProfileUseCasesFactory} from 'infrastructure/modules/profile/factories';
import {Auth} from 'presentation/guards';

@Controller()
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiTags('Profile')
export class ProfileController {
    public constructor(private readonly profileUseCasesFactory: ProfileUseCasesFactory) {}

    @Auth()
    @Post('avatar/upload')
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
        const useCase = this.profileUseCasesFactory.createUploadUserAvatarUseCase();

        await useCase.uploadAvatarProfile(file.buffer, file.mimetype);
    }

    @Auth()
    @Patch('my-profile/delete')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    public async deleteProfile() {
        const useCase = this.profileUseCasesFactory.createDeleteProfile();

        try {
            await useCase.deleteProfile();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Auth()
    @Patch('my-profile/recovery')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    public async recoveryMyProfile() {
        const useCase = this.profileUseCasesFactory.createRecoverMyProfile();

        try {
            await useCase.recoverMyProfile();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}