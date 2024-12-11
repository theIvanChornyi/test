import { Module } from '@nestjs/common';
import { IbanService } from './iban.service';
import { PrismaService } from '../../services/prisma.service';
import { IbanController } from './iban.controller';

@Module({
  providers: [IbanService,PrismaService],
  controllers: [IbanController]
})
export class IbanModule {}
