import {UserDto} from 'domain/dtos/response/user/user.dto';

export class OrganizationSuggestedContactDto {
    public contactId: string;

    public name: string;

    public email: string | null;

    public phone: string;

    public fax: string | null;

    public type: string;

    public suggestedAt: number;

    public suggestedByUser?: UserDto;
}
