/**
 * Service applicatif racine. Fournit la réponse de la route GET /api.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
