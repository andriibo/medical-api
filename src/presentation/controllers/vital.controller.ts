import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {Roles} from 'presentation/guards';
import {GetVitalParamsView, GetVitalQueryView, SyncVitalView} from 'presentation/views/request/vital';

@Controller('vitals')
@ApiBearerAuth()
@ApiTags('Vitals')
export class VitalController {
    constructor(private readonly useCasesFactory: VitalUseCasesFactory) {}

    @Roles('Patient')
    @Post('')
    @HttpCode(HttpStatus.OK)
    @HttpCode(HttpStatus.BAD_REQUEST)
    public async syncVitals(@Body() requestBody: SyncVitalView[]): Promise<void> {
        const useCase = this.useCasesFactory.syncPatientVitals();
        await useCase.getVitals(requestBody)
    }

    @Roles('Patient')
    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK})
    public async getVitals(@Param() params: GetVitalParamsView, @Query() query: GetVitalQueryView): Promise<void> {
        const useCase = this.useCasesFactory.getVitals();

    }
}
