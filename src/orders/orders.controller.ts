import { Body, Controller, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDocument } from './schemas/order.schema';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async createOrder(@Body() body: CreateOrderDto): Promise<string> {
        try {
            return await this.ordersService.createOrder(body);
        } catch (error) {
            throw new HttpException("Failed to create a new order", 500);
        }
    }
    @Get()
    async getAllOrders(): Promise<OrderDocument[]> {
        try {
            return await this.ordersService.getAllOrders();
        } catch (error) {
            throw new HttpException("Failed to fetch orders", 500);
        }
    }
    @Get(':id')
    async getOrder(@Param('id') id:string): Promise<OrderDocument> {
        try {
            return await this.ordersService.getOrder(id);
        } catch (error) {
            throw new HttpException("Failed to fetch the order", 500);
        }
    }
    @Patch(':id/status')
    async updateStatusOrder(@Param('id') id:string , @Body() body: UpdateOrderDto): Promise<string> {
        try {
            return await this.ordersService.updateStatusOrder(id,body);
        } catch (error) {
            throw new HttpException("Failed to update order status", 500);
        }
    }
}
