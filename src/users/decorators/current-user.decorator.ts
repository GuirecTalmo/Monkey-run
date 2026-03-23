/**
 * Décorateur paramètre pour récupérer l'utilisateur connecté (injecté par JwtStrategy sur request.user).
 * Usage: getProfile(@CurrentUser() user: CurrentUserPayload)
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type CurrentUserPayload = { id: string; email: string };

export const CurrentUser = createParamDecorator<unknown, CurrentUserPayload>(
  (_data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user,
);
