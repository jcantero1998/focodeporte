import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbItem } from '@pages/home/interfaces/breadcrumb.interface';
import { BreadcrumbService } from '@pages/home/services/breadcrumb.service';

@Component({
  selector: 'home-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit{

  private breadcrumbService = inject(BreadcrumbService);
  public breadcrumbItems: BreadcrumbItem[] | undefined;

  ngOnInit(): void {
    this.breadcrumbItems = this.breadcrumbService.getBreadcrumbItems();
  }

  scrollToSection(elementRef: string) {
    switch (elementRef) {
      case 'services':
        this.breadcrumbService.scrollToServicesSection();
        break;
      case 'posts':
        this.breadcrumbService.scrollToPostsSection();
        break;
      case 'instagram':
        this.breadcrumbService.scrollToinstagramSection();
        break;
      default:
        this.breadcrumbService.scrollToHomeSection();
        break;
    }
  }

  checkActivated(elementRef: string){
    if (elementRef === this.breadcrumbService.getActiveSection()) {
      return true;
    }
    return false;
  }

}
