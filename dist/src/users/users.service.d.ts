import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        profile: {
            id: string;
            pseudo: string | null;
            avatarUrl: string | null;
            firstName: string | null;
            lastName: string | null;
        } | {
            id: null;
            pseudo: null;
            firstName: null;
            lastName: null;
            avatarUrl: null;
        };
        id: string;
        email: string;
        createdAt: Date;
    } | null>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        profile: {
            id: string;
            pseudo: string | null;
            avatarUrl: string | null;
            firstName: string | null;
            lastName: string | null;
        } | {
            id: null;
            pseudo: null;
            firstName: null;
            lastName: null;
            avatarUrl: null;
        };
        id: string;
        email: string;
        createdAt: Date;
    } | null>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<void>;
}
