import {Controller, Get, HttpStatus, HttpCode} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {CaregiverUseCasesFactory} from 'infrastructure/factories/profile/caregiver-use-cases.factory';
import {CaregiverDto} from 'domain/dtos/response/profile/caregiver.dto';
import {CaregiverView} from 'views/response/user/caregiver.view';

@Controller('caregiver')
@ApiBearerAuth()
@ApiTags('Profile')
export class CaregiverController {
    public constructor(private readonly caregiverUseCasesFactory: CaregiverUseCasesFactory) {}

    @Roles('Caregiver')
    @Get('my-profile')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: CaregiverView})
    public async getMyProfile(): Promise<CaregiverDto> {
        const useCase = this.caregiverUseCasesFactory.createGetCaregiverProfileUseCase();

        return await useCase.getProfileInfo();
    }
}
