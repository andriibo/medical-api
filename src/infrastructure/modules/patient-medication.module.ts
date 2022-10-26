import {Module} from '@nestjs/common';
import {PatientMedicationController} from 'controllers/patient-medication.controller';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientMedicationRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientMedicationModel} from 'infrastructure/models';
import {PatientMedicationUseCasesFactory} from 'infrastructure/factories/patient-medication-use-cases.factory';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {PatientMedicationEntityMapper} from 'infrastructure/mappers/patient-medication-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

@Module({
    imports: [TypeOrmModule.forFeature([PatientMedicationModel]), AuthModule, PatientDataAccessModule],
    controllers: [PatientMedicationController],
    providers: [
        PatientMedicationUseCasesFactory,
        {
            provide: IPatientMedicationRepository,
            useClass: PatientMedicationRepository,
        },
        {
            provide: IPatientMedicationEntityMapper,
            useClass: PatientMedicationEntityMapper,
        },
        {
            provide: PatientMedicationSpecification,
            useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                return new PatientMedicationSpecification(patientDataAccessSpecification);
            },
            inject: [PatientDataAccessSpecification],
        },
    ],
})
export class PatientMedicationModule {}
