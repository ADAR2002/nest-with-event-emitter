import { ORDER_STATUS_UPDATED } from "src/common/constant";
import { OrderServiceEvent } from "../event/order.service.event";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { OrdersGateway } from "../gateway/orders.gateway";

@Injectable()
export class OrderListenersService {
    constructor(private readonly ordersGetway: OrdersGateway) { }

    @OnEvent(ORDER_STATUS_UPDATED)
    handleOrderStatusUpdatedEvent(payload: any) {
        console.log(`Order Status Updated Event Received:`, payload);
        this.ordersGetway.emitToSocket(payload);
    }
}