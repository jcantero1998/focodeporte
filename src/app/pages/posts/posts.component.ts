import { Component, inject,  OnInit, signal } from '@angular/core';
import { Post } from '@core/models/post.interfaces';
import { PostsService } from '@shared/services/posts.service';
import { firstValueFrom, tap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { PostComponent } from "../../shared/components/post/post.component";
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '@core/services/spinner.service';
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
  private readonly _spinnerService = inject(SpinnerService)

  ngOnInit(): void {
    this.getAllPosts();
  }

  async getAllPosts() {
    try {
      this._spinnerService.show()
      await firstValueFrom(
        this.postsService.getAllPosts().pipe(
          tap((posts: Post[]) => this.posts.set(posts))
        )
      );
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    } finally {
      console.log('Posts fetched successfully');
      this._spinnerService.hide();
    }
  }

}
