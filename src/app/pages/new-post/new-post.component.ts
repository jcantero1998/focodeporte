import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
export class NewPostComponent {

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  private _formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  private readonly _postService = inject(PostsService);
  private readonly _spinnerService = inject(SpinnerService)

  title = inject(Title);
  imageFile: File | undefined;
  newPostForm: FormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    content: '',
  });

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  async onSubmit() {
    if (this.newPostForm.valid) {
      try {
        this._spinnerService.show()
        const response = await this._postService.newPost(this.newPostForm.value, this.imageFile);
        console.log('SUCCESS!', response);
        this._snackBar.open("Post creado con éxito", "Cerrar");
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
    Object.keys(this.newPostForm.controls).forEach(key => {
      this.newPostForm.get(key)!.setErrors(null) ;
    });
  }

}
