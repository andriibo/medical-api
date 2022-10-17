import {ApiProperty} from '@nestjs/swagger';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

export class ContactView implements ContactDto {
    @ApiProperty()
    contactId: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    relationship: string;

    @ApiProperty()
    createdAt: string;
}
