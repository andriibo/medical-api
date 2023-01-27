import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientCategoryModel, PatientCategoryRepository} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategoryController} from 'controllers/patient-category.controller';
import {PatientCategoryUseCasesFactory} from 'infrastructure/modules/patient-category/factories/patient-category-use-cases.factory';

@Module({
    imports: [TypeOrmModule.forFeature([PatientCategoryModel]), AuthModule, PatientDataAccessModule],
    controllers: [PatientCategoryController],
    providers: [
        PatientCategoryUseCasesFactory,
        {
            provide: IPatientCategoryRepository,
            useClass: PatientCategoryRepository,
        },
    ],
})
export class PatientCategoryModule {}
