import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutService } from '@shared/services/layout.service';
import { PostComponent } from "../../../shared/components/post/post.component";
import { Post } from '@core/models/post.interfaces';
import { PostsService } from '@shared/services/posts.service';
import { firstValueFrom, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { SpinnerService } from '@core/services/spinner.service';

@Component({
  selector: 'home-publications',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, AsyncPipe, MatMenuModule, MatButtonModule, PostComponent, RouterModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss'
})
export class PublicationsComponent implements OnInit {

  private readonly _postsService = inject(PostsService);
  private readonly _spinnerService = inject(SpinnerService)

  layoutService = inject(LayoutService);
  posts = signal<Post[]>([]);

  ngOnInit(): void {
    //TODO: Cambiar para que solo cargue los primeros Posts
    this.getPosts();
  }

  async getPosts() {
    try {
      this._spinnerService.show()
      await firstValueFrom(
        this._postsService.getAllPosts().pipe(
          tap((posts: Post[]) => this.posts.set(posts))
        )
      );
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    } finally {
      this._spinnerService.hide();
    }
  }

}
