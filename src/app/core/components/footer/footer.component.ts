import { ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { 

  public allOption = false;

  constructor(public auth: AuthService,private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.auth.login.subscribe((data)=>{
      this.changeDetection.detectChanges();
    });
  }

  
  showAllOption(){
    this.allOption = !this.allOption;
  }
}



