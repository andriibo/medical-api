import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {GrantedUserController, PatientController} from 'controllers/vital';
import {PatientUseCasesFactory, GrantedUserUseCasesFactory} from './factories/';
import {VitalModel, VitalRepository} from './models';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {IVitalEntityMapper} from 'app/modules/vital/mappers/vital-entity.mapper';
import {VitalModelMapper} from './mappers/vital-model.mapper';
import {PatientVitalThresholdsIndependentModule} from 'infrastructure/modules/patient-vital-thresholds/patient-vital-thresholds.ind.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([VitalModel]),
        AuthModule,
        PatientDataAccessModule,
        PatientVitalThresholdsIndependentModule,
    ],
    controllers: [PatientController, GrantedUserController],
    exports: [IVitalRepository],
    providers: [
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
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
export class VitalModule {}
