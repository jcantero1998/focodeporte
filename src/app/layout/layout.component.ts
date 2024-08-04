import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar.component";
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
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
    FooterComponent,
    ToolbarComponent
]
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private themeService = inject(ThemeService);
  rootRoutes = routes.filter(r=>r.path);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    toggleTheme(): void {
      this.themeService.toggleTheme();
    }

    isDarkMode(): boolean {
      return this.themeService.isDarkMode();
    }
}
