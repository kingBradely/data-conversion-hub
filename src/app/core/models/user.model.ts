import { Role } from "../enums/role.enum";

export enum AuthProvider {
    LOCAL = 'LOCAL',
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK',
}

export interface Notification {
    // Define the Notification structure based on your requirements
    id: string;
    message: string;
    createdAt: Date;
}


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

}