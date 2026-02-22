/**
 * Module runs : CRUD des courses (GET /api/runs avec pagination, POST /api/runs).
 * Routes protégées par JWT ; utilisateur courant via CurrentUser.
 */
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RunsController } from './runs.controller';
import { RunsService } from './runs.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RunsController],
  providers: [RunsService],
  exports: [RunsService],
})
export class RunsModule {}
