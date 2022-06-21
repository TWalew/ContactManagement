import { AppState } from "../../app.state.";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { ContactsService } from "../../../services/contacts.service";
import * as fromActions from "../actions/index";
import { Store } from "@ngrx/store";
import { Contact } from "src/app/contacts/contact.model";
import { MessageService } from "primeng/api";

@Injectable()
export class ContactsEffects {
  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadContactList),
      switchMap(() =>
        from(this.contactsService.getContacts()).pipe(
          map((contacts) =>
            fromActions.loadContactListSuccess({ contacts: contacts })
          ),
          catchError((error) =>
            of(fromActions.loadContactListFailure({ error }))
          )
        )
      )
    )
  );

  removeContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.removeContact),
      switchMap((payload) =>
        this.contactsService.removeContact(payload.contactId).pipe(
          map((contact: Contact) => {
            this.messageService.add({
              severity: "success",
              summary: "Delete Contact",
              detail: "Contact successfully deleted.",
            });
            return fromActions.removeContactSuccess({
              contactId: contact.ContactId,
            });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Delete Contact",
              detail: "Contact deleting failed.",
            });
            return of(fromActions.removeContactFailure({ error }));
          })
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addContact),
      switchMap((payload) => {
        this.messageService.add({
          severity: "success",
          summary: "Create Contact",
          detail: "Contact successfully created.",
        });
        return this.contactsService.addContact(payload.contact).pipe(
          map((contact: Contact) =>
            fromActions.addContactSuccess({
              contact: contact,
            })
          ),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Create Contact",
              detail: "Contact creating failed.",
            });
            return of(fromActions.addContactFailure({ error }));
          })
        );
      })
    )
  );

  editContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateContact),
      switchMap((payload) =>
        this.contactsService.updateContact(payload.contactChanges).pipe(
          map((contact: Contact) => {
            this.messageService.add({
              severity: "success",
              summary: "Edit Contact",
              detail: "Contact successfully edited.",
            });
            return fromActions.updateContactSuccess({
              contactChanges: contact,
            });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: "error",
              summary: "Edit Contact",
              detail: "Contact editing failed.",
            });
            return of(fromActions.updateContactFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private contactsService: ContactsService,
    private messageService: MessageService
  ) {}
}
