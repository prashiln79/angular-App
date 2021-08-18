import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() title;
 
  constructor(public auth: AuthService) {}

  ngOnInit() {
    
  }

 

  

}
