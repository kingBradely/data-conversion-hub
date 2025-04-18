import { Component, effect } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  logoLight = 'assets/icons/logo-light.png';
  logoDark = 'assets/icons/logo-dark.png';
  logo: string =""

  constructor( public themeService : ThemeService) {
    effect(() => {
      this.logo = this.themeService.isDark ? this.logoDark : this.logoLight;
    })
  }
}
