import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuillModule } from 'ngx-quill';
import { PostsService } from '@shared/services/posts.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    QuillModule
  ]
})
export class NewPostComponent {

  title = inject(Title);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private postService = inject(PostsService);

  newPostForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: '',
    content: ''
  });


  async onSubmit() {
    if (this.newPostForm.valid) {
      const post = this.newPostForm.value;
      console.log(post);
      try {
        const response = await this.postService.newPost(post);
        console.log('SUCCESS!', response);
        this.snackBar.open("Post creado con éxito", "Cerrar");
        this.resetForm();
      } catch (error) {
        console.error('FAILED...', error);
        this.snackBar.open("Se ha producido un error", "Cerrar");
      }
    }
  }

  resetForm() {
    this.newPostForm.reset();
    Object.keys(this.newPostForm.controls).forEach(key => {
      this.newPostForm.get(key)!.setErrors(null) ;
    });
  }

}
