import { Component, inject, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@core/models/post.interfaces';
import { SpinnerService } from '@core/services/spinner.service';
import { PostsService } from '@shared/services/posts.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {

  title = inject(Title);
  posts = signal<Post | null>(null);

  private readonly postsService = inject(PostsService);
  private readonly _spinnerService = inject(SpinnerService);
  private readonly _route = inject(ActivatedRoute)

  ngOnInit(): void {
    const postId = this._route.snapshot.paramMap.get('id');
    if (postId) this.getPostById(postId);
  }

  async getPostById(id: string) {
    try {
      this._spinnerService.show()
      const post = await this.postsService.getPostById(id);
      this.posts.set(post);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    } finally {
      console.log('Posts fetched successfully');
      this._spinnerService.hide();
    }
  }

}
