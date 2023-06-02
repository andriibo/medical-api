import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In, LessThan} from 'typeorm';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserModel} from './user.model';
import {User} from 'domain/entities';
import {EntityNotFoundError} from 'app/errors';
import {currentUnixTimestamp} from 'support/date.helper';
import {EntityManager} from 'typeorm/entity-manager/EntityManager';
import {PatientVitalThresholdsModel} from 'infrastructure/modules/patient-vital-thresholds/models';
import {arrayUnique} from 'support/array.helper';

@Injectable()
export class UserRepository implements IUserRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async insertPatient(patient: UserModel, vitalThresholds: PatientVitalThresholdsModel): Promise<User> {
        const performQueries = async function (manager: EntityManager): Promise<User> {
            const persistedEntity = await manager.save(patient);
            if (patient.patientMetadata) {
                await manager.save(patient.patientMetadata);
            }
            await manager.save(vitalThresholds);

            return persistedEntity;
        };

        return await this.performInTransaction(performQueries);
    }

    public async persist(entity: UserModel): Promise<User> {
        const performQueries = async function (manager: EntityManager): Promise<User> {
            const persistedEntity = await manager.save(entity);
            if (entity.patientMetadata) {
                await manager.save(entity.patientMetadata);
            }
            if (entity.doctorMetadata) {
                await manager.save(entity.doctorMetadata);
            }

            return persistedEntity;
        };

        return await this.performInTransaction(performQueries);
    }

    public async updateAvatar(entity: User): Promise<void> {
        await this.dataSource.manager.save(entity);
    }

    public async getOneById(id: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {id});
    }

    public async getOneByIdOrFail(id: string): Promise<User> {
        const user = await this.dataSource.manager.findOneBy(UserModel, {id});
        if (user === null) {
            throw new EntityNotFoundError('User Not Found.');
        }

        return user;
    }

    public async getByIds(ids: string[]): Promise<User[]> {
        if (!ids.length) {
            return [];
        }

        return await this.dataSource.manager.findBy(UserModel, {
            id: In(arrayUnique(ids)),
        });
    }

    public async getOneByEmail(email: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {email});
    }

    public async getUsersForDeletingMarkedDeletedAt(): Promise<User[]> {
        const time = currentUnixTimestamp() - 30 * 24 * 60 * 60; /* now() - 30 days */
        return await this.dataSource.manager.findBy(UserModel, {deletedAt: LessThan(time)});
    }

    private async performInTransaction(performQueries: (manager: EntityManager) => Promise<User>): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const persistedEntity = await performQueries(queryRunner.manager);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return persistedEntity;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }
}
