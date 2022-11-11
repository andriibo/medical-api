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
import {WsAuth} from 'presentation/guards';
import {MessageDto} from './message.dto';

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

    @WsAuth()
    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, room: string): void {
        client.join(room);
        this.logger.log(`Client ${client.id} joined the room ${room}`);
        client.emit('joinedRoom', room);
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, room: string): void {
        client.leave(room);
        this.logger.log(`Client ${client.id} left the room ${room}`);
    }

    @SubscribeMessage('messageToServer')
    public handleMessage(client: Socket, payload: MessageDto): void {
        this.server.in(payload.room).emit('messageToClient', payload);
    }
}
