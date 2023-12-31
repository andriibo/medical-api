import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiForbiddenResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {PatientUseCasesFactory} from 'infrastructure/modules/vital/factories/patient-use-cases.factory';
import {Roles} from 'presentation/guards';
import {VitalNormalizationPipe} from 'presentation/pipes/vital-normalization.pipe';
import {GetVitalsQueryView, SyncVitalsView} from 'presentation/views/request/vital';
import {VitalsView} from 'presentation/views/response/vital';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Vitals')
@ApiUnauthorizedResponse({description: 'Unauthorized.'})
@ApiForbiddenResponse({description: 'Forbidden.'})
export class PatientController {
    public constructor(private readonly patientUseCasesFactory: PatientUseCasesFactory) {}

    @Roles('Patient')
    @Post('vitals')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK})
    public async syncVitals(@Body(VitalNormalizationPipe) requestBody: SyncVitalsView): Promise<void> {
        const useCase = this.patientUseCasesFactory.createSyncPatientVitalsUseCase();

        try {
            return await useCase.updateVitals(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('my-vitals')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: VitalsView})
    public async getMyVitals(@Query() query: GetVitalsQueryView): Promise<VitalsView> {
        const useCase = this.patientUseCasesFactory.createVitalListUseCase();

        try {
            return await useCase.getList(new GetVitalsByPatientDto(query.startDate, query.endDate));
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
