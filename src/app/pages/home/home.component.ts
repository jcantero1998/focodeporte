import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { Title } from '@angular/platform-browser';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import { NavigationService } from '@shared/services/navigation.service';
import { SectionObserverDirective } from '@shared/directives/section-observer.directive';
// import { Slide } from '../../core/models/slide.interface';

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
    SectionObserverDirective
]
})
export class DashboardComponent implements AfterViewInit{
  // title = inject(Title);

  // slides: Slide[] = [
  //   {
  //     // url: 'images/slider/image4.avif',
  //     url: 'https://images.pexels.com/photos/25016477/pexels-photo-25016477/free-photo-of-carretera-hombre-deporte-prisa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     title: 'First slide',
  //     description: 'This is the first slide',
  //   },
  //   {
  //     url: 'https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     title: 'Second slide',
  //     description: 'This is the second slide',
  //   },
  //   {
  //     url: 'https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     title: 'Third slide',
  //     description: 'This is the third slide',
  //   },
  // ];

  private navigationService = inject(NavigationService);

  @ViewChild('home', { read: ElementRef }) home: ElementRef | undefined;
  @ViewChild('services', { read: ElementRef }) services: ElementRef | undefined;
  @ViewChild('aboutMe', { read: ElementRef }) aboutMe: ElementRef | undefined;
  @ViewChild('blog', { read: ElementRef }) blog: ElementRef | undefined;
  @ViewChild('contact', { read: ElementRef }) contact: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.home) this.navigationService.setHomeRef(this.home);
    if (this.services) this.navigationService.setServicesRef(this.services);
    if (this.aboutMe) this.navigationService.setAboutMeRef(this.aboutMe);
    if (this.blog) this.navigationService.setBlogRef(this.blog);
    if (this.contact) this.navigationService.setContactRef(this.contact);
  }

  scrollToServicesSection() {
    this.navigationService.scrollToServicesSection();
  }

  onSectionChange(section: any) {
    this.navigationService.setActiveSection(section);
  }
}
