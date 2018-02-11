import { Component, ElementRef, ViewChild, HostListener, Renderer, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material';
import * as _ from 'lodash'

import { GameComponent } from '../game/game/game.component';

@Component({
  selector: 'sq-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css']

})
export class TypingComponent implements AfterViewInit{
  
  public vocabularyFull = [];
  public vocabulary = [];
  public displayedWord: string;
  public vocabularyQueue = [];
  public score = 0;
  public strikes = 0;
  public scoreText ="Score : 0"
  public strikeIcons = []

  @ViewChild('game') gameController: GameComponent;

  constructor(public renderer: Renderer) {}

  ngAfterViewInit() {
    
     // get the displayed strikes
     for(var i = 0; i < Object.keys(document.body.querySelectorAll('mat-icon')).length; ++i){
       if(document.body.querySelectorAll('mat-icon')[i].innerHTML == "clear"){
         this.strikeIcons.push(document.body.querySelectorAll('mat-icon')[i]);
      }  
    }
    this.gameController.getVocabulary().subscribe(vocab => {
      this.vocabularyFull = vocab.vocab;
      this.reload();
    })
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    // stop the space bar from causing the page to scroll
    if (event.keyCode == 32 ){
      event.preventDefault();
      if (this.displayedWord.length == 0) {

        this.score += 10;
        this.scoreText = 'Score : ' + this.score;

        // get the next displayed word
        this.displayedWord = _.first(this.vocabularyQueue);
        this.vocabularyQueue = _.drop(this.vocabularyQueue);

        // if there are no more vocabulary words to add to the queue, reset the vocabulary
        if (!this.vocabulary.length) this.vocabulary = this.vocabularyFull.slice();

        // add another word to the queue
        this.vocabularyQueue.push(this.vocabulary.splice(Math.floor(Math.random() * this.vocabulary.length), 1)[0].word);
      }
    }
   
    else if (event.key == this.displayedWord.charAt(0)) { 

      // remove the letter that was just pressed
      this.displayedWord = this.displayedWord.substring(1, this.displayedWord.length);
    }
    else if(this.strikes < 10) {
      // add a strike
      this.addStrike()
    }
  }

  addStrike() {

      // change the strike color to red
      this.renderer.setElementStyle(this.strikeIcons[this.strikes], 'color', 'red');
      this.strikes++;
      // if the player has lost, open a dialog prompting the user to play again
      if(this.strikes == this.strikeIcons.length){
        // TODO: end game
        this.gameController.openLoseGameDialog(this.score, '');
        this.gameController.updateCoins(this.score);
      }
  }

/*
 * reload the gameboard;
 */ 
 reload(){

   this.vocabulary = this.vocabularyFull.slice();
   this.vocabularyQueue = [];
    // get the first word
    this.displayedWord = this.vocabulary.splice(Math.floor(Math.random() * this.vocabulary.length), 1)[0].word;
    // get the words for the queue
    var queueSize = this.vocabulary.length < 4 ? this.vocabulary.length : 4;
    for(var i = 0; i < queueSize; i++){
      this.vocabularyQueue.push(this.vocabulary.splice(Math.floor(Math.random() * this.vocabulary.length), 1)[0].word);
    }
      // update the score
      this.score = 0;
      this.scoreText = "Score: " + this.score.toString();

      // reset the strikes
      this.strikes = 0;
      this.strikeIcons.forEach(icon => this.renderer.setElementStyle(icon, 'color', null))
  }

  changeGradeLevel(event) {
    this.vocabularyFull = event;
    this.reload();
  }
}
