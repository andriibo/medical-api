import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IEmergencyContactRepository} from 'app/repositories';
import {EmergencyContact} from 'domain/entities';
import {EmergencyContactModel} from 'infrastructure/models';

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
        return await this.dataSource.manager.findBy(EmergencyContactModel, {userId});
    }
}
