import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientCategoryModel, PatientCategoryRepository} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategoryController} from 'controllers/patient-category.controller';
import {PatientCategoryUseCasesFactory} from 'infrastructure/modules/patient-category/factories/patient-category-use-cases.factory';
import {PatientCategorySpecification} from 'app/modules/patient-category/specifications/patient-category.specification';

@Module({
    imports: [TypeOrmModule.forFeature([PatientCategoryModel]), AuthModule, forwardRef(() => PatientDataAccessModule)],
    exports: [IPatientCategoryRepository],
    controllers: [PatientCategoryController],
    providers: [
        PatientCategoryUseCasesFactory,
        {
            provide: IPatientCategoryRepository,
            useClass: PatientCategoryRepository,
        },
        {
            provide: PatientCategorySpecification,
            useClass: PatientCategorySpecification,
        },
    ],
})
export class PatientCategoryModule {}
