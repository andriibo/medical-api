import {Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetVitalsDto} from 'domain/dtos/request/vital';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalQueryView, SyncVitalView} from 'presentation/views/request/vital';
import {SyncVitalsView as SyncVitalResponseView} from 'presentation/views/response/vital';

@Controller('')
@ApiBearerAuth()
@ApiTags('Vitals')
export class VitalController {
    constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Patient')
    @Post('user/vitals')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async syncVitals(@Body() requestBody: SyncVitalView): Promise<SyncVitalResponseView> {
        const useCase = this.useCasesFactory.syncPatientVitals();
        const responseModel = await useCase.updateVitals(requestBody);

        return responseModel;
    }

    @Roles('Patient')
    @Get('user/:userId/vitals')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async getVitals(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query() query: GetVitalQueryView,
    ): Promise<void> {
        const useCase = this.useCasesFactory.getVitals();
        await useCase.getVitalsByPatient(new GetVitalsDto(query.startDate, query.endDate, userId));
    }

    @Roles('Doctor')
    @Get('user/:userId/vitals')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async getPatientVitals(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Query() query: GetVitalQueryView,
    ): Promise<void> {
        const useCase = this.useCasesFactory.getVitals();
        await useCase.getVitalsByDoctor(new GetVitalsDto(query.startDate, query.endDate, userId));
    }
}
