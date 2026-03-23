/**
 * Contrôleur runs : GET /api/runs (liste paginée) et POST /api/runs (création).
 * Toutes les routes sont protégées par JWT.
 */
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { CurrentUserPayload } from '../users/decorators/current-user.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateRunDto } from './dto/create-run.dto';
import { QueryRunsDto } from './dto/query-runs.dto';
import { RunsService } from './runs.service';

@Controller('runs')
@UseGuards(JwtAuthGuard)
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  findAll(@CurrentUser() user: CurrentUserPayload, @Query() query: QueryRunsDto) {
    return this.runsService.findAll(user.id, query);
  }

  @Post()
  create(@CurrentUser() user: CurrentUserPayload, @Body() dto: CreateRunDto) {
    return this.runsService.create(user.id, dto);
  }
}
