/**
 * Service runs : création d'une course et liste paginée des courses de l'utilisateur.
 * Toutes les opérations sont filtrées par userId (JWT).
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { QueryRunsDto } from './dto/query-runs.dto';

@Injectable()
export class RunsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Crée une run pour l'utilisateur connecté ; patternJson stocké tel quel (structure libre). */
  async create(userId: string, dto: CreateRunDto) {
    return this.prisma.run.create({
      data: {
        userId,
        date: dto.date,
        durationSeconds: dto.durationSeconds,
        patternJson: dto.patternJson as object,
      },
    });
  }

  /** Liste paginée des runs de l'utilisateur, tri par date (asc/desc). Retourne { items, total }. */
  async findAll(userId: string, query: QueryRunsDto) {
    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;
    const order = query.order ?? 'desc';

    const [items, total] = await Promise.all([
      this.prisma.run.findMany({
        where: { userId },
        orderBy: { date: order },
        take: limit,
        skip: offset,
      }),
      this.prisma.run.count({ where: { userId } }),
    ]);

    return { items, total };
  }
}
