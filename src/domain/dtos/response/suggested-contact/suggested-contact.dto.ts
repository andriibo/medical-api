import {UserDto} from 'domain/dtos/response/user/user.dto';

export class SuggestedContactDto {
    public contactId: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public phone: string;

    public relationship: string;

    public suggestedAt: number;

    public suggestedByUser?: UserDto;
}
