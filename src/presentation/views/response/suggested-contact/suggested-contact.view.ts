import {ApiProperty} from '@nestjs/swagger';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';

export class SuggestedContactView implements SuggestedContactDto {
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
    public suggestedBy: string;

    @ApiProperty()
    public suggestedAt: string;
}
