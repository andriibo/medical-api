import {Test, TestingModule} from '@nestjs/testing';
import {RemoveUsersJob} from './remove-users.job';

describe('CronService', () => {
    let service: RemoveUsersJob;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RemoveUsersJob],
        }).compile();

        service = module.get<RemoveUsersJob>(RemoveUsersJob);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
