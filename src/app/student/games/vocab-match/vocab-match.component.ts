import { Component, ElementRef, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash'

import { ApiService } from '../../../shared/utils/api.service';
import { GameComponent } from '../game/game/game.component';

@Component({
  selector: 'sq-vocab-match',
  templateUrl: './vocab-match.component.html',
  styleUrls: ['./vocab-match.component.css']

})
export class VocabMatchComponent implements AfterViewInit {

  private vocab = [];
  private vocabFullList = [];
  private vocabWords = [];
  private vocabDefs = [];
  private vocabNum = 10;
  private selectedWord: string;
  private score = 0;

  @ViewChild('score') scoreTxt: ElementRef;
  @ViewChild('game') gameController: GameComponent;

  constructor(private renderer: Renderer, private apiService: ApiService) {}

  ngAfterViewInit(){
    this.gameController.getVocabulary().subscribe(vocab => {
      this.vocabFullList = vocab.vocab;
      this.initGameBoard();
    })
  }
  
  initGameBoard(){

    // we want the displayed vocabulary to be under a cetain size so its easier to move in
    this.vocab = _(this.vocabFullList).shuffle().take(10).value();
    this.vocabWords = _(this.vocab).map(vocab => vocab.word).shuffle().value();
    this.vocabDefs = _(this.vocab).map(vocab => vocab.definition).shuffle().value();
  }

/*
 * allow drag and drop
 */
dragover(event){
  event.preventDefault();
}

/*
 * called when the vocab word is dropped in the drop container 
 */ 
 onDrop(ev, row){
   this.vocab.forEach(v => {

     // if the vocab word matches the definition ...
     if(v.word == this.selectedWord && v.definition == row){

       // set the word in the drop container to be the vocab word
      ev.target.textContent = this.selectedWord;

      // change the border to solid green 
      this.renderer.setElementStyle(ev.target, "border", "solid green");
     
     // remove the vocab word fromm the list so can't be used again
      for(var i = 0; i < this.vocabWords.length; i++) {
        if(this.vocabWords[i] == v.word){
          this.vocabWords.splice(i, 1);

          // add to the score
          this.score += 10;
          this.scoreTxt.nativeElement.textContent ="Score: " + this.score;

          // if the game is over, open the dialog that will prompt the user to play again
          if(this.vocabWords.length == 0){
            this.gameController.openWinGameDialog();
            this.gameController.updateCoins(this.score);
          }    
        }
      }
     }
   })
 }

/*
 * get the word that is being dragged 
 */
 dragStart(row){
   this.selectedWord = row;
 }

/*
 * start a new game
 */
 reload(){
   this.vocab = [];
    this.vocabWords = [];
    this.vocabDefs = [];
    this.score = 0;
    this.scoreTxt.nativeElement.textContent ="Score: " + this.score;
    
    // reset the drop containers
    for (let i = 0; i < document.getElementsByClassName('drop').length; i++){

      // reset the text content
      document.getElementsByClassName('drop')[i].textContent = '';

      // reset the border
      this.renderer.setElementStyle(document.getElementsByClassName('drop')[i], "border", "dotted black;");
      this.initGameBoard()
    }
 }

 changeGradeLevel(event) {
  this.vocabFullList = event;
  this.reload();
  }
}
