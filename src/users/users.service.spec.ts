import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    profile: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  describe('getProfile', () => {
    it('should return user with profile', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        createdAt: new Date(),
        profile: {
          id: 'profile-1',
          pseudo: 'pseudo',
          firstName: 'John',
          lastName: 'Doe',
          avatarUrl: null,
        },
      });
      const result = await service.getProfile('user-1');
      expect(result).toHaveProperty('email', 'test@example.com');
      expect(result).toHaveProperty('profile');
      expect(result.profile.pseudo).toBe('pseudo');
    });

    it('should return null for unknown user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await service.getProfile('unknown');
      expect(result).toBeNull();
    });
  });

  describe('updateProfile', () => {
    it('should update profile and return profile', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue({ userId: 'user-1' });
      mockPrisma.profile.update.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        createdAt: new Date(),
        profile: {
          id: 'p1',
          pseudo: 'newPseudo',
          firstName: 'Jane',
          lastName: 'Doe',
          avatarUrl: null,
        },
      });
      const result = await service.updateProfile('user-1', {
        pseudo: 'newPseudo',
        firstName: 'Jane',
      });
      expect(mockPrisma.profile.update).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        data: { pseudo: 'newPseudo', firstName: 'Jane' },
      });
      expect(result).toHaveProperty('profile.pseudo', 'newPseudo');
    });
  });

  describe('changePassword', () => {
    it('should update password when current is valid', async () => {
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('new-hash');
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        passwordHash: 'old-hash',
      });
      mockPrisma.user.update.mockResolvedValue({});
      await service.changePassword('user-1', {
        currentPassword: 'old',
        newPassword: 'newpassword123',
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { passwordHash: 'new-hash' },
      });
    });

    it('should throw BadRequestException when current password is wrong', async () => {
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        passwordHash: 'old-hash',
      });
      await expect(
        service.changePassword('user-1', {
          currentPassword: 'wrong',
          newPassword: 'newpassword123',
        }),
      ).rejects.toThrow(BadRequestException);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });
});
