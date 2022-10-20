import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IUserRepository} from 'app/repositories';
import {UserModel} from 'infrastructure/models';
import {User} from 'domain/entities';

@Injectable()
export class UserRepository implements IUserRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(entity: UserModel): Promise<void> {
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

    public async getOneByUserId(userId: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {userId});
    }

    public async getByUserIds(userIds: string[]): Promise<User[]> {
        return await this.dataSource.manager.findBy(UserModel, {userId: In(userIds)});
    }

    public async getOneByEmail(email: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {email});
    }
}
