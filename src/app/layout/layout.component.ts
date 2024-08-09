import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { routes } from '../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from "../shared/components/footer/footer.component";
import { ToolbarComponent } from "../shared/components/toolbar/toolbar.component";
import { ThemeService } from '@shared/services/theme.service';
import { LayoutService } from '@shared/services/layout.service';

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
export class LayoutComponent implements AfterViewInit{

  @ViewChild('toolbar', { read: ElementRef }) toolbar: ElementRef | undefined;

  private themeService = inject(ThemeService);
  private layoutService = inject(LayoutService);

  rootRoutes = routes.filter(r=>r.path);

  ngAfterViewInit(): void {
    this.setlayoutHeight();
  }

  setlayoutHeight(): void {
    if (this.toolbar) this.layoutService.setToolbarHeight(
      this.toolbar.nativeElement.offsetHeight
    );
    this.layoutService.setWindowHeight(window.innerHeight);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setlayoutHeight();
  }

}
