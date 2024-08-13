import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
import { SpinnerService } from '@core/services/spinner.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

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
    QuillModule,
    MatIconModule
  ]
})
export class NewPostComponent implements OnInit{

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  private _formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  private readonly _postService = inject(PostsService);
  private readonly _spinnerService = inject(SpinnerService)
  private readonly _route = inject(ActivatedRoute)

  isEditing = false;
  title = inject(Title);
  postId: string | null = null;
  imageFile: File | undefined;
  imageFileUrl: string | undefined;
  newPostForm: FormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    content: '',
  });

  ngOnInit(): void {
    this.postId = this._route.snapshot.paramMap.get('id');
    if (this.postId){
      this.isEditing = true;
      this.getPostById(this.postId);
    }
  }

  async getPostById(id: string) {
    try {
      this._spinnerService.show()
      const post = await this._postService.getPostById(id);
      this.newPostForm.patchValue({
        title: post.title,
        description: post.description,
        content: post.content
      });
      if (post.image) this.imageFileUrl = post.image;
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    } finally {
      this._spinnerService.hide();
    }
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
    this.imageFileUrl = undefined;
  }

  async onSubmit() {
    if (this.newPostForm.valid) {
      try {
        this._spinnerService.show();
        let response;
        if (this.isEditing && this.postId) {
          response = await this._postService.updatePost(this.postId, this.newPostForm.value, this.imageFile);
          this._snackBar.open("Post actualizado con éxito", "Cerrar");
        } else {
          response = await this._postService.newPost(this.newPostForm.value, this.imageFile);
          this._snackBar.open("Post creado con éxito", "Cerrar");
        }
        console.log('SUCCESS!', response);
        this.resetForm();
      } catch (error) {
        console.error('FAILED...', error);
        this._snackBar.open("Se ha producido un error", "Cerrar");
      } finally {
        this._spinnerService.hide();
      }
    }
  }

  resetForm() {
    this.newPostForm.reset();
    this.fileInput!.nativeElement.value = '';
    this.imageFile = undefined;
    this.imageFileUrl = undefined;

    Object.keys(this.newPostForm.controls).forEach(key => {
      this.newPostForm.get(key)!.setErrors(null) ;
    });

    this.isEditing = false;
    this.postId = null;
  }

}
