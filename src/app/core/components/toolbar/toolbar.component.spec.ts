import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [ ToolbarComponent ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
