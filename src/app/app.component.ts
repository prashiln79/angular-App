import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';




@Component({
  selector: 'app-root',
  template: `
    <app-header [title]="currentPageTitle" ></app-header>
    <div class="container">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  public currentPageTitle:string = '';
  
  constructor() {}
  ngOnInit(): void {
  }

  
}
