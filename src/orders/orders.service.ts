import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './interface/user.interface';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel:Model<IOrder> ) { }
    async newOrder(data: CreateOrderDto):Promise<string>{
        try {
            const newOrder = new this.orderModel(data);
            await newOrder.save();
            return "New order created successfully";
        } catch (error) {
            throw new Error("Failed to create a new order");
        }
    }
    async getAllOrders(): Promise<IOrder[]> {
        try {
            return await this.orderModel.find().exec();
        } catch (error) {
            throw new Error("Failed to fetch orders");
        }
    }
    async getOrder(id : string): Promise<IOrder> {
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
    updateStatusOrder(): string {
        try {
            return "Order status updated";
        } catch (error) {
            throw new Error("Failed to update order status");
        }
    }
}
