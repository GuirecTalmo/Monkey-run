import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Runs (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let accessToken: string;

  const testUser = {
    email: `runs-e2e-${Date.now()}@test.com`,
    password: 'password123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await request(app.getHttpServer())
      .post('/api/auth/signup')
      .send(testUser)
      .expect(201)
      .then((res) => {
        accessToken = res.body.accessToken;
      });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await app.close();
  });

  describe('GET /api/runs', () => {
    it('should return empty list when no runs', () => {
      return request(app.getHttpServer())
        .get('/api/runs')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({ items: [], total: 0 });
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer()).get('/api/runs').expect(401);
    });

    it('should accept limit and offset', () => {
      return request(app.getHttpServer())
        .get('/api/runs?limit=5&offset=0')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('items');
          expect(res.body).toHaveProperty('total');
        });
    });
  });

  describe('POST /api/runs', () => {
    it('should create a run', () => {
      return request(app.getHttpServer())
        .post('/api/runs')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          date: '2024-01-15T10:00:00.000Z',
          durationSeconds: 1800,
          patternJson: { warmup: 300, intervals: [{ run: 400, rest: 200 }] },
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.durationSeconds).toBe(1800);
          expect(res.body.patternJson).toEqual({
            warmup: 300,
            intervals: [{ run: 400, rest: 200 }],
          });
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer())
        .post('/api/runs')
        .send({
          date: '2024-01-15T10:00:00.000Z',
          durationSeconds: 1800,
          patternJson: {},
        })
        .expect(401);
    });

    it('should validate payload', () => {
      return request(app.getHttpServer())
        .post('/api/runs')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          date: 'invalid',
          durationSeconds: -1,
        })
        .expect(400);
    });
  });
});
