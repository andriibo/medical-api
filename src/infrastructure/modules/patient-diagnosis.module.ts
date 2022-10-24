import {Module} from '@nestjs/common';
import {PatientDiagnosisController} from 'controllers/patient-diagnosis.controller';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosisRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDiagnosisModel} from 'infrastructure/models';
import {PatientDiagnosisUseCasesFactory} from 'infrastructure/factories/patient-diagnosis-use-cases.factory';
import {IPatientDiagnosisEntityMapper} from 'app/modules/patient-diagnosis/mappers/patient-diagnosis-entity.mapper';
import {PatientDiagnosisEntityMapper} from 'infrastructure/mappers/patient-diagnosis-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientDiagnosisSpecification} from 'app/modules/patient-diagnosis/specifications/patient-diagnosis.specification';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDiagnosisModel]), AuthModule, PatientDataAccessModule],
    controllers: [PatientDiagnosisController],
    providers: [
        PatientDiagnosisUseCasesFactory,
        PatientDiagnosisSpecification,
        {
            provide: IPatientDiagnosisRepository,
            useClass: PatientDiagnosisRepository,
        },
        {
            provide: IPatientDiagnosisEntityMapper,
            useClass: PatientDiagnosisEntityMapper,
        },
    ],
})
export class PatientDiagnosisModule {}
