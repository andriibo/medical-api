import {Inject, Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In, MoreThan} from 'typeorm';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserModel} from './user.model';
import {User} from 'domain/entities';
import {EntityNotFoundError} from 'app/errors';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';

@Injectable()
export class UserRepository implements IUserRepository {
    public constructor(
        @InjectDataSource() private dataSource: DataSource,
        @Inject(IAuthEventEmitter) private readonly authEventEmitter: IAuthEventEmitter,
    ) {}

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

    public async getUsersMarkedDeletedAt(): Promise<User[]> {
        const time = currentUnixTimestamp() - 30 * 24 * 60 * 60; /* now() - 30 days */
        return await this.dataSource.manager.findBy(UserModel, {deletedAt: MoreThan(time)});
    }

    public async delete(user: UserModel): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(UserModel)
                .where('id=:id', {id: user.id})
                .execute();
            await this.authEventEmitter.emitUserDeleted(user);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
