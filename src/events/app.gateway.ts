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
    namespace: '/chat',
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('msgToServer')
    public handleMessage(client: Socket, payload: any): void {
        this.server.in(payload.room).emit('msgToClient', payload);
    }

    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, room: string): void {
        client.join(room);
        client.emit('joinedRoom', room);
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, room: string): void {
        client.leave(room);
        client.emit('leftRoom', room);
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
