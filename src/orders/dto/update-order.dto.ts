
import { IsIn, IsString, IsOptional } from 'class-validator';

const validStatuses = ['pending', 'in_progress', 'completed', 'canceled'] as const;

export class UpdateOrderDto {
    @IsString()
    @IsIn(validStatuses as any)
    status: 'pending' | 'in_progress' | 'completed' | 'canceled';
}