import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsComponent} from './contacts.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {ContactNewComponent} from './contact-new/contact-new.component';

import {SharedModule} from '@app/core/modules/shared.module';
import {ContactsRoutingModule} from './contacts-routing.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ContactsEffects} from './store/contacts-effects';
import {ContactsStoreFacade} from '@app/contacts-store/contacts.store-facade';
import {reducers} from '@app/contacts-store';
import {ContactsSocketService} from './services/contacts-socket.service';
import {ContactsService} from './services/contacts.service';
import { HomeComponent } from './home/home.component';
import { SpreadSheetService } from './services/spredsheet.service';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactsRoutingModule,
    StoreModule.forFeature('contacts', reducers),
    EffectsModule.forFeature([ContactsEffects]),
    ChartsModule
  ],
  declarations: [
    ContactsComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactNewComponent,
    HomeComponent
  ],
  providers: [ContactsService, ContactsSocketService, ContactsStoreFacade,SpreadSheetService]
})
export class ContactsModule { }
