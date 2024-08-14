import { Component, inject,  OnInit, signal } from '@angular/core';
import { Post } from '@core/models/post.interfaces';
import { PostsService } from '@shared/services/posts.service';
import { firstValueFrom, tap } from 'rxjs';
import { PostComponent } from "../../shared/components/post/post.component";
import { Title } from '@angular/platform-browser';
import { SpinnerService } from '@core/services/spinner.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, MatButtonModule, MatIconModule, RouterModule],
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
      this._spinnerService.hide();
    }
  }

}
