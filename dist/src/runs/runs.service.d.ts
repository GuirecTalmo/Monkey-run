import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { QueryRunsDto } from './dto/query-runs.dto';
export declare class RunsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateRunDto): Promise<{
        id: string;
        date: Date;
        durationSeconds: number;
        patternJson: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
        userId: string;
    }>;
    findAll(userId: string, query: QueryRunsDto): Promise<{
        items: {
            id: string;
            date: Date;
            durationSeconds: number;
            patternJson: import("@prisma/client/runtime/library").JsonValue;
            createdAt: Date;
            userId: string;
        }[];
        total: number;
    }>;
}
