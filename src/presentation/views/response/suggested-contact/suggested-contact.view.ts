import {ApiProperty} from '@nestjs/swagger';
import {SuggestedContactDto} from 'domain/dtos/response/suggested-contact/suggested-contact.dto';
import {UserView} from 'views/response/user';

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
    public suggestedAt: number;

    @ApiProperty()
    public suggestedByUser: UserView;
}
