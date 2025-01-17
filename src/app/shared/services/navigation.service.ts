import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private home: ElementRef | undefined;
  private services: ElementRef | undefined;
  private aboutMe: ElementRef | undefined;
  private contact: ElementRef | undefined;
  private blog: ElementRef | undefined;
  private activeSection: string = 'home';

  public setHomeRef(element: ElementRef) {
    this.home = element;
  }

  public setServicesRef(element: ElementRef) {
    this.services = element;
  }

  public setAboutMeRef(element: ElementRef) {
    this.aboutMe = element;
  }

  public setContactRef(element: ElementRef) {
    this.contact = element;
  }

  public setBlogRef(element: ElementRef) {
    this.blog = element;
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

  scrollToAboutMeSection() {
    this.aboutMe!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  scrollToContactSection() {
    this.contact!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  scrollToBlogSection() {
    this.blog!.nativeElement.scrollIntoView({ behavior: "smooth", block: "end" });
  }

}
