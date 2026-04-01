# Monkey Run — application mobile

Projet **React Native** (Tamagui, React Navigation). Les commandes de démarrage complètes (backend + Metro + Android / iOS) sont décrites dans le **[README à la racine du dépôt](../README.md)** — section **« Démarrage rapide (commandes) »**.

## Rappel rapide

| Étape        | Répertoire           | Commande                                              |
| ------------ | -------------------- | ----------------------------------------------------- |
| API NestJS   | `Monkey-run/`        | `npm run start:dev`                                   |
| Metro        | `Monkey-run/mobile/` | `npm start` ou `npx react-native start --reset-cache` |
| Lancer l’app | `Monkey-run/mobile/` | `npm run android` ou `npm run ios`                    |

Configurer l’URL de l’API dans `src/services/api.ts` (émulateur Android : `http://10.0.2.2:3000/api`).

---

Documentation générée par le template React Native d’origine : [Getting Started](https://reactnative.dev/docs/getting-started).
