import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor() {}

  firstName: string = '';
  lastName: string = '';
  recipient: string = 'satrioari43@gmail.com';  // Set the recipient email address
  subject: string = '';  // This will be auto-updated
  body: string = '';

  ngOnChanges() {
    this.updateSubject();
  }

  updateSubject() {
    this.subject = `${this.firstName} ${this.lastName} - Subject`; // Modify the subject format as needed
  }

  sendEmail() {
    const mailtoLink = `mailto:${this.recipient}?subject=${encodeURIComponent(this.subject+'&nbsp'+'from'+this.firstName+'-'+this.lastName)}&body=${encodeURIComponent(this.body)}`;
    window.location.href = mailtoLink;
  }
}
