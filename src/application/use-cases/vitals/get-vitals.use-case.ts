import {IAuthedUserService} from 'app/services/authed-user.service';
import {GetVitalsDto} from 'domain/dtos/vital/get-vitals.dto';

export class GetVitalsUseCase {
    constructor(private readonly authedUserService: IAuthedUserService) {}

    public async getVitals(dto: GetVitalsDto): Promise<void> {
    }
}
