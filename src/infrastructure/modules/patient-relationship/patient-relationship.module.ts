import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientRelationshipModel, PatientRelationshipRepository} from './models';
import {IPatientRelationshipRepository} from 'app/modules/patient-relationship/repositories';

@Module({
    imports: [TypeOrmModule.forFeature([PatientRelationshipModel])],
    exports: [IPatientRelationshipRepository],
    providers: [
        {
            provide: IPatientRelationshipRepository,
            useClass: PatientRelationshipRepository,
        },
    ],
})
export class PatientRelationshipModule {}
