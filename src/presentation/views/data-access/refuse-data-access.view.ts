import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {RefuseDataAccessDto} from 'domain/dtos/data-access/refuse-data-access.dto';

export class RefuseDataAccessView extends RefuseDataAccessDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public accessId: string;
}
