
export class UpdateOrderEvent {
    constructor(
        public readonly orderId: string,
        public readonly clientName: string,
        public readonly newStatus: 'pending' | 'in_progress' | 'completed' | 'canceled',
        public readonly createdAt: Date,
        public readonly updatedAt: Date,    
    ) {}
}