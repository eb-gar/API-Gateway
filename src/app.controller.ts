import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { getTimeServiceClient } from './clients/client.factory';
import { firstValueFrom } from 'rxjs';
import { GraphqlService } from './clients/graphql.service';
import { WebsocketClient } from './clients/websocket.client';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class AppController {
  private timeClient = getTimeServiceClient();

  constructor(
    private graphql: GraphqlService,
    private websocket: WebsocketClient,
  ) {}

  @Get('hora')
  async getTime() {
    return firstValueFrom(this.timeClient.send('get_time', {}));
  }

  @Get('productos')
  async getProductos() {
    return this.graphql.getAllProducts();
  }

  @Get('producto/:id')
  getById(@Param('id') id: string) {
    return this.graphql.getProductById(id);
  }

  @Post('producto')
  createProducto(@Body() body: CreateProductDto) {
    return this.graphql.createProduct(body);
  }

  @Get('enviar-mensaje')
  enviarMensaje(
    @Query('usuario') usuario: string,
    @Query('mensaje') mensaje: string,
  ) {
    console.log(`Mensaje recibido de ${usuario}: ${mensaje}`);

    this.websocket.sendMessage(usuario, mensaje);

    return {
      status: 'Mensaje enviado al chat',
      usuario,
      mensaje,
    };
  }
}
