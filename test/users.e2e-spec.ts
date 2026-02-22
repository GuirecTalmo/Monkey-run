import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Users (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  let accessToken: string;

  const testUser = {
    email: `users-e2e-${Date.now()}@test.com`,
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

  describe('GET /api/users/me', () => {
    it('should return profile when authenticated', () => {
      return request(app.getHttpServer())
        .get('/api/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe(testUser.email);
          expect(res.body).toHaveProperty('profile');
          expect(res.body.profile).toHaveProperty('pseudo');
          expect(res.body.profile).toHaveProperty('firstName');
          expect(res.body.profile).toHaveProperty('lastName');
          expect(res.body.profile).toHaveProperty('avatarUrl');
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer()).get('/api/users/me').expect(401);
    });
  });

  describe('PATCH /api/users/me', () => {
    it('should update profile', () => {
      return request(app.getHttpServer())
        .patch('/api/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          pseudo: 'runner42',
          firstName: 'Jean',
          lastName: 'Dupont',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.profile.pseudo).toBe('runner42');
          expect(res.body.profile.firstName).toBe('Jean');
          expect(res.body.profile.lastName).toBe('Dupont');
        });
    });
  });

  describe('PATCH /api/users/me/password', () => {
    it('should change password', () => {
      return request(app.getHttpServer())
        .patch('/api/users/me/password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword456',
        })
        .expect(200);
    });

    it('should reject wrong current password', () => {
      return request(app.getHttpServer())
        .patch('/api/users/me/password')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          currentPassword: 'wrong',
          newPassword: 'newpassword456',
        })
        .expect(400);
    });
  });
});
