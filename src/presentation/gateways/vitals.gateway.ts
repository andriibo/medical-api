import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {Socket, Server} from 'socket.io';
import {WsRoles, WsPatientDataAccess} from 'presentation/guards';
import {PatientMessageDto, PatientRoomDto} from 'domain/dtos/gateway';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: '/ws/current-vitals',
})
export class VitalsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    public afterInit(client: Server): void {
        return this.logger.log('Init');
    }

    public handleConnection(client: Socket): void {
        return this.logger.log(`Client connected: ${client.id}`);
    }

    public handleDisconnect(client: Socket): void {
        return this.logger.log(`Client disconnected: ${client.id}`);
    }

    @WsPatientDataAccess({onlyRoles: ['Doctor']})
    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, patientRoomDto: PatientRoomDto): void {
        client.join(patientRoomDto.patientUserId);
        this.logger.log(`Client ${client.id} joined the room ${patientRoomDto.patientUserId}`);
        client.emit('joinedRoom', patientRoomDto.patientUserId);
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, patientRoomDto: PatientRoomDto): void {
        client.leave(patientRoomDto.patientUserId);
        this.logger.log(`Client ${client.id} left the room ${patientRoomDto.patientUserId}`);
    }

    @WsRoles('Patient')
    @SubscribeMessage('messageToServer')
    public handleMessage(client: Socket, payload: PatientMessageDto): void {
        this.server.in(payload.patientUserId).emit('messageToClient', payload);
    }
}
