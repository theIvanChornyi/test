import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from '../../services/prisma.service';

@Module({
  providers: [PaymentService,PrismaService],
  controllers: [PaymentController]
})
export class PaymentModule {}
