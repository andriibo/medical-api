import {Module} from '@nestjs/common';
import {VitalController} from 'controllers/vital.controller';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';

@Module({
    controllers: [VitalController],
    providers: [VitalUseCasesFactory],
})
export class VitalModule {}
