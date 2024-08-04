import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  private lightThemeClass = 'light-theme';
  private darkThemeClass = 'dark-theme';
  private prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  private listener: (event: MediaQueryListEvent) => void;

  constructor() {
    this.listener = this.applyTheme.bind(this);
    this.prefersDarkScheme.addEventListener('change', this.listener);
    this.applyTheme();
  }

  toggleTheme(): void {
    const isDarkMode = this.isDarkMode();
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    this.applyTheme();
  }

  isDarkMode(): boolean {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return this.prefersDarkScheme.matches;
  }

  private applyTheme(): void {
    const body = document.body;
    if (this.isDarkMode()) {
      body.classList.add(this.darkThemeClass);
      body.classList.remove(this.lightThemeClass);
    } else {
      body.classList.add(this.lightThemeClass);
      body.classList.remove(this.darkThemeClass);
    }
  }

  ngOnDestroy(): void {
    this.prefersDarkScheme.removeEventListener('change', this.listener);
  }
}
