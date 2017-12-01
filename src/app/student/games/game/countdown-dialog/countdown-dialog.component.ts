import { Component, EventEmitter, AfterViewInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material';
import { Router, NavigationStart }   from '@angular/router';

@Component({
  selector: 'sq-countdown-outer-dialog',
  templateUrl: './countdown.component.html',
})

export class CountdownOuterDialogComponent {
  @Output() countdownDone = new EventEmitter<boolean>();
  config = new MatDialogConfig;

  constructor(private dialog: MatDialog){
    this.config.disableClose = true;
 
  }

  openCountdownDialog() {
      let dialogRef = this.dialog.open(CountdownInnerDialogComponent, this.config);
       dialogRef.afterClosed().subscribe(result => {
        this.countdownDone.emit(true);
        });
      }
    }

@Component({
  selector: 'sq-countdown-inner-dialog',
  templateUrl: './countdown-dialog.html',
})

export class CountdownInnerDialogComponent implements AfterViewInit {
  
  numbers = [ 
    '../../../../assets/games/countdown/countdown10.png',
    '../../../../assets/games/countdown/countdown15.png', 
    '../../../../assets/games/countdown/countdown110.png', 
    '../../../../assets/games/countdown/countdown115.png', 
    '../../../../assets/games/countdown/countdown120.png', 
    '../../../../assets/games/countdown/countdown125.png', 
    '../../../../assets/games/countdown/countdown130.png', 
    '../../../../assets/games/countdown/countdown135.png', 
    '../../../../assets/games/countdown/countdown140.png', 
    '../../../../assets/games/countdown/countdown145.png', 
    '../../../../assets/games/countdown/countdown150.png', 
    '../../../../assets/games/countdown/countdown155.png', 
    '../../../../assets/games/countdown/countdown160.png', 
    '../../../../assets/games/countdown/countdown165.png', 
    '../../../../assets/games/countdown/countdown170.png', 
    '../../../../assets/games/countdown/countdown175.png', 
    '../../../../assets/games/countdown/countdown180.png', 
    '../../../../assets/games/countdown/countdown185.png', 
    '../../../../assets/games/countdown/countdown190.png', 
    '../../../../assets/games/countdown/countdown195.png', 
    '../../../../assets/games/countdown/countdown1100.png',
    '../../../../assets/games/countdown/countdown20.png',
    '../../../../assets/games/countdown/countdown25.png', 
    '../../../../assets/games/countdown/countdown210.png', 
    '../../../../assets/games/countdown/countdown215.png', 
    '../../../../assets/games/countdown/countdown220.png', 
    '../../../../assets/games/countdown/countdown225.png', 
    '../../../../assets/games/countdown/countdown230.png', 
    '../../../../assets/games/countdown/countdown235.png', 
    '../../../../assets/games/countdown/countdown240.png', 
    '../../../../assets/games/countdown/countdown245.png', 
    '../../../../assets/games/countdown/countdown250.png', 
    '../../../../assets/games/countdown/countdown255.png', 
    '../../../../assets/games/countdown/countdown260.png', 
    '../../../../assets/games/countdown/countdown265.png', 
    '../../../../assets/games/countdown/countdown270.png', 
    '../../../../assets/games/countdown/countdown275.png', 
    '../../../../assets/games/countdown/countdown280.png', 
    '../../../../assets/games/countdown/countdown285.png', 
    '../../../../assets/games/countdown/countdown290.png', 
    '../../../../assets/games/countdown/countdown295.png', 
    '../../../../assets/games/countdown/countdown2100.png',
    '../../../../assets/games/countdown/countdown30.png',
    '../../../../assets/games/countdown/countdown35.png', 
    '../../../../assets/games/countdown/countdown310.png', 
    '../../../../assets/games/countdown/countdown315.png', 
    '../../../../assets/games/countdown/countdown320.png', 
    '../../../../assets/games/countdown/countdown325.png', 
    '../../../../assets/games/countdown/countdown330.png', 
    '../../../../assets/games/countdown/countdown335.png', 
    '../../../../assets/games/countdown/countdown340.png', 
    '../../../../assets/games/countdown/countdown345.png', 
    '../../../../assets/games/countdown/countdown350.png', 
    '../../../../assets/games/countdown/countdown355.png', 
    '../../../../assets/games/countdown/countdown360.png', 
    '../../../../assets/games/countdown/countdown365.png', 
    '../../../../assets/games/countdown/countdown370.png', 
    '../../../../assets/games/countdown/countdown375.png', 
    '../../../../assets/games/countdown/countdown380.png', 
    '../../../../assets/games/countdown/countdown385.png', 
    '../../../../assets/games/countdown/countdown390.png', 
    '../../../../assets/games/countdown/countdown395.png', 
    '../../../../assets/games/countdown/countdown3100.png'    
    ]

    activeNumberIndex = this.numbers.length -1;
    countdown;

  constructor(public dialogRef: MatDialogRef<CountdownInnerDialogComponent>, private router: Router) {
    router.events.forEach((event) => {
     if(event instanceof NavigationStart) {
        clearInterval(this.countdown);
      }
    });
  }

  
  ngAfterViewInit(){
    this.countdown = setInterval(function(){
      this.activeNumberIndex--;
      if(this.activeNumberIndex < 0){
        clearInterval(this.countdown);
        this.dialogRef.close();
      }
    }.bind(this), 50)
  }
}
