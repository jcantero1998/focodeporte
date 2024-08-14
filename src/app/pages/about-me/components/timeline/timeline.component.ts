import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Timeline } from '@pages/about-me/interfaces/timeline.interface';

@Component({
  selector: 'about-me-timeline',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  @Input({ required: true }) timeline!: Timeline[];

}
