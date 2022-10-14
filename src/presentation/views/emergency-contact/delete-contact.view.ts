import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {DeleteContactDto} from 'domain/dtos/emergency-contact/delete-contact.dto';

export class DeleteContactView extends DeleteContactDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public contactId: string;
}
