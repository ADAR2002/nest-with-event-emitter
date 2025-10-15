import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_STATUS_UPDATED } from 'src/common/constant';
import { OrderServiceEvent } from './event/order.service.event';

@Injectable()
export class OrdersService {
   
    constructor(private orderServiceEvent:OrderServiceEvent ,@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }
    async newOrder(data: CreateOrderDto): Promise<string> {
        try {
            const newOrder = new this.orderModel(data);
            await newOrder.save();
            return "New order created successfully";
        } catch (error) {
            throw new Error("Failed to create a new order");
        }
    }
    async getAllOrders(): Promise<OrderDocument[]> {
        try {
            return await this.orderModel.find().exec();
        } catch (error) {
            throw new Error("Failed to fetch orders");
        }
    }
    async getOrder(id: string): Promise<OrderDocument> {
        try {
            const order = await this.orderModel.findById(id).exec();
            if (!order) {
                throw new Error("Order not found");
            }
            return order;
        } catch (error) {
            throw new Error("Failed to fetch the order");
        }
    }
    async updateStatusOrder(id: string, data: UpdateOrderDto): Promise<string> {
        try {
            console.log(data);
            let order = await this.orderModel.findById(id).exec();
            if (!order) {
                throw new Error("Order not found");
            }
            if (order.status == 'pending') {
                if (data.status == 'in_progress' || data.status == 'canceled') {
                    order.status = data.status as any;
                } else {
                    throw new Error("Invalid status transition");
                }
            }
            else if (order.status == 'in_progress') {
                if (data.status == 'completed') {
                    order.status = data.status as any;
                } else {
                    throw new Error("Invalid status transition");
                }
            } else {
                throw new Error("No further status updates allowed");
            }
            order = await order.save();

            this.orderServiceEvent.emit(ORDER_STATUS_UPDATED, {
                orderId: order._id,
                clientName: order.clientName,
                newStatus: order.status,
                createdAt: (order as any).createdAt,
                updatedAt: (order as any).updatedAt,
            });

            return "Order status updated";
        } catch (error) {
            throw new Error("Failed to update order status");
        }
    }
}
