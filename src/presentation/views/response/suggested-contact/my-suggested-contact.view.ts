import {ApiProperty} from '@nestjs/swagger';
import {MySuggestedContactDto} from 'domain/dtos/response/suggested-contact/my-suggested-contact.dto';

export class MySuggestedContactView implements MySuggestedContactDto {
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
    public suggestedAt: string;
}
