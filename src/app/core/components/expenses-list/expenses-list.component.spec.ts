import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpensesListComponent } from './expenses-list.component';

describe('ContactListComponent', () => {
  let component: ExpensesListComponent;
  let fixture: ComponentFixture<ExpensesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should call show.emit when showDetails calls', () => {
    spyOn(component.show, 'emit');
    const contact = {
      id: 1,
      name: 'test',
      email: 'test@avatsaev.com',
      phone: '12345'
    };
    component.showDetails(contact);
    expect(component.show.emit).toHaveBeenCalledWith(contact);
  });

  it('should call edit.emit when editContact calls', () => {
    spyOn(component.edit, 'emit');
    const contact = {
      id: 1,
      name: 'test',
      email: 'test@avatsaev.com',
      phone: '12345'
    };
    component.editContact(contact);
    expect(component.edit.emit).toHaveBeenCalledWith(contact);
  });

  it('should call remove.emit when deleteContact calls', () => {
    spyOn(component.remove, 'emit');
    const contact = {
      id: 1,
      name: 'test',
      email: 'test@avatsaev.com',
      phone: '12345'
    };
    component.deleteContact(contact);
    expect(component.remove.emit).toHaveBeenCalledWith(contact);
  });
});

