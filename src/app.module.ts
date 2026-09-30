import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './controllers/AccountController';
import { AccountService } from './services/AccountService';
import { AccountRepository } from './repositories/AccountRepository';
import { Account, AccountSchema } from './models/Account';
import { Client, ClientSchema } from './models/Client';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/bank-api'),
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Client.name, schema: ClientSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log('Módulo de aplicación inicializado');
  }

  onModuleDestroy() {
    console.log('Módulo de aplicación destruido');
  }
}