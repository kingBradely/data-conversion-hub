import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task Manager';
  constructor(public themeService: ThemeService, private authService: AuthService) {
    this.authService.socialAuthInit()
    this.authService.isAuthenticated.set(this.authService.isLoggedIn())
  }
}
