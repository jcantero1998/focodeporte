import { ElementRef, Injectable } from '@angular/core';
import { BreadcrumbItem } from '../interfaces/breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', id: 'home' },
    { label: 'Servicios', id: 'services' },
    { label: 'Publicaciones', id: 'posts' },
    { label: 'Instagram', id: 'instagram' },
  ];

  private activeSection: string = 'home';

  private home: ElementRef | undefined;
  private services: ElementRef | undefined;
  private posts: ElementRef | undefined;
  private instagram: ElementRef | undefined;

  public getBreadcrumbItems() {
    return this.breadcrumbItems;
  }

  public setHomeRef(element: ElementRef) {
    this.home = element;
  }

  public setServicesRef(element: ElementRef) {
    this.services = element;
  }

  public setPostsRef(element: ElementRef) {
    this.posts = element;
  }

  public setInstagramRef(element: ElementRef) {
    this.instagram = element;
  }

  public setActiveSection(section: string) {
    this.activeSection = section;
  }

  public getActiveSection(): string {
    return this.activeSection;
  }

  scrollToHomeSection() {
    this.home!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  scrollToServicesSection() {
    this.services!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  scrollToPostsSection() {
    this.posts!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  scrollToinstagramSection() {
    this.instagram!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

}
