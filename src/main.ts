/**
 * Point d'entrée de l'application NestJS.
 * Configure le préfixe global /api, la validation des DTOs, CORS et démarre le serveur HTTP.
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Toutes les routes sont préfixées par /api (ex: /api/auth/login, /api/users/me)
  app.setGlobalPrefix('api');

  // Validation automatique des body/query avec class-validator
  // whitelist: supprime les propriétés non décorées | forbidNonWhitelisted: 400 si propriétés inconnues | transform: conversion des types (string -> number, etc.)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS: autorise les requêtes depuis le mobile (émulateur, appareil) et localhost
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
