import { effect, Injectable, signal, Signal } from "@angular/core";
import { Theme } from "../models/theme.model";
import { HighlightLoader } from "ngx-highlightjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeService{
    public theme = signal<Theme>({mode: 'light', color: 'primary', direction: 'ltr'});

    constructor(private hljsLoader : HighlightLoader){
        this.loadTheme();
        effect(() => {
            this.setConfig();
        });
    }


    private loadTheme() {
        const theme = JSON.parse(localStorage.getItem('theme') || '{}');
        if (theme?.mode) {
          this.theme.set(theme);
          this.changeHighlightTheme(theme?.mode);
        }
      }
    
      private setConfig() {
        this.setLocalStorage();
        this.setThemeClass();
        this.setRTL();
      }
    
      public get isDark(): boolean {
        return this.theme().mode == 'dark';
      }
    
      private setThemeClass() {
        document.querySelector('html')!.className = this.theme().mode;
        document.querySelector('html')!.setAttribute('data-theme', this.theme().color);
        this.changeHighlightTheme(this.isDark ? 'dark' : 'light');

      }
    
      private setLocalStorage() {
        localStorage.setItem('theme', JSON.stringify(this.theme()));
      }
    
      private setRTL() {
        document.querySelector('html')!.setAttribute('dir', this.theme().direction);
        this.setLocalStorage();
      }

      private changeHighlightTheme(appTheme: 'dark' | 'light') {
        this.hljsLoader.setTheme(appTheme === 'dark' ? 'assets/styles/github-dark.css' : 'assets/styles/github.css');
      }
}