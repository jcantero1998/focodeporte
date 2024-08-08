import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ImageSliderComponent } from "../../../../shared/components/image-slider/image-slider.component";
import { Slide } from '@core/models/slide.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'home-services',
  standalone: true,
  imports: [ImageSliderComponent, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  slides: Slide[] = [
    {
      url: 'images/slider/1.png',
      title: 'Para deportistas',
      description: 'Para deportistas',
    },
    {
      url: 'images/slider/2.png',
      title: 'Para entrenadores',
      description: 'Para entrenadores',
    },
    {
      url: 'images/slider/3.png',
      title: 'Para clubes',
      description: 'Para clubes',
    },
    {
      url: 'images/slider/4.png',
      title: 'Para opositores',
      description: 'Para opositores',
    },
    {
      url: 'images/slider/5.png',
      title: 'Para empresas',
      description: 'Para empresas',
    },

  ];
}
