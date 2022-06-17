import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";
import { EditContentComponent } from "src/app/shared/edit-contact/edit-contact.component";
import { Contact } from "../contact.model";
import { DialogService } from "primeng/api";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contacts-list.component.html",
  styleUrls: ["./contacts-list.component.scss"],
})
export class ContactsListComponent {
  @Input() contacts: ReadonlyArray<Contact> = [];
  @Output() remove = new Subject<number>();

  constructor(private dialogService: DialogService) {}

  onEditContactOpen(contact: Contact) {
    const modalRef = this.dialogService.open(EditContentComponent, {
      header: "Edit Contact!",
      width: "30%",
      data: { contact: contact },
      dismissableMask: true,
    });
  }

  deleteContact(id: number) {
    this.remove.next(id);
  }
}
