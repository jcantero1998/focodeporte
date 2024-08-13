import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '@core/models/post.interfaces';
import { SpinnerService } from '@core/services/spinner.service';
import { APP_CONSTANTS } from '@shared/constants';
import { PostsService } from '@shared/services/posts.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {

  title = inject(Title);
  postId: string | null = null;
  post = signal<Post | null>(null);

  private readonly _postsService = inject(PostsService);
  private readonly _spinnerService = inject(SpinnerService);
  private readonly _route = inject(ActivatedRoute)
  private readonly _router = inject(Router)
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.postId = this._route.snapshot.paramMap.get('id');
    if (this.postId) this.getPostById(this.postId);
  }

  async getPostById(id: string) {
    try {
      this._spinnerService.show()
      const post = await this._postsService.getPostById(id);
      this.post.set(post);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    } finally {
      this._spinnerService.hide();
    }
  }

  async delete(): Promise<void> {
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT);
    if (!confirmation || !this.postId || !this.post()) return;
    try {
      this._spinnerService.show()
      await this._postsService.deletePost(this.postId, this.post()!);
      console.log('SUCCESS!');
      this._snackBar.open("Post eliminado con éxito", "Cerrar");
      this._router.navigate(['/posts']);
    } catch (error) {
      console.error('FAILED...', error);
      this._snackBar.open("Se ha producido un error", "Cerrar");
    } finally {
      this._spinnerService.hide();
    }

  }

}
