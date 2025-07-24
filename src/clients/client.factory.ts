import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

export function getTimeServiceClient(): ClientProxy {
  switch (process.env.TRANSPORT) {
    case 'tcp':
      return ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: process.env.TCP_HOST || 'localhost',
          port: parseInt(process.env.TCP_PORT || '3001'),
        },
      });
    case 'redis':
      return ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      });
    case 'nats':
      return ClientProxyFactory.create({
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL,
          queue: process.env.NATS_QUEUE,
        },
      });
    default:
      throw new Error('Transporte no soportado');
  }
}
