import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { TimelineComponent } from "./components/timeline/timeline.component";
import { Timeline } from './interfaces/timeline.interface';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MatExpansionModule, TimelineComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  academicExperience: Timeline[] = [
    {
      year: '2022',
      description: 'Finalicé el grado en Psicología a través de la UNED.',
      details: 'Mención en Psicología de la salud. Mi TFG lo realicé sobre el efecto del entrenamiento aeróbico en la prevención de enfermedades neurodegenerativas.',
      detailsIcon: 'school'
    },
    { year: '2023', description: 'Máster en Actualización en Intervención Psicológica y Salud Mental. UDIMA.' },
    { year: '2023', description: 'Experto en actualización DSM5 y CIE11. UDIMA.' },
    { year: '2024', description: 'Máster en Psicología Deportiva. UNED.' },
    { year: '2024 - Actualidad', description: 'Cursando el máster en Psicología General Sanitaria a través de la UNED.' }
  ];

  professionalExperience: Timeline[] = [
    { year: '10/2020 - 01/2021', description: 'Psicóloga en prácticas. Cognitiva Unidad de Memoria' },
    { year: '04/2023 - 09/2023', description: 'Técnico de atención temprana. ANFAS' },
    { year: '04/2023 - 06/2024', description: 'Dinamizadora de talleres sobre envejecimiento y regulación emocional. Hartford S.L.' },
    { year: '09/2023 - Actualidad', description: 'Psicóloga deportiva. U.D. Multivera' },
    { year: '07/2023 - Actualidad', description: 'Técnico social. ANASAPS' }
  ];

}
