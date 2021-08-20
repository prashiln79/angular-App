import { ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() title;
 
  constructor(public auth: AuthService,private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.auth.login.subscribe((data)=>{
      this.changeDetection.detectChanges();
    });
  }

 

  

}
