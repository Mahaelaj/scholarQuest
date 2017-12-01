import { Component, AfterViewInit, Renderer, ViewChild } from '@angular/core';
import * as _ from 'lodash'

import { ApiService } from '../../../shared/utils/api.service';
import { GameComponent } from '../game/game/game.component';

// necessary to get phaser to work
import * as Phaser from 'phaser-ce';

@Component({
    selector: 'sq-math-bingo',
    templateUrl: './math-bingo.component.html',
    styleUrls: ['./math-bingo.component.css'],
})
export class MathBingoComponent implements AfterViewInit {

    @ViewChild('game') gameController: GameComponent;

    private squares = [];
    private equations = [];
    private scoreText = "Score: 0"
    private score = 0;
    private clock;
    private timeLeft;
    private currEquation: {solution: number, problem: string} = {solution: null, problem: ''};
    private secondsPerProblem = 20;
    private totEquations = [];
    private game: any;
    private background;

    // ngFor uses iternable objects and not numbers, so we put the numbers into an array
    private numRows = Array(5);
    private numCols = Array(5);

    constructor(private renderer: Renderer, private apiService: ApiService) {}

    /**
    * start the game
    */
    ngAfterViewInit() {
        this.game = new Phaser.Game(1355, 750, Phaser.AUTO, document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this), update: this.update.bind(this)});
    }

    preload() {
        this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading_spritesheet.png', 1355, 761, 8);
    }

    create() {
        
        // display the background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        const load = this.background.animations.add('load');
        load.play(4, true);

        // after the assets load, display things
         this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);

        this.gameController.getMath().subscribe(
            data => {
                this.totEquations = data.math;
                this.loadAssets();
                },
            error => {
                console.log('error')
            }
        )
    }

    onAssetsLoaded() {

    }

    loadAssets(){
        
        this.game.load.start();
    };

    update() {}

    // initGameboard() {
    //     this.initClock();
    //     this.score = 0;

    //     // the equations that will be used in the game
    //     var equations = this.totEquations.slice();

    //     // set the text content of the squares
    //     for (var i = 0; i < this.squares.length; i++){

    //         // set the text content of the free square
    //         if (i == (this.numRows.length * this.numCols.length - 1) / 2) {
    //             this.squares[i].textContent = "FREE";

    //             this.squares[i].selected = true;

    //             // set the background color of the free tile
    //             this.renderer.setElementStyle(this.squares[i], 'background-color', 'greenyellow');
    //         }
    //         else {            

    //             // pick a random solution, we don't want the game board to look the same across games
    //             var randIndex = Math.floor(Math.random() * equations.length);

    //             // set the text content to be the solution of the 
    //             this.squares[i].textContent = equations[randIndex].solution;

    //             // remove the solution from the array, so the same solution doesn't show up more than once on the game board
    //             // add the equation to the global equations array so we can use it later for the the problem
    //             this.equations.push(equations.splice(randIndex, 1)[0]);
    //         }
    //     }

    //     // display the problem
    //     this.setProblem();
    // }

    // initClock() {

    //     // set the displayed time to the amount of time given to answer the problem
    //     this.timeLeft = this.secondsPerProblem;

    //     // decrement the clock every second
    //     this.clock = setInterval(x => {
    //         this.timeLeft--;

    //         // if the clock runs out of time ...
    //         if (this.timeLeft == 0) {

    //             this.setScore(-3);

    //             // display a new problem
    //             this.setProblem();

    //             // reset the clock
    //             this.timeLeft = this.secondsPerProblem;
    //         }
    //     }, 1000);
    // }

    // setScore(points) {

    //     // add the score
    //     this.score += points;

    //     // don't let the score fall below 0
    //     if (this.score < 0) {
    //         this.score = 0;
    //     }

    //     // update the score text
    //     this.scoreText = "Score: " + this.score;
    // }

    // setProblem() {

    //     // updated the current equation 
    //     this.currEquation =_.sample(this.equations);
    // }

    // checkCorrect(squarePosition: number) 
    // {
    //     if(this.squares[squarePosition].textContent == this.currEquation.solution) {

    //         this.squares[squarePosition].selected = true;

    //         // change the background color of the square to the correct color
    //         this.renderer.setElementStyle(this.squares[squarePosition], "background-color", "green");

    //         // add points
    //         this.setScore(this.timeLeft);

    //         // stop the clock
    //         clearInterval(this.clock);

    //         // if the game is won, do something
    //         if(this.checkVerticalWin() || this.checkHorizontalWin() || this.checkBackwardDiagonalWin() || this.checkForwardDiagonalWin()){
    //             this.timeLeft = 0;
    //             this.currEquation.problem = "";

    //             // open the dialog that will prompt the user to play again
    //             this.gameController.updateCoins(this.score);
    //             this.gameController.openWinGameDialog();
    //         }

    //         else {

    //             // stop the equation from being used again
    //             for(let i = 0; i < this.equations.length; ++i) {
    //                 if(this.equations[i].solution == this.currEquation.solution) {
    //                     this.equations.splice(i,1);
    //                 };
    //             }

    //             // display a new problem
    //             this.setProblem();

    //         // reset the clock
    //         this.initClock();
    //         }                 
    //     }
    //     else{
            
    //         // subtract points if an incorrect solution was chosen
    //         this.setScore(-2);
    //     }
    // }

    // /*
    //  * check if there is a win via a column
    //  */
    // checkVerticalWin(): boolean {
    //     for(let i = 0; i < this.numCols.length; i++){
    //         var winCol = [];
    //         for(let k = 0; k < this.numRows.length; k++){
    //            if(this.squares[k * this.numCols.length + i].selected) winCol.push(this.squares[k * this.numCols.length + i]); 
    //         }
    //         if(winCol.length == this.numRows.length){ 
    //              this.setTileColorWin(winCol);
    //              return true;
    //         } 
    //     }
    //     return false;
    // }

    // /*
    //  * check if there is a win via a row 
    //  */
    // checkHorizontalWin(): boolean {
    //     for(let i = 0; i < this.numRows.length; i < i++){
    //         var winRow = [];
    //         for(let k = 0; k < this.numCols.length; k < k++){
    //           if(this.squares[i * this.numCols.length + k].selected) winRow.push(this.squares[i * this.numCols.length + k]); 
    //         }
    //         if(winRow.length == this.numCols.length){
    //             this.setTileColorWin(winRow);
    //             return true;
    //         }  
    //     }
    //     return false;
    // }

    // /*
    //  * check if there is a win via a backward diaginal
    //  */
    // checkBackwardDiagonalWin(): boolean {
    //     var winDiag = [];
    //     for(let i = 0; i < this.numRows.length; i < i++){
    //         if(this.squares[i * this.numCols.length + i].selected) winDiag.push(this.squares[i * this.numCols.length + i]);
    //     }
    //     if(winDiag.length == this.numCols.length){
    //          this.setTileColorWin(winDiag);
    //          return true;
    //     }
    //     return false;
    // }

    // /*
    //  * check if there is a win via a backwards diaginal
    //  */
    // checkForwardDiagonalWin(): boolean {
    //     var winDiag = [];
    //     for(let i = 0; i < this.numRows.length; i < i++){
    //         if(this.squares[i * this.numCols.length + (this.numCols.length - i - 1)].selected) winDiag.push(this.squares[i * this.numCols.length + (this.numCols.length - i - 1)]);
    //     }
    //     if(winDiag.length == this.numCols.length){
    //          this.setTileColorWin(winDiag);
    //          return true;
    //     }
    //      return false;
    // }

    // /*
    //  * change the colors of the winning tiles
    //  */
    // setTileColorWin(winTiles: any[]){
    //     winTiles.forEach(tile => this.renderer.setElementStyle(tile, 'background-color', 'purple'));
    // }

    // /*
    //  * restart the game 
    //  */
    // reload() {

    //     for (var i = 0; i < this.squares.length; i++) {
    //         this.renderer.setElementStyle(this.squares[i], 'background-color', null);
    //         this.squares[i].selected = false;
    //     }

    //     this.score = 0;
    //     this.setScore(0);

    //     // stop the clock
    //     clearInterval(this.clock);

    //     this.initGameboard();
    // }

    // changeGradeLevel(mathProbs) {

    //     this.totEquations = mathProbs;
    //     this.reload();
    // }
}

