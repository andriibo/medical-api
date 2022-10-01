import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IUserRepository} from 'app/abstractions/repositories/user.repository';
import {User} from 'domain/entities/user.entity';
import {UserModel} from 'presentation/models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async create(entity: UserModel): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            entity = await queryRunner.manager.save(entity);

            entity.metadata.userId = entity.userId;

            await queryRunner.manager.save(entity.metadata);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

        return entity;
    }
}
