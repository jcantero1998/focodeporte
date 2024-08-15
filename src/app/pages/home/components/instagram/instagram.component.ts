import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SpinnerService } from '@core/services/spinner.service';
import { InstagramService } from '@shared/services/instagram.service';
import { Posts } from '@core/models/instagram.interface';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PostComponent } from "../../../../shared/components/instagram-post/instagram-post.component";

@Component({
  selector: 'home-instagram',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, AsyncPipe, MatMenuModule, MatButtonModule, PostComponent, RouterModule],
  templateUrl: './instagram.component.html',
  styleUrl: './instagram.component.scss'
})
export class InstagramComponent implements OnInit {
  private readonly _instagramService = inject(InstagramService);
  private readonly _spinnerService = inject(SpinnerService)

  posts: WritableSignal<Posts | undefined> = signal<Posts | undefined>(undefined);

  ngOnInit(): void {
    this.getPosts();
  }

  async getPosts() {
    try {
      this._spinnerService.show();
      const fetchedPosts = await firstValueFrom(this._instagramService.getInstagramPosts());
      this.posts.set(fetchedPosts);
      console.log('Posts obtenidos:', fetchedPosts);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    } finally {
      this._spinnerService.hide();
    }
  }

}
