import { Component, ElementRef, HostListener, inject, WritableSignal, ViewChild, effect, AfterViewInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import { Slide } from '../../core/models/slide.interface';
import { LayoutService } from '@shared/services/layout.service';
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { BreadcrumbService } from './services/breadcrumb.service';
import { SectionObserverDirective } from '@shared/directives/section-observer.directive';

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
    SectionObserverDirective
]
})
export class DashboardComponent implements AfterViewInit{

  private layoutService = inject(LayoutService);
  private breadcrumbService = inject(BreadcrumbService);

  @ViewChild('home', { read: ElementRef }) home: ElementRef | undefined;
  @ViewChild('services', { read: ElementRef }) services: ElementRef | undefined;
  @ViewChild('aboutMe', { read: ElementRef }) aboutMe: ElementRef | undefined;
  @ViewChild('blog', { read: ElementRef }) blog: ElementRef | undefined;
  @ViewChild('contact', { read: ElementRef }) contact: ElementRef | undefined;

  constructor() {
    effect(() => {
      const contentHeight = this.layoutService.getContentHeight()();
      this.adjustContentHeight(contentHeight);
    });
  }

  ngAfterViewInit(): void {
    if (this.home) this.breadcrumbService.setHomeRef(this.home);
    if (this.services) this.breadcrumbService.setServicesRef(this.services);
    if (this.aboutMe) this.breadcrumbService.setAboutMeRef(this.aboutMe);
    if (this.blog) this.breadcrumbService.setBlogRef(this.blog);
    if (this.contact) this.breadcrumbService.setContactRef(this.contact);
  }

  private adjustContentHeight(contentHeight: number) {
    if (this.home) this.home.nativeElement.style.height = `${contentHeight}px`;
    if (this.services) this.services.nativeElement.style.height = `${contentHeight}px`;
    if (this.aboutMe) this.aboutMe.nativeElement.style.height = `${contentHeight}px`;
    if (this.blog) this.blog.nativeElement.style.height = `${contentHeight}px`;
    if (this.contact) this.contact.nativeElement.style.height = `${contentHeight}px`;
  }

  scrollToServicesSection() {
    this.services!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  onSectionChange(section: any) {
    this.breadcrumbService.setActiveSection(section);
  }

}
