import {
    ExecutionContext,
    UseGuards,
    CanActivate,
    UnauthorizedException,
    Injectable,
    applyDecorators,
    SetMetadata,
} from '@nestjs/common';
import {WsException} from '@nestjs/websockets';
import {isNullOrUndefined} from 'app/support/type.helper';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {Reflector} from '@nestjs/core';
import {IRequestUserModel} from 'app/modules/auth/models';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientRoomDto} from 'domain/dtos/gateway';
import {PatientDataAccessSpecificationError} from 'app/modules/patient-data-access/errors';

class GuardOptions {
    public onlyRoles: string[] = [];
}

@Injectable()
export class WsPatientDataAccessGuard implements CanActivate {
    public constructor(
        private readonly reflector: Reflector,
        private readonly requestUserService: RequestUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestUser = await this.getRequestUser(context);

        this.assertUserRolesAllowed(context, requestUser);

        await this.assertUserHasAccess(context, requestUser);

        return true;
    }

    private async getRequestUser(context: ExecutionContext): Promise<IRequestUserModel> {
        const headers = context.switchToWs().getClient().handshake.headers;

        const requestUser = await this.requestUserService.getUserDataByHttpHeaders(headers);

        if (isNullOrUndefined(requestUser)) {
            throw new WsException(new UnauthorizedException());
        }

        return requestUser;
    }

    private extractRequestData(context: ExecutionContext): PatientRoomDto {
        const patientRoomDto = context.switchToWs().getData() as PatientRoomDto;

        if (!patientRoomDto.patientUserId) {
            throw new WsException(new UnauthorizedException());
        }

        return patientRoomDto;
    }

    private assertUserRolesAllowed(context: ExecutionContext, requestUser: IRequestUserModel): void {
        const {onlyRoles} = this.reflector.get<GuardOptions>('options', context.getHandler());

        if (!onlyRoles.length) {
            return;
        }

        const userRoles: string[] = requestUser.accessTokenClaims.getRoles();

        for (const onlyRole of onlyRoles) {
            if (userRoles.includes(onlyRole)) {
                return;
            }
        }

        throw new WsException(new UnauthorizedException());
    }

    private async assertUserHasAccess(context: ExecutionContext, requestUser: IRequestUserModel): Promise<void> {
        const requestUserId = requestUser.accessTokenClaims.getUserId();
        const patientUserId = this.extractRequestData(context).patientUserId;

        if (requestUserId === patientUserId) {
            return;
        }

        try {
            await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
                requestUserId,
                patientUserId,
            );
        } catch (error) {
            if (error instanceof PatientDataAccessSpecificationError) {
                throw new WsException(new UnauthorizedException());
            }
            throw error;
        }
    }
}

export const WsPatientDataAccess = (options: GuardOptions) =>
    applyDecorators(SetMetadata('options', options), UseGuards(WsPatientDataAccessGuard));
