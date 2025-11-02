import axios, { AxiosInstance } from 'axios';
import storageService from './storage';

// Configuration de base pour le client axios
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

// Création de l'instance axios avec configuration de base
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes - ajoute automatiquement le token JWT
apiClient.interceptors.request.use(
  async (config) => {
    // Ajout automatique du token JWT depuis le stockage sécurisé
    const token = await storageService.getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses (optionnel - pour gérer les erreurs globalement)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion globale des erreurs
    if (error.response) {
      // Erreur avec réponse du serveur
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Requête faite mais pas de réponse
      console.error('Network Error:', error.request);
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

