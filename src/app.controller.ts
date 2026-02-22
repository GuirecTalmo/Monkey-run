/**
 * Contrôleur racine. Expose GET /api (health check / racine de l'API).
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** GET /api — utilisé pour vérifier que le serveur répond */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
