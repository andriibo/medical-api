import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories/suggested-contact.repository';
import {SuggestedContactModel} from 'infrastructure/models/suggested-contact.model';

@Injectable()
export class SuggestedContactRepository implements ISuggestedContactRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(suggestedContact: SuggestedContactModel): Promise<void> {
        await this.dataSource.manager.save(suggestedContact);
    }
}
