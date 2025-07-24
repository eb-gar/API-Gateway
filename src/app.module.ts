import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { GraphqlService } from './clients/graphql.service';
import { WebsocketClient } from './clients/websocket.client';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [GraphqlService, WebsocketClient],
})
export class AppModule {}
