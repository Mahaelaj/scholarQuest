import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../../../shared/utils/api.service';
import { UserService } from '../../../../shared/user/user.service';
import { CoinsService } from '../../../../shared/utils/coins.service';

@Component({
  selector: 'sq-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  @ViewChild('countdown') countdownDialog;
  @ViewChild('endGame') endGameDialog;
  @Output() countdownDoneEvent = new EventEmitter<boolean>();
  @Output() playAgainEvent = new EventEmitter<boolean>();
  @Output() changeGradeLevelEvent = new EventEmitter<Array<{}>>();
  @Output() openSidenavEvent = new EventEmitter<boolean>();
  @Output() closeSidenavEvent = new EventEmitter<boolean>();
  @Input('type') type: string;
  @Input('height') height: number;

  gradeLevel = 1;

  constructor(public apiService: ApiService, public userService: UserService, public coinsService: CoinsService, public snackBar: MatSnackBar) {
    this.gradeLevel = this.userService.grade ? this.userService.grade : 1;
  }

  startCountdown(){
    this.countdownDialog.openCountdownDialog();
  }

  openWinGameDialog(){
    this.endGameDialog.openWinDialog();
  }

  openLoseGameDialog(coins, text){
    this.endGameDialog.openLoseDialog(coins, text);
  }

  countdownDone(){
    this.countdownDoneEvent.emit(true);
  }

  playAgain(){
    this.playAgainEvent.emit(true);
  }

  changeGradeLevel(event){ 
    this.gradeLevel = event;
     this.apiService.post(this.type == 'vocab' ? 'getVocabulary' : 'getMath', { grade: event }).subscribe(
        data => {
          if (data.error) return this.openErrorMessage();
          this.changeGradeLevelEvent.emit(this.type == 'vocab' ? data.vocab : data.math)
        },
        error => { this.openErrorMessage() }
      )
  }

  updateCoins(coins) {
    if (!coins || !this.userService.isLoggedIn()) return;
    this.apiService.post('updateCoins', { coins: coins }).subscribe(
      data => { 
        if (data.error) return this.openErrorMessage();
        this.coinsService.coins.next(data.coins)
      },
      error => this.openErrorMessage()
    )
  }

  openSidenav(){
    this.openSidenavEvent.emit(true);
  }

  closedSidenav(){
    this.closeSidenavEvent.emit(true);
  }

  getVocabulary(){
    return this.apiService.post('getVocabulary', { grade: this.gradeLevel });
  }

  getMath() {
    return this.apiService.post('getMath', { grade: this.gradeLevel });
  }

  openErrorMessage() {
    this.snackBar.open('An Error Has occurred. Please try again later', 'close');
  }
}
