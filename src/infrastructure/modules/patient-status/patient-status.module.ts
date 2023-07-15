import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientStatusModel, PatientStatusRepository} from 'infrastructure/modules/patient-status/models';
import {PatientStatusController} from 'controllers/patient-status.controller';
import {PatientStatusUseCasesFactory} from 'infrastructure/modules/patient-status/factories/patient-status-use-cases.factory';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';

@Module({
    imports: [TypeOrmModule.forFeature([PatientStatusModel]), AuthModule, PatientDataAccessModule],
    exports: [IPatientStatusRepository],
    controllers: [PatientStatusController],
    providers: [
        PatientStatusUseCasesFactory,
        {
            provide: IPatientStatusRepository,
            useClass: PatientStatusRepository,
        },
        {
            provide: PatientStatusSpecification,
            useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                return new PatientStatusSpecification(patientDataAccessSpecification);
            },
            inject: [PatientDataAccessSpecification],
        },
    ],
})
export class PatientStatusModule {}
