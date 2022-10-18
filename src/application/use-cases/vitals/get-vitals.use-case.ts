import {IAuthedUserService} from 'app/services/authed-user.service';
import {GetVitalsDto} from 'domain/dtos/request/vital';

export class GetVitalsUseCase {
    constructor(private readonly authedUserService: IAuthedUserService) {}

    public async getVitals(dto: GetVitalsDto): Promise<void> {
    }
}
