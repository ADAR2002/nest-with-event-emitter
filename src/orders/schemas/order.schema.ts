import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

const validStatuses = ['pending', 'in_progress', 'completed', 'canceled'] as const;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    clientName: string;

    @Prop({ required: true, enum: validStatuses, default: 'pending' })
    status: 'pending' | 'in_progress' | 'completed' | 'canceled';
}

export const OrderSchema = SchemaFactory.createForClass(Order);