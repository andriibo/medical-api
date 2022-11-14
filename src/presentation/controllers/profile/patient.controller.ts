import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    MaxFileSizeValidator,
    ParseFilePipe,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientView} from 'presentation/views/response/user';
import {PatientUseCasesFactory} from 'infrastructure/factories/profile';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {UpdatePatientProfileView} from 'views/request/profile/update-patient-profile.view';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';
import {UploadAvatarProfileView} from 'views/request/profile/upload-avatar-profile.view';
import {UploadAvatarProfileUseCasesFactory} from "infrastructure/factories/upload-avatar-profile-use-cases.factory";

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Profile')
export class PatientController {
    public constructor(
        private readonly patientUseCasesFactory: PatientUseCasesFactory,
        private readonly uploadAvatarProfileUseCasesFactory: UploadAvatarProfileUseCasesFactory,
    ) {}

    @Roles('Patient')
    @Get('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: PatientView})
    public async getMyProfile(): Promise<PatientDto> {
        const useCase = this.patientUseCasesFactory.createGetPatientProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Patient')
    @Patch('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyProfile(@Body() requestBody: UpdatePatientProfileView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createUpdatePatientProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }

    @Roles('Patient')
    @Post('avatar-upload')
    @ApiConsumes('multipart/form-data')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, description: "OK."})
    @ApiBadRequestResponse({description: "Bad request."})
    @UseInterceptors(FileInterceptor('file'))
    public async uploadAvatar(
        @Body() requestBody: UploadAvatarProfileView,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024000 }),
                new FileTypeValidator({ fileType: 'png|jpeg|gif|webp' }),
            ],
        })) file: Express.Multer.File
    ) {
        const useCase = this.uploadAvatarProfileUseCasesFactory.uploadAvatarProfileUseCase();

        await useCase.uploadAvatarProfile(file.buffer, file.originalname);
    }
}
