import {ApiProperty} from '@nestjs/swagger';
import {ContactDto} from 'domain/dtos/response/emergency-contact/contact.dto';

export class ContactView implements ContactDto {
    @ApiProperty()
    public contactId: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public relationship: string;

    @ApiProperty()
    public createdAt: string;
}
