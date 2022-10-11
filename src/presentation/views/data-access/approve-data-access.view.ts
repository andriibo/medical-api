import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {ApproveDataAccessDto} from 'domain/dtos/data-access/approve-data-access.dto';

export class ApproveDataAccessView extends ApproveDataAccessDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public accessId: string;
}
