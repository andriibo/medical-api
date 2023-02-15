import {Controller, HttpStatus, HttpCode, Param, ParseUUIDPipe, BadRequestException, Patch} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientCategoryUseCasesFactory} from 'infrastructure/modules/patient-category/factories/patient-category-use-cases.factory';

@Controller('patient-category')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
@ApiBadRequestResponse({description: 'Bad request.'})
@ApiTags('Patient Category')
export class PatientCategoryController {
    public constructor(private readonly patientCategoryUseCasesFactory: PatientCategoryUseCasesFactory) {}

    @Roles('Caregiver', 'Doctor')
    @Patch('normal/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientCategoryNormal(@Param('patientUserId', ParseUUIDPipe) patientUserId: string): Promise<void> {
        const useCase = this.patientCategoryUseCasesFactory.createPatientCategoryNormalUseCase();

        try {
            await useCase.setNormal(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Caregiver', 'Doctor')
    @Patch('borderline/:patientUserId')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async setPatientCategoryBorderline(
        @Param('patientUserId', ParseUUIDPipe) patientUserId: string,
    ): Promise<void> {
        const useCase = this.patientCategoryUseCasesFactory.createPatientCategoryBorderlineUseCase();

        try {
            await useCase.setBorderline(patientUserId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
