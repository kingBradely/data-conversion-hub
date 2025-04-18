import { Component, effect } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ThemeService } from '../../../../core/services/theme.service';


@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  logoLight = 'assets/icons/logo-light.png';
  logoDark = 'assets/icons/logo-dark.png';
  logo: string =""
  constructor(public menuService: MenuService, public themeService : ThemeService) {
    effect(() => {
      this.logo = this.themeService.isDark ? this.logoDark : this.logoLight;
    })
  }

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
