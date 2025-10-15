import { Document } from 'mongoose';

export interface IOrder extends Document {
    clientName: string;
}