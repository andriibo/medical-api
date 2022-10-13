import {CreateContactDto} from 'domain/dtos/emergency-contact/create-contact.dto';
import {IAuthedUserService} from 'app/services/authed-user.service';

export class CreateContactUseCase {
    constructor(private readonly authedUserService: IAuthedUserService) {}

    public async createContact(dto: CreateContactDto): Promise<void> {
        const patient = await this.authedUserService.getUser();
    }
}
