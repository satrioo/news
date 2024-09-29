import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input()
  title: string | null = null;

  @Input()
  content: string | null = null;

  @Input()
  url: string | null = null;

  @Input()
  image: string | null = null;

  @Input()
  author: string | null = null;


  @Output()
  messageEvent = new EventEmitter<string>();

  showMessage(): void {
    alert(this.title);
  }

  sendOutputMessage(): void {
    this.messageEvent.emit(`${this.title}: This is my internal message`);
  }
}
