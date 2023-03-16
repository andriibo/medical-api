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
    Req,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiForbiddenResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {UploadAvatarProfileView} from 'views/request/profile/upload-avatar-profile.view';
import {Express} from 'express';
import {ProfileUseCasesFactory} from 'infrastructure/modules/profile/factories';
import {Auth} from 'presentation/guards';
import {ChangeEmailResponseView} from 'views/response/auth';
import {ChangeEmailView, ChangePasswordView, ConfirmChangeEmailView} from 'views/request/auth';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {ChangeEmailDto, ChangePasswordDto, ConfirmChangeEmailDto} from 'domain/dtos/request/auth';
import {ProfileRecovery} from 'presentation/guards/profile-recovery.guard';
import {UserView} from 'views/response/user/user.view';

@Controller()
@ApiBearerAuth()
@ApiTags('Profile')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
export class ProfileController {
    public constructor(private readonly profileUseCasesFactory: ProfileUseCasesFactory) {}

    @Auth()
    @Post('avatar/upload')
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: 'OK.'})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
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
    @ApiResponse({status: HttpStatus.OK, description: 'OK.', type: UserView})
    @ApiBadRequestResponse({description: 'Bad request.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async deleteProfile() {
        const useCase = this.profileUseCasesFactory.createDeleteMyProfile();

        try {
            return await useCase.deleteProfile();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @ProfileRecovery()
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

    @Auth()
    @ApiBearerAuth()
    @Post('change-email')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async changeEmail(
        @Req() request: UserRequest,
        @Body() requestBody: ChangeEmailView,
    ): Promise<ChangeEmailResponseView> {
        const useCase = this.profileUseCasesFactory.createChangeEmailUseCase();

        return await useCase.changeEmail(new ChangeEmailDto(requestBody.email, request.user.accessToken));
    }

    @Auth()
    @ApiBearerAuth()
    @Post('change-email/confirm')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async confirmChangeEmail(
        @Req() request: UserRequest,
        @Body() requestBody: ConfirmChangeEmailView,
    ): Promise<void> {
        const useCase = this.profileUseCasesFactory.createConfirmChangeEmailUseCase();

        await useCase.confirm(new ConfirmChangeEmailDto(requestBody.code, request.user.accessToken));
    }

    @Auth()
    @ApiBearerAuth()
    @Post('change-password')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    public async changePassword(@Req() request: UserRequest, @Body() requestBody: ChangePasswordView): Promise<void> {
        const useCase = this.profileUseCasesFactory.createChangePasswordUseCase();

        try {
            return await useCase.changePassword(
                new ChangePasswordDto(requestBody.currentPassword, requestBody.newPassword, request.user.accessToken),
            );
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
