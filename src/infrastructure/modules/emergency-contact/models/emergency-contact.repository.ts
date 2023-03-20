import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {EmergencyContact} from 'domain/entities';
import {EmergencyContactModel} from './emergency-contact.model';

@Injectable()
export class EmergencyContactRepository implements IEmergencyContactRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(emergencyContact: EmergencyContactModel): Promise<void> {
        await this.dataSource.manager.save(emergencyContact);
    }

    public async update(emergencyContact: EmergencyContactModel): Promise<void> {
        await this.dataSource.manager.save(emergencyContact);
    }

    public async delete(emergencyContact: EmergencyContactModel): Promise<void> {
        await this.dataSource.manager.remove(emergencyContact);
    }

    public async getOneById(id: string): Promise<EmergencyContact> {
        return await this.dataSource.manager.findOneBy(EmergencyContactModel, {id});
    }

    public async getByUserId(userId: string): Promise<EmergencyContact[]> {
        return await this.dataSource.manager.find(EmergencyContactModel, {
            where: {userId},
            order: {
                firstName: 'ASC',
                lastName: 'ASC',
            },
        });
    }

    public async countByUserId(userId: string): Promise<number> {
        return await this.dataSource.manager.countBy(EmergencyContactModel, {userId});
    }
}
