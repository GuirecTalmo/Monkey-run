/**
 * Service utilisateur : lecture/mise à jour du profil et changement de mot de passe.
 * Toutes les méthodes sont scoped à l'utilisateur identifié par userId (issu du JWT).
 */
import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Retourne user + profile (ou null si userId inconnu). Profile peut être null si non créé. */
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        profile: {
          select: {
            id: true,
            pseudo: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
    });
    if (!user) return null;
    const { profile, ...rest } = user;
    return {
      ...rest,
      profile: profile ?? {
        id: null,
        pseudo: null,
        firstName: null,
        lastName: null,
        avatarUrl: null,
      },
    };
  }

  /** Met à jour uniquement les champs fournis dans dto (partial update), puis retourne le profil à jour */
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const data: {
      pseudo?: string;
      firstName?: string;
      lastName?: string;
      avatarUrl?: string;
    } = {};
    if (dto.pseudo !== undefined) data.pseudo = dto.pseudo;
    if (dto.firstName !== undefined) data.firstName = dto.firstName;
    if (dto.lastName !== undefined) data.lastName = dto.lastName;
    if (dto.avatarUrl !== undefined) data.avatarUrl = dto.avatarUrl;
    if (Object.keys(data).length === 0) {
      return this.getProfile(userId);
    }

    try {
      const updated = await this.prisma.profile.update({
        where: { userId },
        data,
        select: {
          id: true,
          pseudo: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      });
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      if (!user) return null;
      return {
        ...user,
        profile: updated,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        return this.getProfile(userId);
      }
      throw e;
    }
  }

  /** Vérifie le mot de passe actuel (bcrypt), puis remplace par le hash du nouveau mot de passe */
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return;
    const isMatch = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!isMatch) {
      throw new BadRequestException('Mot de passe actuel incorrect.');
    }
    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });
  }
}
