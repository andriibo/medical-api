import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Auth} from 'presentation/guards';
import {UserView} from 'views/user/user.view';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
    @Auth()
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: HttpStatus.OK, type: UserView})
    public async get(): Promise<UserView> {
        return new UserView();
    }
}
