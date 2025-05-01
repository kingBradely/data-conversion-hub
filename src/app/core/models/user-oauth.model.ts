import { AuthProvider } from "../enums/auth-provider.enum";

export interface UserOauth {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    provider?: AuthProvider;
    photoUrl?: string;
    idToken?: string;
    name?: string;
    authProvider?: AuthProvider;
    profilePicture?: string;
    authToken?: string;
    response?: any;

}