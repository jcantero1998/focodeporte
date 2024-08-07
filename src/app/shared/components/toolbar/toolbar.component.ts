import { Component, inject, Input, output } from '@angular/core';
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

  public scrollToSection = output<string>();

  onScrollToSection(elementRef: string) {
    this.scrollToSection.emit(elementRef);
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
