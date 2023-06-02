import {ApiProperty} from '@nestjs/swagger';
import {DataAccessDto} from 'domain/dtos/response/data-access/data-access.dto';
import {UserView} from 'presentation/views/response/user';

export class DataAccessView implements DataAccessDto {
    @ApiProperty()
    public accessId: string;

    @ApiProperty()
    public direction: string;

    @ApiProperty()
    public status: string;

    @ApiProperty()
    public createdAt: string;

    @ApiProperty()
    public lastInviteSentAt: number;

    @ApiProperty()
    public requestedUser: UserView;
}
