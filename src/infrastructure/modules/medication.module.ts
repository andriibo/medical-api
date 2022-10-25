import {Module} from '@nestjs/common';
import {MedicationController} from 'controllers/medication.controller';
import {IMedicationRepository} from 'app/modules/medication/repositories';
import {MedicationRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MedicationModel} from 'infrastructure/models';
import {AuthModule} from 'infrastructure/modules';
import {MedicationUseCasesFactory} from 'infrastructure/factories/medication-use-cases.factory';

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
