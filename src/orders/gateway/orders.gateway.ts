import { ConnectedSocket, WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ORDER_STATUS_UPDATED_SOCKET } from 'src/common/constant';
import { UpdateOrderEvent } from '../event/order-status-update.event';

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class OrdersGateway {
    @WebSocketServer()
    server: Server;
    private userSockets = new Map<string, string>();

    handleConnection(client: Socket) {}

    handleDisconnect(client: Socket) {
        for (const [userId, sid] of this.userSockets.entries()) {
            if (sid === client.id) {
                this.userSockets.delete(userId);
                break;
            }
        }
        console.log('disconnected', client.id);
    }

    
    @SubscribeMessage('register')
    handleRegister(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
        if (data && data.userId) {
            this.userSockets.set(data.userId, client.id);
            client.emit('registered', { success: true });
        }
    }

    emitToSocket(payload: UpdateOrderEvent | any) {
        const socketId = this.userSockets.get(payload.userName);
        this.server.to(socketId!).emit(ORDER_STATUS_UPDATED_SOCKET, payload);
    }
}
