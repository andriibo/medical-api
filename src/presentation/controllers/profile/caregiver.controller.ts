import {Controller, Get, HttpStatus, HttpCode, Patch, Body} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {CaregiverUseCasesFactory} from 'infrastructure/modules/profile/factories';
import {UpdateCaregiverProfileView} from 'views/request/profile/update-caregiver-profile.view';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {UserView} from 'views/response/user';

@Controller('caregiver')
@ApiBearerAuth()
@ApiTags('Profile')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class CaregiverController {
    public constructor(private readonly caregiverUseCasesFactory: CaregiverUseCasesFactory) {}

    @Roles('Caregiver')
    @Get('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: UserView})
    public async getMyProfile(): Promise<UserDto> {
        const useCase = this.caregiverUseCasesFactory.createGetCaregiverProfileUseCase();

        return await useCase.getProfileInfo();
    }

    @Roles('Caregiver')
    @Patch('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async updateMyProfile(@Body() requestBody: UpdateCaregiverProfileView): Promise<void> {
        const useCase = this.caregiverUseCasesFactory.createUpdateCaregiverProfileUseCase();

        await useCase.updateProfileInfo(requestBody);
    }
}
