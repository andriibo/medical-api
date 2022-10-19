import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/patient-data-access';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {UserRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'presentation/models';
import {PatientUseCasesFactory, DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessEntityMapper} from 'infrastructure/mappers/patient-data-access-model.mapper';
import {AuthModule} from 'infrastructure/modules';
import {PatientDataAccessSpecification} from 'app/specifications/patient-data-access.specification';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel]), AuthModule],
    exports: [IPatientDataAccessRepository, PatientDataAccessSpecification],
    controllers: [PatientController, DoctorController],
    providers: [
        PatientUseCasesFactory,
        DoctorUseCasesFactory,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IPatientDataAccessRepository,
            useClass: PatientDataAccessRepository,
        },
        {
            provide: IPatientDataAccessEntityMapper,
            useClass: PatientDataAccessEntityMapper,
        },
        {
            provide: PatientDataAccessSpecification,
            useFactory: (patientDataAccessRepository: IPatientDataAccessRepository) => {
                return new PatientDataAccessSpecification(patientDataAccessRepository);
            },
            inject: [IPatientDataAccessRepository],
        },
    ],
})
export class PatientDataAccessModule {}
