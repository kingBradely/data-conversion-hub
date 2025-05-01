import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SidebarSubmenuComponent } from './components/sidebar/sidebar-submenu/sidebar-submenu.component';
import { NavbarMenuComponent } from './components/navbar/navbar-menu/navbar-menu.component';
import { ProfileMenuComponent } from './components/navbar/profile-menu/profile-menu.component';
import { NavbarMobileComponent } from './components/navbar/navbar-mobile/navbar-mobile.component';
import { NavbarSubmenuComponent } from './components/navbar/navbar-submenu/navbar-submenu.component';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarMobileMenuComponent } from './components/navbar/navbar-mobile/navbar-mobile-menu/navbar-mobile-menu.component';
import { NavbarMobileSubmenuComponent } from './components/navbar/navbar-mobile/navbar-mobile-submenu/navbar-mobile-submenu.component';


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    SidebarMenuComponent,
    SidebarSubmenuComponent,
    NavbarMenuComponent,
    ProfileMenuComponent,
    NavbarMobileComponent,
    NavbarSubmenuComponent,
    NavbarMobileMenuComponent,
    NavbarMobileSubmenuComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularSvgIconModule.forRoot(),
    NgTemplateOutlet,
    ClickOutsideDirective,
    NgOptimizedImage 
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
 
})
export class LayoutModule { }
