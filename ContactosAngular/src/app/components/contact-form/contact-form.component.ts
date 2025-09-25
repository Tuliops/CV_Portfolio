import { Component } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importa FormsModule para los formularios
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  newContact = { name: '', phone: '', email: '' };
  constructor(private contactService: ContactService, private router: Router) { }

  onSubmit(): void {
    this.contactService.addContact(this.newContact);
    this.router.navigate(['/contacts']); // Vuelve a la lista después de guardar
  }
}