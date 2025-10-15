import { IsDate, IsEnum, IsString, Length} from "class-validator";

export class CreateOrderDto {
    @IsString()
    @Length(3, 50, { message: 'Product name must be between 3 and 50 characters' })
    clientName: string;
}