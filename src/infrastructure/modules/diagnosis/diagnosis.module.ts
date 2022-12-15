import {Module} from '@nestjs/common';
import {DiagnosisController} from 'controllers/diagnosis.controller';
import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';
import {DiagnosisRepository} from './models/diagnosis.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DiagnosisModel} from './models/diagnosis.model';
import {DiagnosisUseCasesFactory} from './factories/diagnosis-use-cases.factory';
import {AuthModule} from 'infrastructure/modules';

@Module({
    imports: [TypeOrmModule.forFeature([DiagnosisModel]), AuthModule],
    controllers: [DiagnosisController],
    providers: [
        DiagnosisUseCasesFactory,
        {
            provide: IDiagnosisRepository,
            useClass: DiagnosisRepository,
        },
    ],
})
export class DiagnosisModule {}
