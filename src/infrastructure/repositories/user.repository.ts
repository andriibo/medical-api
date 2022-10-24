import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserModel} from 'infrastructure/models';
import {User} from 'domain/entities';

@Injectable()
export class UserRepository implements IUserRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(entity: UserModel): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const persistedEntity = await queryRunner.manager.save(entity);
            await queryRunner.manager.save(entity.metadata);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return persistedEntity;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }

    public async updateUserAndMetadata(entity: UserModel): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(entity);
            await queryRunner.manager.save(entity.metadata);

            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }

    public async getOneById(id: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {id});
    }

    public async getByIds(ids: string[]): Promise<User[]> {
        return await this.dataSource.manager.findBy(UserModel, {id: In(ids)});
    }

    public async getOneByEmail(email: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {email});
    }
}
