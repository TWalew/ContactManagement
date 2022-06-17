import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./../state/app.state.";
import { EditContentComponent } from "../shared/edit-contact/edit-contact.component";
import { selectAllContacts } from "../state/contacts/selectors/contacts.selector";
import { removeContact } from "../state/contacts/actions/contacts.actions";
import { DialogService } from "primeng-lts/api";

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"],
})
export class ContactsComponent {
  public contacts$ = this.store.select(selectAllContacts);

  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService
  ) {}

  onAddContactOpen() {
    this.dialogService.open(EditContentComponent, {
      header: "Add Contact!",
      width: "30%",
      dismissableMask: true,
    });
  }

  onDeleteContact(id: number) {
    this.store.dispatch(removeContact({ contactId: id }));
  }
}
