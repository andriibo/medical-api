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

@WebSocketGateway(3001, {
    cors: {
        origin: '*',
    },
    namespace: '/current-vitals',
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('messageToServer')
    public handleMessage(client: Socket, payload: any): void {
        this.server.in(payload.room).emit('messageToClient', payload);
    }

    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, payload: any): void {
        if ('fromRoom' in payload) {
            client.leave(payload.fromRoom);
        }
        client.join(payload.toRoom);
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, room: string): void {
        client.leave(room);
    }

    public afterInit(client: Server): void {
        return this.logger.log('Init');
    }

    public handleDisconnect(client: Socket): void {
        return this.logger.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket): void {
        return this.logger.log(`Client connected: ${client.id}`);
    }
}
