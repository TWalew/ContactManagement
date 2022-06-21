import {
  removeContactFailure,
  addContactSuccess,
  addContactFailure,
} from "./../actions/contacts.actions";
import { loadContactListFailure } from "../actions/contacts.actions";
import { createReducer, on } from "@ngrx/store";

import * as fromActions from "../actions/index";
import { Contact } from "../../../contacts/contact.model";

export interface ContactsState {
  contacts: Contact[];
  error: string;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: ContactsState = {
  contacts: [],
  error: null,
  status: "pending",
};

export const contactsReducer = createReducer(
  initialState,
  // Update list after request
  on(fromActions.loadContactList, (state) => ({
    ...state,
    status: "loading",
  })),

  on(fromActions.loadContactListSuccess, (state, { contacts }) => ({
    ...state,
    contacts: contacts,
    error: null,
    status: "success",
  })),

  on(fromActions.loadContactListFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),

  on(fromActions.removeContact, (state, { contactId }) => ({
    ...state,
    status: "loading",
  })),

  on(fromActions.removeContactSuccess, (state, { contactId }) => ({
    ...state,
    contacts: state.contacts.filter(
      (contact) => contact.ContactId !== contactId
    ),
    error: null,
    status: "success",
  })),

  on(fromActions.removeContactFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),

  // Add a new contact to array
  on(fromActions.addContact, (state, { contact }) => ({
    ...state,
    status: "loading",
  })),

  on(fromActions.addContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    error: null,
    status: "success",
  })),

  on(fromActions.addContactFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),

  // Update specific contact in array
  on(fromActions.updateContact, (state, { contactChanges }) => ({
    ...state,
    status: "loading",
  })),

  on(fromActions.updateContactSuccess, (state, { contactChanges }) => {
    // Define index
    const index = state.contacts.findIndex(
      (el) => el.ContactId === contactChanges.ContactId
    );

    if (index === -1) return state;
    // Define a new array copy from state and update the element inside
    const newArr = [...state.contacts];
    newArr[index] = contactChanges;

    return { ...state, contacts: [...newArr], error: null, status: "success" };
  }),

  on(fromActions.updateContactFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  }))
);
