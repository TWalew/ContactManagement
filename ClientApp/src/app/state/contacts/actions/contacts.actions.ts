import { createAction, props } from "@ngrx/store";
import { Contact } from "../../../contacts/contact.model";

export const ADD_CONTACT = "[Contact List] Add Contact";
export const ADD_CONTACT_SUCCESS = "[Contact List] Add Contact Success";
export const ADD_CONTACT_FAILURE = "[Contact List] Add Contact Failure";

export const UPDATE_CONTACT = "[Contact List] Update Contact";
export const UPDATE_CONTACT_SUCCESS = "[Contact List] Update Contact Success";
export const UPDATE_CONTACT_FAILURE = "[Contact List] Update Contact Failure";

export const REMOVE_CONTACT = "[Contact List] Remove Contact";
export const REMOVE_CONTACT_SUCCESS = "[Contact List] Remove Contact Success";
export const REMOVE_CONTACT_FAILURE = "[Contact List] Remove Contact Failure";

export const LOAD_CONTACT_LIST = "[Contact List] Retrieve Contacts";
export const LOAD_CONTACT_LIST_SUCCESS =
  "[Contact List] Retrieve Contacts Success";
export const LOAD_CONTACT_LIST_FAILURE =
  "[Contact List] Retrieve Contacts Failure";

export const addContact = createAction(
  ADD_CONTACT,
  props<{ contact: Contact }>()
);
export const addContactSuccess = createAction(
  ADD_CONTACT_SUCCESS,
  props<{ contact: Contact }>()
);
export const addContactFailure = createAction(
  ADD_CONTACT_FAILURE,
  props<{ error: string }>()
);

export const updateContact = createAction(
  UPDATE_CONTACT,
  props<{ contactChanges: Contact }>()
);
export const updateContactSuccess = createAction(
  UPDATE_CONTACT_SUCCESS,
  props<{ contactChanges: Contact }>()
);
export const updateContactFailure = createAction(
  UPDATE_CONTACT_FAILURE,
  props<{ error: string }>()
);

export const removeContact = createAction(
  REMOVE_CONTACT,
  props<{ contactId: number }>()
);
export const removeContactSuccess = createAction(
  REMOVE_CONTACT_SUCCESS,
  props<{ contactId: number }>()
);
export const removeContactFailure = createAction(
  REMOVE_CONTACT_FAILURE,
  props<{ error: string }>()
);

export const loadContactList = createAction(LOAD_CONTACT_LIST);
export const loadContactListSuccess = createAction(
  LOAD_CONTACT_LIST_SUCCESS,
  props<{ contacts: Contact[] }>()
);
export const loadContactListFailure = createAction(
  LOAD_CONTACT_LIST_FAILURE,
  props<{ error: string }>()
);
