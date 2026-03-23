/**
 * Module Prisma — fournit l'accès à la base de données.
 * @Global() permet d'injecter PrismaService dans n'importe quel module sans l'importer explicitement.
 */
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

