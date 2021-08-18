import { NgModule } from '@angular/core';
import {ContactFormComponent} from '../components/contact-form/contact-form.component';
import {ContactDetailsContainerComponent} from '../components/contact-details/contact-details-container.component';
import {HeaderComponent} from '../components/header/header.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FooterComponent} from '@app/core/components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ExpensesListComponent } from '../components/expenses-list/expenses-list.component';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from 'src/app/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ChartsModule
  ],
  declarations: [
    ExpensesListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers:[
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [
    ExpensesListComponent,
    ContactDetailsContainerComponent,
    ContactFormComponent,
    HeaderComponent,
    FooterComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
