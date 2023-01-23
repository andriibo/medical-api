import {Controller, HttpStatus, Get, HttpCode, NotFoundException} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';
import {PatientStatusUseCasesFactory} from 'infrastructure/modules/patient-status/factories/patient-status-use-cases.factory';
import {MyPatientStatusView} from 'views/response/patient-status';
import {MyPatientStatusDto} from 'domain/dtos/response/patient-status/my-patient-status.dto';

@Controller('patient')
@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
@ApiNotFoundResponse({description: 'Not Found.'})
@ApiTags('Patient Status')
export class PatientStatusController {
    public constructor(private readonly patientStatusUseCasesFactory: PatientStatusUseCasesFactory) {}

    @Roles('Patient')
    @Get('my-status')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: MyPatientStatusView})
    public async getMyPatientStatus(): Promise<MyPatientStatusDto> {
        const useCase = this.patientStatusUseCasesFactory.createMyPatientStatusUseCase();

        try {
            return await useCase.getMyPatientStatus();
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
