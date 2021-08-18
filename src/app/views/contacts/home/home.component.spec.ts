import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as fromContacts from '@app/contacts-store';
import { HomeComponent } from './home.component';
import {StoreModule} from '@ngrx/store';
import {RouterTestingModule} from '@angular/router/testing';
import {ContactListComponent} from '@app/core/components/contact-list/contact-list.component';
import {ContactsStoreFacade} from '@app/contacts-store/contacts.store-facade';

import { Router } from '@angular/router';
import {ContactsSocketService} from '../services/contacts-socket.service';
import {ROOT_REDUCERS} from '@app/root-store';


describe('ContactsIndexComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let contactsFacade: ContactsStoreFacade;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({

      declarations: [ HomeComponent, ContactListComponent ],
      imports: [
        StoreModule.forRoot(ROOT_REDUCERS),
        StoreModule.forFeature('contacts', fromContacts.reducers),
        RouterTestingModule
      ],
      providers: [
        ContactsStoreFacade,
        ContactsSocketService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    contactsFacade = fixture.debugElement.injector.get(ContactsStoreFacade);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call contactsFacade.setCurrentContactId and router.navigate when editContact calls', () => {

    spyOn(router, 'navigate');
    component.editContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1, 'edit']);
  });

  it('should call contactsFacade.setCurrentContactId and router.navigate when showContact calls', () => {

    spyOn(router, 'navigate');
    component.showContact({id: 1, name: 'test', email: 'test@avatsaev.com'});

    expect(router.navigate).toHaveBeenCalledWith(['/contacts', 1]);
  });

  it('should call contactsFacade.setCurrentContactId when deleteContact calls', () => {
    spyOn(window, 'confirm').and.callFake(() => {
      return true;
    });
    spyOn(contactsFacade, 'deleteContact');
    component.deleteContact({id: 1, name: 'test', email: 'test@avatsaev.com'});
    expect(contactsFacade.deleteContact).toHaveBeenCalledWith(1);
  });
});
