/**
 * Service d'authentification : inscription, connexion, mot de passe oublié (stub).
 * Mots de passe hashés avec bcrypt ; JWT émis pour signup/login.
 */
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /** Inscription : vérifie unicité email, hash du mot de passe, création User + Profile, retour JWT + user */
  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new ConflictException('Un compte existe déjà avec cet email.');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
      },
    });
    await this.prisma.profile.create({
      data: { userId: user.id },
    });
    return this.buildAuthResponse(user);
  }

  /** Connexion : recherche user par email, vérification bcrypt, retour JWT + user */
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }
    return this.buildAuthResponse(user);
  }

  /** Mot de passe oublié : stub (404 si email inconnu, message générique sinon ; pas d'envoi d'email) */
  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      throw new NotFoundException('Aucun compte associé à cet email.');
    }
    return {
      message:
        'Si un compte existe pour cet email, un lien de réinitialisation vous a été envoyé.',
    };
  }

  /** Construit la réponse { accessToken, user } à partir du user (payload JWT : sub, email) */
  private buildAuthResponse(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      user: { id: user.id, email: user.email },
    };
  }
}
