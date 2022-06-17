import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng-lts/api";
import * as moment from "moment";

import { Contact } from "src/app/contacts/contact.model";
import { addContact } from "src/app/state/contacts/actions";
import { updateContact } from "./../../state/contacts/actions/contacts.actions";
import { AppState } from "./../../state/app.state.";

@Component({
  selector: "edit-modal-content",
  templateUrl: "./edit-contact.component.html",
  styleUrls: ["./edit-contact.component.scss"],
})
export class EditContentComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.maxLength(500),
    ]),
    surname: new FormControl("", [
      Validators.required,
      Validators.maxLength(500),
    ]),
    dateOfBirth: new FormControl("", [Validators.required]),
    address: new FormControl("", [
      Validators.required,
      Validators.maxLength(500),
    ]),
    phoneNumber: new FormControl("", [Validators.required]),
    IBAN: new FormControl("", [Validators.required, Validators.maxLength(35)]),
  });

  contact: Contact;
  isEditMode: boolean = false;
  startYear = moment().subtract(120, "years").year();
  endYear = moment().subtract(18, "years").year();

  constructor(
    private store: Store<AppState>,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    if (this.config.data && this.config.data.contact) {
      this.contact = this.config.data.contact;
    }
  }

  ngOnInit(): void {
    if (this.contact) {
      this.isEditMode = true;
      this.contactForm.setValue({
        firstName: this.contact.FirstName,
        surname: this.contact.Surname,
        dateOfBirth: new Date(this.contact.DateOfBirth),
        address: this.contact.Address,
        phoneNumber: this.contact.PhoneNumber,
        IBAN: this.contact.IBAN,
      });
    }
  }

  onSubmit(): void {
    let newContact: Contact = {
      FirstName: this.contactForm.get("firstName").value,
      Surname: this.contactForm.get("surname").value,
      DateOfBirth: this.contactForm.get("dateOfBirth").value,
      Address: this.contactForm.get("address").value,
      PhoneNumber: this.contactForm.get("phoneNumber").value,
      IBAN: this.contactForm.get("IBAN").value,
    };
    if (this.isEditMode) {
      newContact.ContactId = this.contact.ContactId;
      this.store.dispatch(
        updateContact({
          contactChanges: newContact,
        })
      );
    } else {
      this.store.dispatch(addContact({ contact: newContact }));
    }
    this.close();
  }

  close(): void {
    this.ref.close();
  }

  validateInput() {
    this.contactForm.patchValue({
      phoneNumber: this.contactForm.controls["phoneNumber"].value,
    });
  }
}
