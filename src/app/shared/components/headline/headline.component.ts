import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
  @Input()
  articles: any[] | null = null;

}
