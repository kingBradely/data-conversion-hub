import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PageHeadlineComponent } from './shared/components/page-headline/page-headline.component';
import { SharedModule } from './shared/shared.module';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NotificationComponent,
    AngularSvgIconModule.forRoot()
  ],
  
  providers: [
    provideHttpClient(),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
        themePath: 'assets/styles/solarized-light.css',
        lineNumbers: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
