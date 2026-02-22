/**
 * Module utilisateur : profil (GET/PATCH /api/users/me) et changement de mot de passe.
 * Dépend de AuthModule pour JwtAuthGuard (routes protégées).
 */
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
