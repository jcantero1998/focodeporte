import { Component, DestroyRef, inject,  OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from '@core/models/post.interfaces';
import { PostsService } from '@shared/services/posts.service';
import { tap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { PostComponent } from "../../shared/components/post/post.component";
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [JsonPipe, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  title = inject(Title);
  posts = signal<Post[]>([]);

  private readonly postsService = inject(PostsService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
      this.getAllPosts();
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
