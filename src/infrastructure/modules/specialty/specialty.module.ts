import {Module} from '@nestjs/common';
import {SpecialtyController} from 'controllers/specialty.controller';
import {ISpecialtyRepository} from 'app/modules/specialty/repositories';
import {SpecialtyRepository} from './models/specialty.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpecialtyModel} from './models/specialty.model';
import {SpecialtyUseCasesFactory} from './factories/specialty-use-cases.factory';
import {AuthModule} from 'infrastructure/modules';

@Module({
    imports: [TypeOrmModule.forFeature([SpecialtyModel]), AuthModule],
    controllers: [SpecialtyController],
    providers: [
        SpecialtyUseCasesFactory,
        {
            provide: ISpecialtyRepository,
            useClass: SpecialtyRepository,
        },
    ],
})
export class SpecialtyModule {}
