import { Component, effect, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  logoLight = 'assets/icons/logo-light.png';
  logoDark = 'assets/icons/logo-dark.png';
  logo: string =""
  constructor(private menuService: MenuService, public themeService : ThemeService) {
    effect(() => {
      this.logo = this.themeService.isDark ? this.logoDark : this.logoLight;
    })
  }

  ngOnInit(): void {
    
    
  }

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
