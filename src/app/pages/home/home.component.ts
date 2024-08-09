import { Component, ElementRef, inject, ViewChild, effect, AfterViewInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import { LayoutService } from '@shared/services/layout.service';
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { BreadcrumbService } from './services/breadcrumb.service';
import { SectionObserverDirective } from '@shared/directives/section-observer.directive';
import { ServicesComponent } from "./components/services/services.component";
import { InstagramComponent } from "./components/instagram/instagram.component";
import { PostsComponent } from "../posts/posts.component";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImageSliderComponent,
    BreadcrumbComponent,
    SectionObserverDirective,
    ServicesComponent,
    PostsComponent,
    InstagramComponent,
    MatToolbarModule
]
})
export class DashboardComponent implements AfterViewInit{

  private layoutService = inject(LayoutService);
  private breadcrumbService = inject(BreadcrumbService);

  @ViewChild('home', { read: ElementRef }) home: ElementRef | undefined;
  @ViewChild('services', { read: ElementRef }) services: ElementRef | undefined;
  @ViewChild('posts', { read: ElementRef }) posts: ElementRef | undefined;
  @ViewChild('instagram', { read: ElementRef }) instagram: ElementRef | undefined;

  constructor() {
    effect(() => {
      const contentHeight = this.layoutService.getContentHeight()();
      this.adjustContentHeight(contentHeight);
    });
  }

  ngAfterViewInit(): void {
    if (this.home) this.breadcrumbService.setHomeRef(this.home);
    if (this.services) this.breadcrumbService.setServicesRef(this.services);
    if (this.posts) this.breadcrumbService.setPostsRef(this.posts);
    if (this.instagram) this.breadcrumbService.setInstagramRef(this.instagram);
  }

  private adjustContentHeight(contentHeight: number) {
    if (this.home) this.home.nativeElement.style.height = `${contentHeight}px`;
  }

  scrollToServicesSection() {
    this.services!.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onSectionChange(section: any) {
    this.breadcrumbService.setActiveSection(section);
  }

}
