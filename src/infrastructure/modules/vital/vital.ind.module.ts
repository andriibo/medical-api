import {Module} from '@nestjs/common';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {VitalRepository} from './models';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {VitalModelMapper} from './mappers/vital-model.mapper';

@Module({
    exports: [IVitalRepository, IVitalEntityMapper],
    providers: [
        {
            provide: IVitalRepository,
            useClass: VitalRepository,
        },
        {
            provide: IVitalEntityMapper,
            useClass: VitalModelMapper,
        },
    ],
})
export class VitalIndependentModule {}
