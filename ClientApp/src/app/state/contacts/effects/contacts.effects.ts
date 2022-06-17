import { AppState } from "../../app.state.";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, of } from "rxjs";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import { ContactsService } from "../../../services/contacts.service";
import * as fromActions from "../actions/index";
import { Store } from "@ngrx/store";
import { Contact } from "src/app/contacts/contact.model";

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
      mergeMap((payload) =>
        this.contactsService.removeContact(payload.contactId).pipe(
          map((contact: Contact) =>
            fromActions.removeContactSuccess({
              contactId: contact.ContactId,
            })
          ),
          catchError((error) => of(fromActions.removeContactFailure({ error })))
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addContact),
      mergeMap((payload) => {
        console.log(payload);
        return this.contactsService.addContact(payload.contact).pipe(
          map((contact: Contact) =>
            fromActions.addContactSuccess({
              contact: contact,
            })
          ),
          catchError((error) => of(fromActions.addContactFailure({ error })))
        );
      })
    )
  );

  editContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateContact),
      mergeMap((payload) =>
        this.contactsService.updateContact(payload.contactChanges).pipe(
          map((contact: Contact) =>
            fromActions.updateContactSuccess({
              contactChanges: contact,
            })
          ),
          catchError((error) => of(fromActions.updateContactFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private contactsService: ContactsService
  ) {}
}
