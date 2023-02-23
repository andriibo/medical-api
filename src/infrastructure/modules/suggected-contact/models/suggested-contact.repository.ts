import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {SuggestedContactModel} from './suggested-contact.model';
import {SuggestedContact} from 'domain/entities';

@Injectable()
export class SuggestedContactRepository implements ISuggestedContactRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(suggestedContact: SuggestedContactModel): Promise<void> {
        await this.dataSource.manager.save(suggestedContact);
    }

    public async getOneById(id: string): Promise<SuggestedContact> {
        return await this.dataSource.manager.findOneBy(SuggestedContactModel, {id});
    }

    public async delete(suggestedContact: SuggestedContactModel): Promise<void> {
        await this.dataSource.manager.remove(suggestedContact);
    }

    public async getByPatientUserId(patientUserId: string): Promise<SuggestedContact[]> {
        return await this.dataSource.manager.find(SuggestedContactModel, {
            where: {patientUserId},
            order: {
                firstName: 'ASC',
                lastName: 'ASC',
            },
        });
    }

    public async getByPatientUserIdAndSuggestedBy(
        patientUserId: string,
        suggestedBy: string,
    ): Promise<SuggestedContact[]> {
        return await this.dataSource.manager.findBy(SuggestedContactModel, {patientUserId, suggestedBy});
    }
}
