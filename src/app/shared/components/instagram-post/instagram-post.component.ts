import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Datum } from '@core/models/instagram.interface';

@Component({
  selector: 'app-instagram-post',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './instagram-post.component.html',
  styleUrl: './instagram-post.component.scss'
})
export class PostComponent {
  @Input({ required: true }) post!: Datum;
}
