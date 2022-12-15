import {Module} from '@nestjs/common';
import {MedicationController} from 'controllers/medication.controller';
import {IMedicationRepository} from 'app/modules/medication/repositories';
import {MedicationRepository} from './models/medication.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MedicationModel} from './models/medication.model';
import {AuthModule} from 'infrastructure/modules';
import {MedicationUseCasesFactory} from './factories/medication-use-cases.factory';

@Module({
    imports: [TypeOrmModule.forFeature([MedicationModel]), AuthModule],
    controllers: [MedicationController],
    providers: [
        MedicationUseCasesFactory,
        {
            provide: IMedicationRepository,
            useClass: MedicationRepository,
        },
    ],
})
export class MedicationModule {}
