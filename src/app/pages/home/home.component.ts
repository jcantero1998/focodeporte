import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { ImageSliderComponent } from "../../shared/components/image-slider/image-slider.component";
import { Slide } from '../../core/models/slide.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImageSliderComponent
]
})
export class DashboardComponent {
  title = inject(Title);

  slides: Slide[] = [
    {
      // url: 'images/slider/image4.avif',
      url: 'https://images.pexels.com/photos/25016477/pexels-photo-25016477/free-photo-of-carretera-hombre-deporte-prisa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'First slide',
      description: 'This is the first slide',
    },
    {
      url: 'https://images.pexels.com/photos/4098228/pexels-photo-4098228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Second slide',
      description: 'This is the second slide',
    },
    {
      url: 'https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      title: 'Third slide',
      description: 'This is the third slide',
    },
  ];

}
