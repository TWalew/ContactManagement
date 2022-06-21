import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { ContactsComponent } from "./contacts/contacts.component";

import { AppRoutingModule } from "./app-routing.module";

import { contactsReducer } from "./state/contacts/reducers/contacts.reducer";
import { StoreModule } from "@ngrx/store";
import { ContactsListComponent } from "./contacts/contacts-list/contacts-list.component";
import { EffectsModule } from "@ngrx/effects";
import { ContactsEffects } from "./state/contacts/effects/contacts.effects";
import { EditContentComponent } from "./shared/edit-contact/edit-contact.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogService } from "primeng/api";
import { InputMaskModule } from "primeng/inputmask";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ContactsComponent,
    ContactsListComponent,
    EditContentComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ contacts: contactsReducer }),
    EffectsModule.forRoot([ContactsEffects]),
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    CalendarModule,
    DynamicDialogModule,
    ToastModule,
  ],
  providers: [DialogService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [EditContentComponent],
})
export class AppModule {}
