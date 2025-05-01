import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PageHeadlineComponent } from './shared/components/page-headline/page-headline.component';
import { SharedModule } from './shared/shared.module';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { googleClientId, metaAppId, metaClientId } from './core/constants/menu';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LandingComponent } from './pages/landing/landing.component';
import { OutputSnippetComponent } from './shared/components/output-snippet/output-snippet.component';
import { TermOfUseComponent } from './pages/term-of-use/term-of-use.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TermOfUseComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NotificationComponent,
    OutputSnippetComponent,
    GoogleSigninButtonModule,
    AngularSvgIconModule.forRoot()
  ],

  providers: [
    provideHttpClient(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, // optional, default is false
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleClientId), // Replace with your Google Client ID
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(metaAppId), // Replace with your Facebook App ID
          }
        ],
        onError: (err: any) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        themePath: 'assets/styles/solarized-light.css',
        lineNumbers: true
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    SocialAuthService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
