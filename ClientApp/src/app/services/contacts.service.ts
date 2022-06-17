import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Contact } from "../contacts/contact.model";

@Injectable({ providedIn: "root" })
export class ContactsService {
  apiUrl: string = this.baseUrl + "api/contacts";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getContacts(): Observable<Array<Contact>> {
    return this.http
      .get<Contact[]>(this.apiUrl)
      .pipe(map((contacts) => contacts || []));
  }

  addContact(item: Contact) {
    return this.http
      .post<Contact>(this.apiUrl, item)
      .pipe(map((contact) => contact || {}));
  }
  updateContact(contact: Contact) {
    return this.http
      .put<Contact>(this.apiUrl, contact)
      .pipe(map((contact) => contact || {}));
  }

  removeContact(id: number) {
    return this.http
      .delete<Contact>(this.apiUrl + "/" + id)
      .pipe(map((contact) => contact || {}));
  }
}
