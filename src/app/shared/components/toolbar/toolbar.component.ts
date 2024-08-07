import { Component, inject, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Route, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '@shared/services/theme.service';
import { NavigationService } from '@shared/services/navigation.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input({ required: true }) drawer!: MatDrawer;
  @Input({ required: true }) rootRoutes!: Route[];
  @Input({ required: true }) isHandset$!: Observable<boolean>;

  private themeService = inject(ThemeService);
  private navigationService = inject(NavigationService);

  scrollToSection(elementRef: string) {
    switch (elementRef) {
      case 'services':
        this.navigationService.scrollToServicesSection();
        break;
      case 'aboutMe':
        this.navigationService.scrollToAboutMeSection();
        break;
      case 'contact':
        this.navigationService.scrollToContactSection();
        break;
      case 'blog':
        this.navigationService.scrollToBlogSection();
        break;
      default:
        this.navigationService.scrollToHomeSection();
        break;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  checkActivated(elementRef: string){
    if (elementRef === this.navigationService.getActiveSection()) {
      return true;
    }
    return false;
  }

}
