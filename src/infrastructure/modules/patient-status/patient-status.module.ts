import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientStatusModel, PatientStatusRepository} from 'infrastructure/modules/patient-status/models';
import {PatientStatusController} from 'controllers/patient-status.controller';
import {PatientStatusUseCasesFactory} from 'infrastructure/modules/patient-status/factories/patient-status-use-cases.factory';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusModelMapper} from 'infrastructure/modules/patient-status/mappers/patient-status-model.mapper';
import {PatientCategoryModule} from 'infrastructure/modules/patient-category/patient-category.module';

@Module({
    imports: [TypeOrmModule.forFeature([PatientStatusModel]), AuthModule, PatientCategoryModule],
    controllers: [PatientStatusController],
    providers: [
        PatientStatusUseCasesFactory,
        {
            provide: IPatientStatusRepository,
            useClass: PatientStatusRepository,
        },
        {
            provide: IPatientStatusEntityMapper,
            useClass: PatientStatusModelMapper,
        },
    ],
})
export class PatientStatusModule {}
