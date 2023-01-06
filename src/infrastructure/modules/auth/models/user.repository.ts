import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In, MoreThan} from 'typeorm';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserModel} from './user.model';
import {User} from 'domain/entities';
import {EntityNotFoundError} from 'app/errors';
import {currentUnixTimestamp} from 'app/support/date.helper';

@Injectable()
export class UserRepository implements IUserRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async persist(entity: UserModel): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const persistedEntity = await queryRunner.manager.save(entity);
            if (entity.patientMetadata) {
                await queryRunner.manager.save(entity.patientMetadata);
            }
            if (entity.doctorMetadata) {
                await queryRunner.manager.save(entity.doctorMetadata);
            }

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return persistedEntity;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
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

        return await this.dataSource.manager.findBy(UserModel, {id: In(ids)});
    }

    public async getOneByEmail(email: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {email});
    }

    public async removeUsersMarkedDeletedAt(): Promise<void> {
        await this.dataSource.manager
            .createQueryBuilder()
            .delete()
            .from(UserModel)
            .where({deletedAt: MoreThan(currentUnixTimestamp())})
            .execute();
    }
}
