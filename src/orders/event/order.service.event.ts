import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventEmitter2 } from 'eventemitter2';
import { Order } from "../schemas/order.schema";
import { ORDER_STATUS_UPDATED } from "src/common/constant";

@Injectable()
export class OrderServiceEvent {
    constructor(private emitter: EventEmitter2) {}

    @OnEvent(ORDER_STATUS_UPDATED)
    emit(event: string, payload: any) {
        this.emitter.emit(event, payload);
    }
}