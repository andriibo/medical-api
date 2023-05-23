import {Injectable, CanActivate, ExecutionContext, UseGuards, UnauthorizedException} from '@nestjs/common';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {isNullOrUndefined} from 'support/type.helper';

@Injectable()
export class ProfileRecoveryGuard implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: UserRequest = context.switchToHttp().getRequest();

        if (isNullOrUndefined(request.user) || isNullOrUndefined(request.user.accessTokenClaims)) {
            throw new UnauthorizedException();
        }

        return true;
    }
}

export const ProfileRecovery = () => UseGuards(ProfileRecoveryGuard);
