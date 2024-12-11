import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { IbanModule } from './modules/iban/iban.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [UserModule, TransactionModule, IbanModule, PaymentModule],
  providers: [AppService],
})
export class AppModule {}
