import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private toolbarHeigt = signal<number>(0);
  private windowHeight = signal<number>(0);
  private contentHeight = computed(() => this.windowHeight() - this.toolbarHeigt());
  private breakpointObserver = inject(BreakpointObserver);

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

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
