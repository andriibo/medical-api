import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IUserRepository} from 'app/repositories';
import {UserModel} from 'presentation/models/user.model';
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

            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }

    async getByUserId(userId: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {userId});
    }

    async getByEmail(email: string): Promise<User> {
        return await this.dataSource.manager.findOneBy(UserModel, {email});
    }
}
