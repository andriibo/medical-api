import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {DeleteDataAccessDto} from 'domain/dtos/data-access/delete-data-access.dto';

export class DeleteDataAccessView extends DeleteDataAccessDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public accessId: string;
}
