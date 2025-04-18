import { Component, effect, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
  selector: 'app-navbar-mobile',
  standalone: false,
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css'
})
export class NavbarMobileComponent implements OnInit {
  logoLight = 'assets/icons/logo-light.png';
  logoDark = 'assets/icons/logo-dark.png';
  logo: string =""
  constructor(public menuService: MenuService, public themeService : ThemeService) {
    effect(() => {
      this.logo = this.themeService.isDark ? this.logoDark : this.logoLight;
    })
  }
  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
