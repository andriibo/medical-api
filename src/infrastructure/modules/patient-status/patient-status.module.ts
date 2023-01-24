import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'infrastructure/modules';
import {PatientStatusModel, PatientStatusRepository} from 'infrastructure/modules/patient-status/models';
import {PatientStatusController} from 'controllers/patient-status.controller';
import {PatientStatusUseCasesFactory} from 'infrastructure/modules/patient-status/factories/patient-status-use-cases.factory';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';

@Module({
    imports: [TypeOrmModule.forFeature([PatientStatusModel]), AuthModule],
    controllers: [PatientStatusController],
    providers: [
        PatientStatusUseCasesFactory,
        {
            provide: IPatientStatusRepository,
            useClass: PatientStatusRepository,
        },
    ],
})
export class PatientStatusModule {}
