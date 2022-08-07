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
  public profilePic: any = '';
 
  constructor(public auth: AuthService,private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    
    this.auth.login.subscribe((data)=>{
      this.changeDetection.detectChanges();
    });
  }


  getMonth(type){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if(type == 'mm'){
      return (new Date()).getDate();
    }else{
  
      return months[new Date().getMonth()];
    }
    
  }
 

  

}
