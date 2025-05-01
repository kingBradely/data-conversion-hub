import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { NotificationService } from "../../shared/services/notification.service";
import { User } from "../models/user.model";
import { AuthenticationResponse } from "../models/auth.dto";
import { Role } from "../enums/role.enum";
import { jwtDecode } from "jwt-decode";
import { FacebookLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { HttpService } from "./http.service";
import { UserOauth } from "../models/user-oauth.model";
import { AuthProvider } from "../enums/auth-provider.enum";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAuthenticated = signal<boolean>(false);
    token: string = ''


    constructor(private router: Router, private notificationService: NotificationService, private httpService: HttpService, private socialAuthService: SocialAuthService) {
    }

    login(data: User) {
        this.httpService.post<AuthenticationResponse, User>('auth/login', data).subscribe({
            next: (res: AuthenticationResponse) => {
                this.saveCredentials(res);
                const tokenExpiration = this.getTokenExpiration(res.access_token || '');
                this.setLogoutTimer(tokenExpiration);
                this.router.navigate(['/dashboard'], { replaceUrl: true });
                this.notificationService.success('welcome back ' + res.user.firstName);
                this.isAuthenticated.set(true)
            },
            error: (error: any) => {
                console.error(error);
                this.notificationService.error('ERROR WHILE login')
            }
        })
    }


    register(data: User) {
        this.httpService.post<AuthenticationResponse, User>('auth/register', data).subscribe({
            next: (res: AuthenticationResponse) => {
                this.saveCredentials(res);
                const tokenExpiration = this.getTokenExpiration(res.access_token || '');
                this.setLogoutTimer(tokenExpiration);
                this.router.navigate(['/auth/email-confirmation'], { replaceUrl: true });
                this.notificationService.success('welcome ' + res.user.firstName);
                this.isAuthenticated.set(true)
            },
            error: (error: any) => {
                console.error(error);
                this.notificationService.error('ERROR WHILE login')
            }
        })
    }

    signInWithProvider(user: UserOauth) {
        this.httpService.post<AuthenticationResponse, UserOauth>('auth/login-with-provider', user).subscribe({
            next: (res: AuthenticationResponse) => {
                this.saveCredentials(res);
                const tokenExpiration = this.getTokenExpiration(res.access_token || '');
                this.setLogoutTimer(tokenExpiration);
                this.router.navigate(['/dashboard'], { replaceUrl: true });
                this.notificationService.success('welcome ' + res.user.firstName);
                this.isAuthenticated.set(true)
            },
            error: (error: any) => {
                console.error(error);
                this.notificationService.error('ERROR WHILE login')
            }
        })
    }

    verifyVerificationCode(data: { userId: string, code: string }) {
        return this.httpService.post<{ userId: string,code:string }, {userId: string,code:string}>('auth/verify-code', data);
    }

    resendVerificationCode(userId: string) {
        return this.httpService.post<{ message: string }, { userId: string }>('auth/resend-code', { userId });
    }


    isLoggedIn(): boolean {
        return this.getUser() !== null && this.getAccessToken() !== null;
    }

    updateUser(data: User) {
        return this.httpService.put<{ user: User }, User>('edit-info/', data);
    }

    getOneObservable(id: any): Observable<User> {
        return this.httpService.getOne<User>('user', id);
    }

    private saveCredentials(authenticationResponse: AuthenticationResponse) {
        localStorage.setItem('user', JSON.stringify(authenticationResponse.user));
        localStorage.setItem('token', authenticationResponse.access_token ? authenticationResponse.access_token : '');
    }

    // updateUserCredentials(user: User) {
    //   localStorage.setItem('user', JSON.stringify(user));
    // }

    redirectToHomePage() {
        this.router.navigate(['/'], { replaceUrl: true });
        return false;
    }

    redirectToResetPasswordPage() {
        this.router.navigate(['/reset-password'], { replaceUrl: true });
        return false;
    }

    logout() {
        this.isAuthenticated.set(false)
        localStorage.clear();
        this.socialAuthService.signOut()
        this.router.navigate(['/auth'], { replaceUrl: true });
        return false;
    }

    getUser(): User | null {
        return JSON.parse(localStorage.getItem('user') || '{}') as User;
    }

    getAccessToken(): string | null {
        return localStorage.getItem('token')
    }

    // isAuthenticated(): boolean {
    //     return this.getUser() !== null && this.getAccessToken() !== null;
    // }



    isADMIN(): boolean {
        const user = this.getUser();
        if (user === undefined || user?.role === undefined) {
            return false;
        }
        return user?.role === Role.ADMIN
    }

    isUser(): boolean {
        const user = this.getUser();
        if (user === undefined || user?.role === undefined) {
            return false;
        }
        return user?.role === Role.USER
    }


    socialAuthInit() {
        this.socialAuthService.authState.subscribe({
            next: (user: any) => {
                if (user) {
                    user.authProvider = user.provider as AuthProvider
                    user.profilePicture = user?.photoUrl as string
                    const {idToken,id,provider,name,photoUrl,authToken,response, ...signedInUser} = user;
                    
                    this.signInWithProvider(signedInUser);
                }
            },
            error: (error: any) => {
                console.log(error);
                this.notificationService.error("something went wrong")
            }
        });
    }

    signInWithFB(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      }


    parseJwt(token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };



    private getTokenExpiration(token: string): number {
        const decodedToken: any = jwtDecode(token); // Decode JWT token
        if (decodedToken.exp === undefined) return 0;
        const expirationDate = new Date(0); // Unix epoch
        expirationDate.setUTCSeconds(decodedToken.exp);
        return expirationDate.getTime();
    }

    private setLogoutTimer(expirationTime: number): void {
        const expirationDuration = expirationTime - Date.now();
        setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    isTokenExpired() {
        if (this.getAccessToken()) {
            const decodedToken = jwtDecode(this.getAccessToken() || '');
            const dateNow = new Date();
            // exp is in seconds, convert it to milliseconds
            if ((decodedToken.exp || 0) < dateNow.getTime() / 1000) {
                this.logout();  // Call your logout function
            } else {
                this.isAuthenticated.set(true)
            }
        } else {
            this.logout()
        }

    }


}