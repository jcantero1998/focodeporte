import { computed, Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private toolbarHeigt = signal<number>(0);
  private windowHeight = signal<number>(0);
  private contentHeight = computed(() => this.windowHeight() - this.toolbarHeigt());

  setToolbarHeight(height: number) {
    this.toolbarHeigt.set(height);
  }

  getToolbarHeight() {
    return this.toolbarHeigt;
  }

  setWindowHeight(height: number) {
    this.windowHeight.set(height);
  }

  getWindowHeight() {
    return this.windowHeight;
  }

  getContentHeight() {
    return this.contentHeight;
  }

}
