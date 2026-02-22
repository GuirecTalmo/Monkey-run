import type { CurrentUserPayload } from '../users/decorators/current-user.decorator';
import { CreateRunDto } from './dto/create-run.dto';
import { QueryRunsDto } from './dto/query-runs.dto';
import { RunsService } from './runs.service';
export declare class RunsController {
    private readonly runsService;
    constructor(runsService: RunsService);
    findAll(user: CurrentUserPayload, query: QueryRunsDto): Promise<{
        items: {
            id: string;
            userId: string;
            date: Date;
            durationSeconds: number;
            patternJson: import("@prisma/client/runtime/library").JsonValue;
            createdAt: Date;
        }[];
        total: number;
    }>;
    create(user: CurrentUserPayload, dto: CreateRunDto): Promise<{
        id: string;
        userId: string;
        date: Date;
        durationSeconds: number;
        patternJson: import("@prisma/client/runtime/library").JsonValue;
        createdAt: Date;
    }>;
}
