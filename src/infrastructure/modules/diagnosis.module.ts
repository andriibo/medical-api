import {Module} from '@nestjs/common';
import {DiagnosisController} from 'controllers/diagnosis.controller';
import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';
import {DiagnosisRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DiagnosisModel} from 'infrastructure/models';
import {DiagnosisUseCasesFactory} from 'infrastructure/factories/diagnosis-use-cases.factory';
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
