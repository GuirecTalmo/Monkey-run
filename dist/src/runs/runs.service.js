"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RunsService = class RunsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.run.create({
            data: {
                userId,
                date: dto.date,
                durationSeconds: dto.durationSeconds,
                patternJson: dto.patternJson,
            },
        });
    }
    async findAll(userId, query) {
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
};
exports.RunsService = RunsService;
exports.RunsService = RunsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RunsService);
//# sourceMappingURL=runs.service.js.map