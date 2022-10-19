import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource, In} from 'typeorm';
import {IUserRepository} from 'app/repositories';
import {UserModel} from 'infrastructure/models/user.model';
import {User} from 'domain/entities';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async create(entity: UserModel): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(entity);
            await queryRunner.manager.save(entity.metadata);
        } finally {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }

    async updateUserAndMetadata(entity: UserModel): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(entity);
            await queryRunner.manager.save(entity.metadata);
        } finally {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }

    async getOneByUserId(userId: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {userId});
    }

    async getByUserIds(userIds: string[]): Promise<User[]> {
        return await this.dataSource.manager.findBy(UserModel, {userId: In(userIds)});
    }

    async getOneByEmail(email: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {email});
    }
}
