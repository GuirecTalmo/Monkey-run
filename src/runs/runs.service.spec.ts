import { Test, TestingModule } from '@nestjs/testing';
import { RunsService } from './runs.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RunsService', () => {
  let service: RunsService;
  const mockPrisma = {
    run: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RunsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<RunsService>(RunsService);
  });

  describe('create', () => {
    it('should create a run', async () => {
      const dto = {
        date: new Date('2024-01-15T10:00:00Z'),
        durationSeconds: 1800,
        patternJson: { intervals: [] },
      };
      mockPrisma.run.create.mockResolvedValue({
        id: 'run-1',
        userId: 'user-1',
        ...dto,
        createdAt: new Date(),
      });
      const result = await service.create('user-1', dto);
      expect(result).toHaveProperty('id', 'run-1');
      expect(mockPrisma.run.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          date: dto.date,
          durationSeconds: dto.durationSeconds,
          patternJson: dto.patternJson,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated runs ordered by date desc', async () => {
      mockPrisma.run.findMany.mockResolvedValue([
        { id: 'run-1', date: new Date(), durationSeconds: 1200 },
      ]);
      mockPrisma.run.count.mockResolvedValue(1);
      const result = await service.findAll('user-1', {
        limit: 10,
        offset: 0,
        order: 'desc',
      });
      expect(result).toEqual({ items: expect.any(Array), total: 1 });
      expect(mockPrisma.run.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        orderBy: { date: 'desc' },
        take: 10,
        skip: 0,
      });
    });

    it('should use default limit and offset', async () => {
      mockPrisma.run.findMany.mockResolvedValue([]);
      mockPrisma.run.count.mockResolvedValue(0);
      await service.findAll('user-1', {});
      expect(mockPrisma.run.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 20, skip: 0 }),
      );
    });
  });
});
