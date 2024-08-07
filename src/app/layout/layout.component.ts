import { AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
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
import { NavigationService } from '@shared/services/navigation.service';

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
  @ViewChild('content', { read: ElementRef }) content: ElementRef | undefined;

  private navigationService = inject(NavigationService);
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

    ngAfterViewInit(): void {
      this.adjustContentHeight();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
      this.adjustContentHeight();
    }

    private adjustContentHeight() {
      const toolbarHeight = this.toolbar!.nativeElement.offsetHeight;
      const windowHeight = window.innerHeight;
      const contentHeight = windowHeight - toolbarHeight;

      this.content!.nativeElement.style.height = `${contentHeight}px`;
    }

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

    checkActivated(elementRef: string){
      if (elementRef === this.navigationService.getActiveSection()) {
        return true;
      }
      return false;
    }

}
