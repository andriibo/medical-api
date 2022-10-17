import {ApiProperty} from '@nestjs/swagger';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserView} from 'presentation/views/response/user';

export class DataAccessView implements DataAccessDto {
    @ApiProperty()
    accessId: string;

    @ApiProperty()
    direction: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    requestedUser: UserView;
}
