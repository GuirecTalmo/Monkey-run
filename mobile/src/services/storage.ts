import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Clés de stockage utilisées dans l'application
 */
const STORAGE_KEYS = {
  JWT_TOKEN: 'jwt_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
} as const;

/**
 * Service de stockage sécurisé pour gérer les tokens JWT et autres données sensibles
 */
class SecureStorageService {
  /**
   * Sauvegarde le token JWT de manière sécurisée
   * @param token - Le token JWT à sauvegarder
   * @returns Promise<boolean> - True si la sauvegarde réussit
   */
  async saveJwtToken(token: string): Promise<boolean> {
    try {
      await EncryptedStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du token JWT:', error);
      return false;
    }
  }

  /**
   * Récupère le token JWT stocké
   * @returns Promise<string | null> - Le token JWT ou null s'il n'existe pas
   */
  async getJwtToken(): Promise<string | null> {
    try {
      const token = await EncryptedStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
      return token;
    } catch (error) {
      console.error('Erreur lors de la récupération du token JWT:', error);
      return null;
    }
  }

  /**
   * Supprime le token JWT stocké
   * @returns Promise<boolean> - True si la suppression réussit
   */
  async removeJwtToken(): Promise<boolean> {
    try {
      await EncryptedStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du token JWT:', error);
      return false;
    }
  }

  /**
   * Sauvegarde le refresh token de manière sécurisée
   * @param refreshToken - Le refresh token à sauvegarder
   * @returns Promise<boolean> - True si la sauvegarde réussit
   */
  async saveRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      await EncryptedStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du refresh token:', error);
      return false;
    }
  }

  /**
   * Récupère le refresh token stocké
   * @returns Promise<string | null> - Le refresh token ou null s'il n'existe pas
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      const refreshToken = await EncryptedStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      return refreshToken;
    } catch (error) {
      console.error('Erreur lors de la récupération du refresh token:', error);
      return null;
    }
  }

  /**
   * Supprime le refresh token stocké
   * @returns Promise<boolean> - True si la suppression réussit
   */
  async removeRefreshToken(): Promise<boolean> {
    try {
      await EncryptedStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du refresh token:', error);
      return false;
    }
  }

  /**
   * Sauvegarde les données utilisateur de manière sécurisée
   * @param userData - Les données utilisateur à sauvegarder (doivent être sérialisables)
   * @returns Promise<boolean> - True si la sauvegarde réussit
   */
  async saveUserData(userData: object): Promise<boolean> {
    try {
      const serializedData = JSON.stringify(userData);
      await EncryptedStorage.setItem(STORAGE_KEYS.USER_DATA, serializedData);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données utilisateur:', error);
      return false;
    }
  }

  /**
   * Récupère les données utilisateur stockées
   * @returns Promise<object | null> - Les données utilisateur ou null s'il n'existe pas
   */
  async getUserData(): Promise<object | null> {
    try {
      const data = await EncryptedStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  }

  /**
   * Supprime les données utilisateur stockées
   * @returns Promise<boolean> - True si la suppression réussit
   */
  async removeUserData(): Promise<boolean> {
    try {
      await EncryptedStorage.removeItem(STORAGE_KEYS.USER_DATA);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression des données utilisateur:', error);
      return false;
    }
  }

  /**
   * Supprime toutes les données stockées (déconnexion complète)
   * @returns Promise<boolean> - True si la suppression réussit
   */
  async clearAll(): Promise<boolean> {
    try {
      await EncryptedStorage.clear();
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de toutes les données:', error);
      return false;
    }
  }

  /**
   * Supprime uniquement les tokens (JWT et refresh token)
   * Utile pour la déconnexion
   * @returns Promise<boolean> - True si la suppression réussit
   */
  async clearTokens(): Promise<boolean> {
    try {
      await Promise.all([
        this.removeJwtToken(),
        this.removeRefreshToken(),
      ]);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression des tokens:', error);
      return false;
    }
  }
}

// Export d'une instance unique du service (singleton)
export default new SecureStorageService();

// Export du type pour TypeScript si besoin
export type { SecureStorageService };

