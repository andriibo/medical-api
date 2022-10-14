import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IEmergencyContactRepository} from 'app/repositories';
import {EmergencyContact} from 'domain/entities';
import {EmergencyContactModel} from 'presentation/models';

@Injectable()
export class EmergencyContactRepository implements IEmergencyContactRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async create(emergencyContact: EmergencyContactModel): Promise<void> {
        await this.dataSource.manager.save(emergencyContact);
    }

    async getOneByContactId(contactId: string): Promise<EmergencyContact> {
        return await this.dataSource.manager.findOneBy(EmergencyContactModel, {contactId});
    }
}
