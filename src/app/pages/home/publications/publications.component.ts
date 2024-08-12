import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutService } from '@shared/services/layout.service';
import { PostComponent } from "../../../shared/components/post/post.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from '@core/models/post.interfaces';
import { PostsService } from '@shared/services/posts.service';
import { tap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home-publications',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, AsyncPipe, MatMenuModule, MatButtonModule, PostComponent, RouterModule],
  templateUrl: './publications.component.html',
  styleUrl: './publications.component.scss'
})
export class PublicationsComponent implements OnInit {

  private readonly postsService = inject(PostsService);
  private readonly _destroyRef = inject(DestroyRef);

  layoutService = inject(LayoutService);
  posts = signal<Post[]>([]);

  ngOnInit(): void {
    //TODO: Cambiar para que solo cargue los primeros Posts
    this.getPosts();
  }

  getPosts() {
    this.postsService.getAllPosts()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((posts:Post[]) => this.posts.set(posts))
      )
    .subscribe()
  }

}
