import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetVitalsByPatientDto} from 'domain/dtos/request/vital';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalQueryView, SyncVitalView} from 'presentation/views/request/vital';
import {GetVitalsView, SyncVitalsView as SyncVitalResponseView} from 'presentation/views/response/vital';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Vitals')
export class PatientController {
    public constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Patient')
    @Post('vitals')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: SyncVitalResponseView})
    public async syncVitals(@Body() requestBody: SyncVitalView): Promise<SyncVitalResponseView> {
        const useCase = this.useCasesFactory.syncPatientVitals();

        try {
            return await useCase.updateVitals(requestBody);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get('vitals')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: GetVitalsView})
    public async getVitals(@Query() query: GetVitalQueryView): Promise<GetVitalsView> {
        const useCase = this.useCasesFactory.getVitals();

        try {
            return await useCase.getVitalsByPatient(new GetVitalsByPatientDto(query.startDate, query.endDate));
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
