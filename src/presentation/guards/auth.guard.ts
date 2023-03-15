import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UseGuards,
    UnauthorizedException,
    Inject,
    ForbiddenException,
} from '@nestjs/common';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {isNullOrUndefined} from 'app/support/type.helper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(@Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: UserRequest = context.switchToHttp().getRequest();

        if (isNullOrUndefined(request.user) || isNullOrUndefined(request.user.accessTokenClaims)) {
            throw new UnauthorizedException();
        }

        try {
            await this.authedUserService.getActiveUserOrFail();
        } catch (error) {
            throw new ForbiddenException(error.message);
        }

        return true;
    }
}

export const Auth = () => UseGuards(AuthGuard);
