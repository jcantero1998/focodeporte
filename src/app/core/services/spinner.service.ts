import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService  {
  isLoading = signal<boolean>(false);

  show(): void {
    console.log('show');
    this.isLoading.set(true);
  }

  hide(): void {
    console.log('hide');
    this.isLoading.set(false);
  }

}
