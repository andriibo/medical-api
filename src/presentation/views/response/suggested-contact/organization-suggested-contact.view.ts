import {ApiProperty} from '@nestjs/swagger';
import {OrganizationSuggestedContactDto} from 'domain/dtos/response/suggested-contact';
import {UserView} from 'views/response/user';

export class OrganizationSuggestedContactView implements OrganizationSuggestedContactDto {
    @ApiProperty()
    public contactId: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public email: string | null;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public fax: string | null;

    @ApiProperty()
    public type: string;

    @ApiProperty()
    public suggestedAt: number;

    @ApiProperty()
    public suggestedByUser: UserView;
}
