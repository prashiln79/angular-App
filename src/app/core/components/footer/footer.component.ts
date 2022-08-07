import { ChangeDetectorRef } from '@angular/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent { 

  public allOption = false;

  constructor(public auth: AuthService,private changeDetection: ChangeDetectorRef,private _bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.auth.login.subscribe((data)=>{
      this.changeDetection.detectChanges();
    });
  }

  
  showAllOption(){
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  template: `
  
  <div class="example-button-row">
    <button mat-button>Basic</button>
    <button mat-button color="primary">Primary</button>
    <button mat-button color="accent">Accent</button>
    <button mat-button color="warn">Warn</button>
    <button mat-button disabled>Disabled</button>
    <a mat-button href="https://www.google.com/" target="_blank">Link</a>
  </div>
  
  
  
  `,
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

