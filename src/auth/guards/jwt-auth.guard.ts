/**
 * Guard qui protège les routes : exige un JWT valide dans Authorization: Bearer <token>.
 * Utilise la stratégie 'jwt' (JwtStrategy). À combiner avec @UseGuards(JwtAuthGuard).
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
