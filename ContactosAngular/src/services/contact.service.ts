import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly CONTACTS_KEY = 'contacts';
  private nextId = 1;

  constructor() {
    this.loadContacts();
  }

  // Carga los contactos desde el almacenamiento local al iniciar el servicio
  private loadContacts(): void {
    const contacts = this.getContacts();
    if (contacts.length > 0) {
      this.nextId = Math.max(...contacts.map(c => c.id as number)) + 1;
    }
  }

  // Obtiene todos los contactos del almacenamiento local
  getContacts(): Contact[] {
    const contacts = localStorage.getItem(this.CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  }

  // Agrega un nuevo contacto
  addContact(contact: Omit<Contact, 'id'>): void {
    const contacts = this.getContacts();
    const newContact = { ...contact, id: this.nextId++ };
    contacts.push(newContact);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }

  // Elimina un contacto por su ID
  deleteContact(id: number): void {
    let contacts = this.getContacts();
    contacts = contacts.filter(c => c.id !== id);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }
}
