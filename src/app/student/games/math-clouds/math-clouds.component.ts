import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';

import { ArrayService } from '../../../shared/utils/array.service';

import { ApiService } from '../../../shared/utils/api.service';


@Component({
  selector: 'sq-math-clouds',
  templateUrl: './math-clouds.component.html',
  styleUrls: ['./math-clouds.component.css']
})
export class MathCloudsComponent {
  
  state ='moving';
  private mathProblemsFull = [];
  private mathProblemsRemaining = [];
  private displayedMathSolution: any;
  private score = 0;
  private strikes = 0;
  private scoreText ="Score : 0"
  private displayedProblems = [];
  private boxMovingInterval: any;
  private boxMoveRightDistance = -120;
  private boxSpeed;
  private strikeIcons = [];
  private startSpeed = .1;
 
   @ViewChild('box') box: ElementRef;
 
  //  @ViewChild('endGameDialog') endGameDialog: EndGameDialogComponent;

  constructor( private renderer: Renderer,  private arrayService: ArrayService, private apiService: ApiService ){
    
    // this.mathProblemsFull = this.mathProblemsService.getFirstGradeMathEquations();
    // this.mathProblemsRemaining = this.mathProblemsService.getFirstGradeMathEquations(); 
    this.getProblems();  
  }

  /**
   * get the game ready
   */
    ngAfterViewInit(){
     // get the displayed strikes
      for(var i = 0; i < Object.keys(document.body.querySelectorAll('md-icon')).length; ++i){
        if(document.body.querySelectorAll('md-icon')[i].innerHTML == "clear"){
          this.strikeIcons.push(document.body.querySelectorAll('md-icon')[i]);
       }  
     }
     this.loadGameBoard();
   }

/**
 * get the problems that will be displayed
 */
  getProblems(){

    if(this.mathProblemsRemaining.length == 0) this.mathProblemsRemaining = this.mathProblemsFull.slice();
 
     this.displayedProblems = [];
    // get the solution that will be displayed
    this.displayedMathSolution = this.mathProblemsRemaining.splice(Math.floor(Math.random() * this.mathProblemsRemaining.length), 1)[0];    
    this.displayedProblems.push(this.arrayService.selectRandom(this.displayedMathSolution.problems, 1));
  
    // find and remove the solution from the tempMathProblems array so that it doesnt repeat in the displayedProblems
    var tempMathProblems = this.mathProblemsFull.slice();
    for(let i = 0; i < tempMathProblems.length; i++){
      if(tempMathProblems[i].solution == this.displayedMathSolution.solution){
        tempMathProblems.splice(i,1);
      }
    }

    // add the remaining problems to be displayed    
    for(let j = 0; j < 2; j++){
      var equation = tempMathProblems.splice(Math.floor(Math.random() * tempMathProblems.length),1)[0]
      this.displayedProblems.push(equation.problems[Math.floor(Math.random() * equation.problems.length)]);
    }

    // shuffle the displayed problems
    this.displayedProblems = this.arrayService.shuffle(this.displayedProblems);
}

/**
 * check to see if the correct answer was selected
 * @param position 
 */
checkCorrect(position){

    var isCorrect = false;
    this.displayedMathSolution.problems.forEach(p =>{
      if(p == this.displayedProblems[position]){
        isCorrect = true;
        this.score += 10;
        this. scoreText = "Score : " + this.score;
        this.getProblems();
        this.boxMoveRightDistance = -120;
        this.boxSpeed +=.03;
      }
    })
    if(!isCorrect){
      this.addStrike();
    }
}

  /**
   * add a strike to the player
   */
  addStrike(){
       // change the strike color to red
       if(this.strikes < this.strikeIcons.length){
         this.renderer.setElementStyle(this.strikeIcons[this.strikes], 'color', 'red');
         this.strikes++;
         // if the player has lost, open a dialog prompting the user to play again
         if(this.strikes == this.strikeIcons.length){ 
          //  this.endGameDialog.openLoseDialog();
           this.apiService.addCoins(this.score);
           // stop the clock
           clearInterval(this.boxMovingInterval);
         }
         else {
           this.getProblems();
           this.boxMoveRightDistance = -120;
         }
       }
   }
     
   /*
   * change the vocabulary when a new word is selected
   */
  //  changeGradeLevel(event){
 
  //    switch(event) { 
  //        case 2: { 
  //            this.mathProblemsFull = this.mathProblemsService.getSecondGradeMathEquations();
  //            break; 
  //        }
  //        case 3: { 
  //            this.mathProblemsFull = this.mathProblemsService.getThirdGradeMathEquations();
  //            break; 
  //        }
  //        case 4: { 
  //            this.mathProblemsFull = this.mathProblemsService.getFourthGradeMathEquations();            
  //            break; 
  //        }
  //        case 5: { 
  //            this.mathProblemsFull = this.mathProblemsService.getFifthGradeMathEquations();                         
  //            break; 
  //        }
  //        case 6: { 
  //            this.mathProblemsFull  = this.mathProblemsService.getSixthGradeMathEquations();
  //            break; 
  //        } 
  //        default: { 
  //            this.mathProblemsFull = this.mathProblemsService.getFirstGradeMathEquations();
  //            break; 
  //        }
  //    }
  //    this.mathProblemsRemaining = this.mathProblemsFull.slice();
  //    this.replay(); 
  //  }
 
   /*
   * reload the gameboard;
   */ 
   loadGameBoard(){
     this.boxSpeed = this.startSpeed;
     // decrement the clock every second
     
     this.boxMovingInterval = setInterval(x => {
 
       if(this.boxMoveRightDistance < 580){
         this.boxMoveRightDistance += this.boxSpeed;
         this.renderer.setElementStyle(this.box.nativeElement, 'left', this.boxMoveRightDistance + 'px');
       }
       else{
         this.addStrike();
       }
     }, 1);
   }


 /**
  * play again
  */
   replay(){
     this.getProblems();
     clearInterval(this.boxMovingInterval);
     this.boxMoveRightDistance = -120;
     this.strikeIcons.forEach(icon => { this.renderer.setElementStyle(icon, 'color', null);
   });
     this.strikes = 0;
     this.loadGameBoard();
   }
}
