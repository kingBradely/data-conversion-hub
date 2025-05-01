import { AuthProvider } from "../enums/auth-provider.enum";
import { Role } from "../enums/role.enum";
import { Notification } from "./notifications.model";




export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role?: Role;
    authProvider?: AuthProvider;
    authProviderId?: string;
    profilePicture?: string;
    isVerified?: boolean;
    isMfaEnabled?: boolean;
    mfaSecret?: string;
    preferences?: any;
    lastLoginAt?: Date;
    notifications?: Notification[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    idToken?: string;

}