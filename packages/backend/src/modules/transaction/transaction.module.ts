import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { PrismaService } from '../../services/prisma.service';
import { TransactionController } from './transaction.controller';

@Module({
  providers: [TransactionService,PrismaService],
  controllers: [TransactionController],
})
export class TransactionModule {}
