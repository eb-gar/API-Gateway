import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GraphqlService {
  constructor(private readonly http: HttpService) {}

  async getAllProducts(): Promise<any> {
    const url = process.env.GRAPHQL_URL;
    if (!url) throw new Error('GRAPHQL_URL no definida en .env');

    const query = `
      query {
        products {
          id
          name
          price
        }
      }
    `;

    const response = await firstValueFrom(
      this.http.post(url, { query })
    );
    return response.data;
  }

  async getProductById(id: string): Promise<any> {
    const url = process.env.GRAPHQL_URL;
    if (!url) throw new Error('GRAPHQL_URL no definida en .env');

    const query = `
      query {
        product(id: ${id}) {
          id
          name
          price
        }
      }
    `;

    const response = await firstValueFrom(
      this.http.post(url, { query })
    );
    return response.data;
  }

  async createProduct(input: { name: string; description?: string; price: number }): Promise<any> {
  const url = process.env.GRAPHQL_URL;
  if (!url) throw new Error('GRAPHQL_URL no definida en .env');

  const mutation = `
    mutation CreateProduct($createProductInput: CreateProductInput!) {
      createProduct(createProductInput: $createProductInput) {
        id
        name
        price
        description
      }
    }
  `;

  const variables = {
    createProductInput: {
      name: input.name,
      description: input.description,
      price: input.price,
    },
  };

  const response = await firstValueFrom(
    this.http.post(url, {
      query: mutation,
      variables,
    })
  );

  return response.data;
}
}
