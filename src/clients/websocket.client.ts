import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketClient {
  private socket: ReturnType<typeof io>;

  constructor() {
    const url = process.env.WS_URL;
    if (!url) throw new Error('WS_URL no definida');

    this.socket = io(url);

    this.socket.on('connect', () => {
      console.log('Conectado al WebSocket');
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  sendMessage(event: string, data: any) {
    this.emit(event, data);
  }
}
