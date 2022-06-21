import { ContactsState } from "../reducers/contacts.reducer";
import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state.";
import { Contact } from "../../../contacts/contact.model";

export const selectContacts = (state: AppState) => state.contacts;
export const selectAllContacts = createSelector(
  selectContacts,
  (state: ContactsState) => state.contacts
);
export const selectAllErrors = createSelector(
  selectContacts,
  (state: ContactsState) => state.error
);
