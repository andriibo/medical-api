import {Module} from '@nestjs/common';
import {PatientMedicationController} from 'controllers/patient-medication.controller';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientMedicationModel, PatientMedicationRepository} from './models';
import {PatientMedicationUseCasesFactory} from './factories/patient-medication-use-cases.factory';
import {IPatientMedicationEntityMapper} from 'app/modules/patient-medication/mappers/patient-medication-entity.mapper';
import {PatientMedicationModelMapper} from './mappers/patient-medication-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientMedicationSpecification} from 'app/modules/patient-medication/specifications/patient-medication.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserRepository} from 'infrastructure/modules/auth/models';

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
            useClass: PatientMedicationModelMapper,
        },
        {
            provide: IUserRepository,
            useClass: UserRepository,
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
