import {Module} from '@nestjs/common';
import {PatientDiagnosisController} from 'controllers/patient-diagnosis.controller';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosisModel, PatientDiagnosisRepository} from './models';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDiagnosisUseCasesFactory} from './factories/patient-diagnosis-use-cases.factory';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosisModelMapper} from './mappers/patient-diagnosis-model.mapper';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserRepository} from 'infrastructure/modules/auth/models';
import {UserIndependentModule} from 'infrastructure/modules/auth/user.ind.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PatientDiagnosisModel]),
        AuthModule,
        PatientDataAccessModule,
        UserIndependentModule,
    ],
    controllers: [PatientDiagnosisController],
    providers: [
        PatientDiagnosisUseCasesFactory,
        {
            provide: IPatientDiagnosisRepository,
            useClass: PatientDiagnosisRepository,
        },
        {
            provide: IPatientDiagnosisEntityMapper,
            useClass: PatientDiagnosisModelMapper,
        },
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: PatientDiagnosisSpecification,
            useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                return new PatientDiagnosisSpecification(patientDataAccessSpecification);
            },
            inject: [PatientDataAccessSpecification],
        },
    ],
})
export class PatientDiagnosisModule {}
