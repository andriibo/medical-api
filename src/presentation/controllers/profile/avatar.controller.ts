import {Controller, HttpStatus, Body, HttpCode, Post, UseInterceptors, UploadedFile} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';
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
    @ApiResponse({status: HttpStatus.OK})
    @UseInterceptors(FileInterceptor('file'))
    public async uploadAvatar(@Body() requestBody: UploadAvatarProfileView, @UploadedFile() file: Express.Multer.File) {
        const useCase = this.userAvatarUseCasesFactory.uploadUserAvatarUseCase();

        await useCase.uploadAvatarProfile(file);
    }
}
