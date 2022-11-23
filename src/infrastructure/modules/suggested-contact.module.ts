import {Module} from '@nestjs/common';
import {DoctorController} from 'controllers/suggested-contact';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DoctorUseCasesFactory} from 'infrastructure/factories/suggested-contact';
import {AuthModule} from 'infrastructure/modules';
import {SuggestedContactModel} from 'infrastructure/models/suggested-contact.model';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactRepository} from 'infrastructure/repositories/suggested-contact.repository';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {SuggestedContactModelMapper} from 'infrastructure/mappers/suggested-contact-model.mapper';
import {DeleteSuggestedContactByDoctorService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-doctor.service';

@Module({
    imports: [TypeOrmModule.forFeature([SuggestedContactModel]), AuthModule],
    controllers: [DoctorController],
    providers: [
        DoctorUseCasesFactory,
        SuggestedContactSpecification,
        {
            provide: ISuggestedContactRepository,
            useClass: SuggestedContactRepository,
        },
        {
            provide: ISuggestedContactEntityMapper,
            useClass: SuggestedContactModelMapper,
        },
        {
            provide: DeleteSuggestedContactByDoctorService,
            useFactory: (
                suggestedContactRepository: ISuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeleteSuggestedContactByDoctorService(
                    suggestedContactRepository,
                    suggestedContactSpecification,
                );
            },
            inject: [ISuggestedContactRepository, SuggestedContactSpecification],
        },
    ],
})
export class SuggestedContactModule {}
