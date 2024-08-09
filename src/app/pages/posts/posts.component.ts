import { Component, DestroyRef, inject, Input, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from '@core/models/post.interfaces';
import { PostsService } from '@shared/services/posts.service';
import { tap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { PostComponent } from "../../shared/components/post/post.component";
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [JsonPipe, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  @Input() viewAll: boolean = false;

  posts = signal<Post[]>([]);

  private readonly postsService = inject(PostsService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (this.viewAll) {
      this.getAllPosts();
    } else {
      //TODO: Cambiar para que solo cargue los primeros Posts
      this.getAllPosts();
    }
  }

  getAllPosts() {
    this.postsService.getAllPosts()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((posts:Post[]) => this.posts.set(posts))
      )
    .subscribe()
  }

}
