import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetVitalsDto} from 'domain/dtos/request/vital';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalQueryView, SyncVitalView} from 'presentation/views/request/vital';
import {GetVitalsView, SyncVitalsView as SyncVitalResponseView} from 'presentation/views/response/vital';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Vitals')
export class PatientController {
    constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Patient')
    @Post('vitals')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    @ApiResponse({status: HttpStatus.OK, type: SyncVitalResponseView})
    public async syncVitals(@Body() requestBody: SyncVitalView): Promise<SyncVitalResponseView> {
        const useCase = this.useCasesFactory.syncPatientVitals();

        try {
            const responseModel = await useCase.updateVitals(requestBody);
            return responseModel;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Roles('Patient')
    @Get(':userId/vitals')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: GetVitalsView})
    public async getVitals(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query() query: GetVitalQueryView,
    ): Promise<GetVitalsView> {
        const useCase = this.useCasesFactory.getVitals();

        try {
            const responseModel = await useCase.getVitalsByPatient(
                new GetVitalsDto(query.startDate, query.endDate, userId)
            );
            return responseModel;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
