import type { CurrentUserPayload } from './decorators/current-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: CurrentUserPayload): Promise<{
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
    updateProfile(user: CurrentUserPayload, dto: UpdateProfileDto): Promise<{
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
    changePassword(user: CurrentUserPayload, dto: ChangePasswordDto): Promise<void>;
}
