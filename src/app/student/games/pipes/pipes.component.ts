import { Component, ElementRef, ViewChild, Renderer, AfterViewInit, trigger, style, state, transition, animate, keyframes, AfterContentInit } from '@angular/core';

import { ArrayService } from '../../../shared/utils/array.service';
import { ApiService } from '../../../shared/utils/api.service';
import { ActivatedRoute } from '@angular/router';

import * as _ from "lodash";

@Component({
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css'],
    animations: [
      trigger('shake', [
          state('left', style({ 'transform': 'rotate(30deg)' })),
          state('right', style({ 'transform': 'rotate(-30deg)' })),
          state('normal', style({ 'transform': 'rotate(0deg)' })),
          transition('normal => left', animate('250ms ease-in')),
          transition('normal => right', animate('250ms ease-in')),
          transition('* => normal', animate('250ms ease-out'))
        ]),
         trigger('spill', [
          state('normal', style({ 'width': '60px', 'height': '60px' })),
          state('spilled', style({ 'width': '300px', 'height': '150px', 'transform': 'translateY(-60px) translateX(-100px)' })),
          transition('normal => spilled', animate('4s ease-out')),
          transition('spilled => spilled', animate('.1s')),
      ])
    ]
})
export class PipesComponent implements AfterViewInit{

  @ViewChild('gameTable') gameTable;
  @ViewChild('game') gameController;
  private spillState = 'normal';
  private problemsFull = [];
  private finishBoxes = [];
  private numProblemsShown = 3;
  private activeProblem: any;
  private startBoxes = [];
  private numParts = 3;
  private pipesInHoldingBoxes = [];
  private holdingBoxes = []
  private draggedNum: number;
  private gameBoard = [];
  private cornerOuterImg = '../../../assets/games/pipes/corner_outer.png';
  private cornerUnderImg = '../../../assets/games/pipes/corner_under.png';
  private straightOuterImg = '../../../assets/games/pipes/straight_outer.png';
  private straightUnderImg = '../../../assets/games/pipes/straight_under.png';
  private cornerFullImg1 = '../../../assets/games/pipes/corner_full1.png';
  private cornerFullImg2 = '../../../assets/games/pipes/corner_full2.png';
  private cornerFullImg3 = '../../../assets/games/pipes/corner_full3.png';
  private cornerFullImg4 = '../../../assets/games/pipes/corner_full4.png';
  private straightFullImg1 = '../../../assets/games/pipes/straight_full1.png';
  private straightFullImg2 = '../../../assets/games/pipes/straight_full2.png';
  private endUnderImg = '../../../assets/games/pipes/end_pipe_under.png';
  private endOuterImg = '../../../assets/games/pipes/end_pipe_outer.png';
  private waterSpillImg = '../../../assets/games/pipes/waterSpill.png';
  private acidSpillImg = '../../../assets/games/pipes/acidSpill.png';
  private terrains = [ '../../../assets/games/pipes/terrain_1.jpg', '../../../assets/games/pipes/terrain_2.jpg', '../../../assets/games/pipes/terrain_3.jpg', '../../../assets/games/pipes/terrain_4.jpg', '../../../assets/games/pipes/terrain_5.jpg' ] ;
  private terrainsGrass = [ '../../../assets/games/pipes/terrain_grass_1.jpg', '../../../assets/games/pipes/terrain_grass_2.jpg', '../../../assets/games/pipes/terrain_grass_3.jpg']
  private rotations = [ 'rotate(0deg)', 'rotate(90deg)', 'rotate(180deg)', 'rotate(270deg)'];
  private rocks = [ '../../../assets/games/pipes/rock1.png', '../../../assets/games/pipes/rock2.png', '../../../assets/games/pipes/rock3.png'];
  private bubbles = [ '../../../assets/games/pipes/bubbles_1.png', '../../../assets/games/pipes/bubbles_2.png', '../../../assets/games/pipes/bubbles_3.png' ];
  private recycleIsAnimating = false;
  private gameTableRows = Array(6);
  private gameTableData = Array(5);
  private shakeState ='normal';
  private hoveringOnRecycle = false;
  private lastShakeState = 'left';
  public waterDirection = 'right';
  private level = 0;
  private defaultWaterSpeed = 10; 
  private waterPipeLocation = {row: 0, column: 1};
  private nextWaterDirection;
  private endColumn = 7;
  private levelWaterSpeed = 10;
  private defaultPipeFittingClass = 'pipeFitting';
  private rockSquares = [];
  private waterSpill;
  private waterPipes = [];
  private acidColor = '#91C82F';
  private lavaColor = '#CF2010'
  private spillImg = this.waterSpillImg;
  private score = 0;
  private gameType = '';
  private pipes = [ 
   { outerImg: this.cornerOuterImg, underImg: this.cornerUnderImg, fullImg: this.cornerFullImg4, connectors: ['down', 'left'], pipeRotation: 'rotate(270deg)', fittingsClasses: ['pipeFittingDown', 'pipeFittingLeft'] },
   { outerImg: this.cornerOuterImg, underImg: this.cornerUnderImg, fullImg: this.cornerFullImg3, connectors: ['down', 'right'], pipeRotation: 'rotate(180deg)', fittingsClasses: ['pipeFittingDown', 'pipeFittingRight'] },
   { outerImg: this.cornerOuterImg, underImg: this.cornerUnderImg, fullImg: this.cornerFullImg1, connectors: ['up', 'left'], pipeRotation: 'rotate(0deg)', fittingsClasses: ['pipeFittingUp', 'pipeFittingLeft'] },
   { outerImg: this.cornerOuterImg, underImg: this.cornerUnderImg, fullImg: this.cornerFullImg2, connectors: ['up', 'right'], pipeRotation: 'rotate(90deg)', fittingsClasses: ['pipeFittingUp', 'pipeFittingRight'] },
   { outerImg: this.straightOuterImg, underImg: this.straightUnderImg, fullImg: this.straightFullImg2, connectors: ['down', 'up'], pipeRotation: 'rotate(90deg)', fittingsClasses: ['pipeFittingDown', 'pipeFittingUp'] },
   { outerImg: this.straightOuterImg, underImg: this.straightUnderImg, fullImg: this.straightFullImg1, connectors: ['right', 'left'], pipeRotation: 'rotate(0deg)', fittingsClasses: ['pipeFittingRight', 'pipeFittingLeft'] }
  ]
 
   constructor( private renderer: Renderer, private arrayService: ArrayService, private apiService: ApiService, private route: ActivatedRoute ){
    const routeParams: any = this.route.params;
    this.gameType = routeParams.value.type;
      // this.gameType = params['type']; // get the game type, either math or vocab


    // get the pipes to be displayed in the holding container
    this.initPipesInHoldingBoxes();

    // add pipe connectors, pipe rotation, and terrain to the game board
    for(let i = 0; i < this.gameTableData.length + 3; i++){
       var tempArr = [];
      for(let k = 0; k < this.gameTableRows.length; k++){
        if(k == 0) tempArr.push({connectors: [], pipeRotation: '', terrain: _.sample(this.terrainsGrass)});
        else  tempArr.push({connectors: [], pipeRotation: '', terrain: _.sample(this.terrains)});
      }
      this.gameBoard.push(tempArr);
    }
  }

  /**
   * get a reference to all the squares on the board
   */
    async ngAfterViewInit() {

      // this.route.params.subscribe(params => {
        // this.gameType = params['type']; // get the game type, either math or vocab

        // get the vocabulary the player will start with
        this.problemsFull = this.gameController[this.gameType == 'vocab' ? 'getVocabulary' : 'getMath']().subscribe(
          data => { 
            this.problemsFull = (this.gameType == 'vocab' ? data.vocab : data.math);

            // prevents the countdown from breaking
            var self = this;
            setTimeout(function(){self.gameController.startCountdown(); }, 1);

            // load the content of the game
            this.loadGameboard();
            },
          error => {
            console.log('error')
          }
        )
    //  });
      
      // get a reference to the finish boxes
      for(var i = 0; i < document.body.getElementsByClassName('finishBox').length; ++i){
        this.finishBoxes.push(document.body.getElementsByClassName('finishBox')[i]);
      }

      // get a reference to the starting boxes
      for(var i = 0; i < document.body.getElementsByClassName('startBox').length; ++i){
        this.startBoxes.push(document.body.getElementsByClassName('startBox')[i]);
      }

      // get a reference to the holding boxes
      for(var i = 0; i < document.body.getElementsByClassName('holdingBox').length; ++i){
        this.holdingBoxes.push(document.body.getElementsByClassName('holdingBox')[i]);
      }
      
      // get a reference to the water spill
      this.waterSpill = document.body.getElementsByClassName('waterSpill')[0];

      // set up the gameboard
      for(let i = 0; i < this.gameTable.nativeElement.children[0].children[0].children.length; i++){
        for(let k = 0; k < this.gameTable.nativeElement.children[0].children.length; k++){

          // add the element to the game board
           this.gameBoard[i][k].element = this.gameTable.nativeElement.children[0].children[k].children[i];

           // get a reference to the game board pipe elements
           var childElemWithWater;
           if(this.gameBoard[i][k].element.children.length > 1) childElemWithWater = _.find(this.gameBoard[i][k].element.children, function(e) { return e.className.includes('Pipe');})
           else childElemWithWater = this.gameBoard[i][k].element.children[0];

           // get a reference to the pipe fitting element
           this.gameBoard[i][k].water = _.filter(childElemWithWater.children, function(e){return e.className.includes('water')});
           if (_.find(childElemWithWater.children, function(e){return e.className.includes('pipeFitting')})){
            this.gameBoard[i][k].fittings =_.filter(childElemWithWater.children, function(e){return e.className.includes('pipeFitting')});
           }

           // get a reference to the rock element
           if (_.find(childElemWithWater.children, function(e){return e.className.includes('rock')})){ 
            this.gameBoard[i][k].rock =_.find(childElemWithWater.children, function(e){return e.className.includes('rock')});
            this.rockSquares.push(this.gameBoard[i][k].rock);
           }

           // get a reference to the outer outerpipe element
           if (_.find(childElemWithWater.children, function(e){return e.className.includes('outerPipe')})){ 
            this.gameBoard[i][k].outerPipe =_.find(childElemWithWater.children, function(e){return e.className.includes('outerPipe')});
           }

           // get a reference to the outer underpipe element
            if (_.find(childElemWithWater.children, function(e){return e.className.includes('underPipe')})){ 
            this.gameBoard[i][k].underPipe =_.find(childElemWithWater.children, function(e){return e.className.includes('underPipe')});
           }

           // get a reference to the special effect 
           if (_.find(childElemWithWater.children, function(e){return e.className.includes('specialEffect')})){ 
            this.gameBoard[i][k].specialEffect =_.find(childElemWithWater.children, function(e){return e.className.includes('specialEffect')});
           }
          }
        }
      }
   
    /**
     * get the game board ready
     */
    loadGameboard() {
      var problemsRemaining = this.problemsFull;
      
      // change the water spill img if the player is above level 4 to the acid water spill
      if(this.level > 4 && this.spillImg != this.acidSpillImg) this.spillImg = this.acidSpillImg;

      // get random definitions, including the definition for the active vocabulary, and disply it in random spots
      var problemsShown = this.arrayService.selectRandom(problemsRemaining, this.numProblemsShown);
      var boxes = this.arrayService.selectRandom(this.finishBoxes, this.numProblemsShown);
      for(let i = 0; i < this.numProblemsShown; i++) {
        boxes[i].children[0].textContent = problemsShown[i][ this.gameType == 'vocab' ? 'definition' : 'solution' ];
        boxes[i].parentElement.children[0].children[0].src = this.endUnderImg;
        this.renderer.setElementStyle(boxes[i].parentElement.children[0].children[0], 'visibility', 'visible');
        boxes[i].parentElement.children[0].children[3].src = this.endOuterImg;
        this.renderer.setElementStyle(boxes[i].parentElement.children[0].children[3], 'visibility', 'visible');
      }

      // pick a word to be the active vocabulary word
      var startIndex = Math.floor(Math.random() * this.gameTableRows.length);
      this.activeProblem = this.arrayService.selectRandom(problemsShown, 1)[0];
      this.startBoxes[startIndex].children[0].textContent = (this.gameType == 'vocab' ? this.activeProblem.word : this.activeProblem.problem);
      this.startBoxes[startIndex].parentElement.children[1].children[0].src = this.endUnderImg;
      this.renderer.setElementStyle(this.startBoxes[startIndex].parentElement.children[1].children[0], 'visibility', 'visible');
      this.startBoxes[startIndex].parentElement.children[1].children[3].src = this.endOuterImg;
      this.renderer.setElementStyle(this.startBoxes[startIndex].parentElement.children[1].children[3], 'visibility', 'visible');
      this.waterPipeLocation.row = startIndex;

      // place the rock tiles
      var rockTiles = _.sampleSize(this.rockSquares, 3)
      rockTiles.forEach(rockTile => {
        rockTile.src = _.sample(this.rocks);
        this.renderer.setElementStyle(rockTile, 'visibility', 'visible');
      })
    }
    
    /**
     * add pipes to the holding container
     */
    initPipesInHoldingBoxes(){
      let pipesWithLeftConnectors = [];

      this.pipesInHoldingBoxes = [];

      // one of the first pipes needs to have a left connecting part so that it can connect to the pipe in the first column
      this.pipes.forEach(pipe =>{
        if( _.includes(pipe.connectors, 'left')) pipesWithLeftConnectors.push(pipe);
      })

      // get the rest of the pipes for the holding containers
      var leftPipe = [_.sample(pipesWithLeftConnectors)];
      this.pipesInHoldingBoxes = leftPipe.concat(_.sampleSize(_.difference(this.pipes, leftPipe), 2));
  }

    /**
     * allow droping the pipes in the game squares
     * @param ev 
     */
  allowDrop(ev) {
    ev.preventDefault();
  }

    /**
     * allow dragging the pipes
     */
  drag(num) {
  
    // save a referenec to the holding container cell that the dragged pipe is beign dragged from
    this.draggedNum = num;
  }
  
  /**
     * allow dropping the pipes in the game squares
     * @param ev 
     */
  onDrop(ev, column, row) {
    
    // pipes can't be dropped on rock tiles
    if(this.gameBoard[column][row].rock && this.gameBoard[column][row].rock.style.visibility == 'visible') return;

    // pipes can't be dropped if there is already water in the pipe on that square 
    if(this.gameBoard[column][row].water[0].style.visibility == 'visible') return;

    // allow the pipes to be dropped on the game board 
    ev.preventDefault();

    // reset the pipe fittings if their is already a pipe on the tile
    if(this.gameBoard[column][row].connectors.length > 0) this.resetPipeFittings(column, row);
    // change the under and outer pipe of the tile 
    this.gameBoard[column][row].underPipe.src = this.pipesInHoldingBoxes[this.draggedNum].underImg;
    this.gameBoard[column][row].outerPipe.src = this.pipesInHoldingBoxes[this.draggedNum].outerImg;

    // change the pipe to visible
    this.renderer.setElementStyle(this.gameBoard[column][row].underPipe, 'visibility', 'visible');
    this.renderer.setElementStyle(this.gameBoard[column][row].outerPipe, 'visibility', 'visible');

    // add the connectors to the corresponding location in the gamebord so they can be used later
    this.gameBoard[column][row].connectors = this.pipesInHoldingBoxes[this.draggedNum].connectors;
    this.gameBoard[column][row].pipeRotation = this.pipesInHoldingBoxes[this.draggedNum].pipeRotation;
    this.gameBoard[column][row].fittingsClasses = this.pipesInHoldingBoxes[this.draggedNum].fittingsClasses;
    
    // get a new pipe for the container
    this.pipesInHoldingBoxes[this.draggedNum] = _.sample(_.difference(this.pipes, this.pipesInHoldingBoxes));

    // remove the tile highlight color
    this.renderer.setElementStyle(this.gameBoard[column][row].element, 'background-color', '');

    // set the pipe fittings for the placed pipe
    this.setPipeFittings(column, row)
  }

  /**
   * when a pipe is replaced by another pipe, remove the pipe fittings of the original pipe
   * @param column 
   * @param row 
   */
  resetPipeFittings(column, row){

    // remove the class of the pipe fitting
    for(let i = 0; i < this.gameBoard[column][row].fittings.length; i++){
      this.renderer.setElementClass(this.gameBoard[column][row].fittings[i], this.gameBoard[column][row].fittingsClasses[i], false);
      this.renderer.setElementClass(this.gameBoard[column][row].fittings[i], this.defaultPipeFittingClass, true);
    }

    // reset the pipe fittings of the adjecent pipes
    this.gameBoard[column][row].connectors.forEach(connector => {
      switch (connector) {
        case 'up':
          if(row == 0 || this.gameBoard[column][row -1].connectors.length == 0 || !_.find(this.gameBoard[column][row - 1].fittings, function(fitting){ return fitting.className.includes('pipeFittingDown')})) return;
          var i = _.findIndex(this.gameBoard[column][row - 1].fittings, function(fitting: any){ return fitting.className.includes('pipeFittingDown')});
          this.resetPipeFitting(i, column, row - 1);
          break;
        case 'down':
          if(row == this.gameTableRows.length - 1 || this.gameBoard[column][row + 1].connectors.length == 0 || !_.find(this.gameBoard[column][row + 1].fittings, function(fitting){ return fitting.className.includes('pipeFittingUp')})) return;
          var i = _.findIndex(this.gameBoard[column][row + 1].fittings, function(fitting: any){ return fitting.className.includes('pipeFittingUp')});
          this.resetPipeFitting(i, column, row + 1);
          break;
        case 'left':
          if(column == 2 ||this.gameBoard[column - 1][row].connectors.length == 0 || !_.find(this.gameBoard[column - 1][row].fittings, function(fitting){ return fitting.className.includes('pipeFittingRight')})) return;
          var i = _.findIndex(this.gameBoard[column - 1][row].fittings, function(fitting: any){ return fitting.className.includes('pipeFittingRight')});
          this.resetPipeFitting(i, column - 1, row);
          break;
        case 'right':
          if(column == this.endColumn - 1 || this.gameBoard[column + 1][row].connectors.length == 0 || !_.find(this.gameBoard[column  + 1][row].fittings, function(fitting){ return fitting.className.includes('pipeFittingLeft')})) return;
          var i = _.findIndex(this.gameBoard[column  + 1][row].fittings, function(fitting: any){ return fitting.className.includes('pipeFittingLeft')})
          this.resetPipeFitting(i, column + 1, row);
          break;
      }
    })
  }

  /**
   *remove a pipe fitting on a pipe
   */
  resetPipeFitting( i, column, row ){
      this.renderer.setElementClass(this.gameBoard[column][row].fittings[i], this.gameBoard[column][row].fittingsClasses[i], false);
      this.renderer.setElementClass(this.gameBoard[column][row].fittings[i], this.defaultPipeFittingClass, true);
  }
  
  /**
   * set the pipe fittings for a pipe
   * @param column 
   * @param row 
   */
  setPipeFittings(column, row){
    for(let i = 0; i < this.gameBoard[column][row].connectors.length; i++){
      var connector =  this.gameBoard[column][row].connectors[i];
      
      var waterIndex = i;
  
      switch (connector) {
        case 'up':
          if(row == 0 || this.gameBoard[column][row -1].connectors.length == 0 || !_.includes(this.gameBoard[column][row - 1].connectors, 'down')) break;
          this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.defaultPipeFittingClass, false);
          this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.gameBoard[column][row].fittingsClasses[waterIndex], true);
          break;
        case 'down':
          if(row == this.gameTableRows.length - 1 || this.gameBoard[column][row + 1].connectors.length == 0 || !_.includes(this.gameBoard[column][row + 1].connectors, 'up')) break;
          this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.defaultPipeFittingClass, false);
          this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.gameBoard[column][row].fittingsClasses[waterIndex], true);
          break;
        case 'left':
          if(column == 2){
            if(this.gameBoard[column - 1][row].underPipe.style.visibility == 'visible') {
              this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.defaultPipeFittingClass, false);
              this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.gameBoard[column][row].fittingsClasses[waterIndex], true);
            }
            return;
          } 
          if(this.gameBoard[column - 1][row].connectors.length == 0 || !_.includes(this.gameBoard[column - 1][row].connectors, 'right')) break;
          this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.defaultPipeFittingClass, false);
          this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.gameBoard[column][row].fittingsClasses[waterIndex], true);
          break;
        case 'right':
          if((column == this.endColumn - 1 && this.gameBoard[column + 1][row].underPipe.style.visibility == 'visible') || this.gameBoard[column + 1][row].connectors.length > 0 && _.includes(this.gameBoard[column + 1][row].connectors, 'left')){
            this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.defaultPipeFittingClass, false);
            this.renderer.setElementClass(this.gameBoard[column][row].fittings[waterIndex], this.gameBoard[column][row].fittingsClasses[waterIndex], true);
          } 
          break;
      }
    }
  }

  /**
   * start the water animation
   */
  startWater(){
  
    // make the water visible
    this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'visibility', 'visible');

    // start the water animation
    this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockRightHalfFirst', true);
    this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockRightHalfFirst'

    // set the length of the animation
    this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], '-webkit-animation-duration', this.defaultWaterSpeed + 's');
    this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'animation-duration', this.defaultWaterSpeed + 's');

    // if the level is 5 or higher, use the acid color for the water
    if(this.level > 4) this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'background-color', this.acidColor);
    
    this.waterPipes.push(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row]);
  }

  /**
   * configure the timing and color of the water animation
   * @param water 
   * @param animationLength 
   */
  setWaterAnimation(water, animationLength){

    // if the level is 5 or higher, use the acid color for the water
    if(this.level > 4) this.renderer.setElementStyle(water, 'background-color', this.acidColor);
    
    // make the water visible
    this.renderer.setElementStyle(water, 'visibility', 'visible');
    
    // set the water speed
    var waterSpeedModified = this.levelWaterSpeed;
    if (animationLength == 'firstHalf') waterSpeedModified = this.levelWaterSpeed * (2/3);
    if (animationLength == 'secondHalf') waterSpeedModified = this.levelWaterSpeed * (1/3)
    this.renderer.setElementStyle(water, '-webkit-animation-duration', waterSpeedModified + 's');
    this.renderer.setElementStyle(water, 'animation-duration', waterSpeedModified + 's');
  }

  /**
   * after the water animation in one pipe ends figure out wich pipe the water should move through next
   */
  getNextWaterPipe(){

    // ... if the water is entering the second half of a corner pipe
    if(this.nextWaterDirection){
      this.waterDirection = this.nextWaterDirection;
      this.nextWaterDirection = '';
      switch (this.waterDirection) {
        case 'up':
          this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], 'waterBlockUpHalf', true);
          this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].waterClass = 'waterBlockUpHalf';
        break;
        case 'down':
          this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], 'waterBlockDownHalf', true);
          this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].waterClass = 'waterBlockDownHalf';
        break;
        case 'left':
          this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], 'waterBlockLeftHalf', true);
          this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].waterClass = 'waterBlockLeftHalf';
        break;
        case 'right':
          this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], 'waterBlockRightHalf', true);
          this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].waterClass = 'waterBlockRightHalf';
          
        break;
      }
      this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], 'secondHalf');
    }
    // if the water is entering a new pipe, the game is lost if there is no connecting pipe where the water should go
    else {
      switch (this.waterDirection) {
          case 'up':
           if(this.waterPipeLocation.row -1 < 0 || this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row - 1].connectors.length < 1 || !_.includes(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row - 1].connectors, 'down')){
            this.renderer.setElementClass(this.waterSpill, 'waterSpillUp', true);
            this.waterSpill.spillClass = 'waterSpillUp';
            this.loseGame();
            return;
           }
           this.waterPipeLocation.row -= 1;
          if(_.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['down'])[0] == 'up'){
            this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'DownUp';
            this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockUpfull', true);
            this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockUpfull';
            this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'full');
           }
            else{
              this.nextWaterDirection = _.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['down'])[0];
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection ='Down' + this.nextWaterDirection.charAt(0).toUpperCase() + this.nextWaterDirection.slice(1);
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockUpHalfBottom', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockUpHalfBottom';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'firstHalf');
            } 
          break;
          case 'down':
            if(this.waterPipeLocation.row + 1 == this.gameTableRows.length || this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row + 1].connectors.length < 1 || !_.includes(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row + 1].connectors, 'up')){
              this.renderer.setElementClass(this.waterSpill, 'waterSpillDown', true);
              this.waterSpill.spillClass = 'waterSpillDown';
              this.loseGame();
              return;
            }
            this.waterPipeLocation.row += 1;
            if(_.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['up'])[0] == 'down'){
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'UpDown';
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockDownFull', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockDownFull';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'full');
            }
            else{
              this.nextWaterDirection = _.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['up'])[0];
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'Up' + this.nextWaterDirection.charAt(0).toUpperCase() + this.nextWaterDirection.slice(1);
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockDownHalfTop', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockDownHalfTop';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'firstHalf');
            }
            break;
          case 'left':
            if(this.waterPipeLocation.column  - 1 < 1 || this.gameBoard[this.waterPipeLocation.column - 1][this.waterPipeLocation.row].connectors.length < 1 || !_.includes(this.gameBoard[this.waterPipeLocation.column - 1][this.waterPipeLocation.row].connectors, 'right')){
              this.renderer.setElementClass(this.waterSpill, 'waterSpillLeft', true);
              this.waterSpill.spillClass = 'waterSpillLeft';
              this.loseGame();
              return;
            }
            this.waterPipeLocation.column -= 1;
            if(_.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['right'])[0] == 'left'){
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'RightLeft';
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockLeftFull', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockLeftFull';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'full');
            }
            else{
              this.nextWaterDirection = _.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['right'])[0];
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'Right' + this.nextWaterDirection.charAt(0).toUpperCase() + this.nextWaterDirection.slice(1);
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockLeftHalfRight', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockLeftHalfRight';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'firstHalf');
            }
          break;
          case 'right':
            this.waterPipeLocation.column += 1;
            if(this.waterPipeLocation.column == this.gameTableData.length + 3){
              if(this.checkForWin()){
                this.winLevel()
              }
              else {
                this.waterPipeLocation.column -=2;
                
                this.renderer.setElementClass(this.waterSpill, 'waterSpillRight', true);
                this.waterSpill.spillClass = 'waterSpillRight';
                this.loseGame();
              }
              return;
            }
            if(
                (this.waterPipeLocation.column < this.gameTableData.length + 2 && (this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors.length < 1 || !_.includes(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, 'left'))) ||
                (this.waterPipeLocation.column == this.gameTableData.length + 2 && this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].outerPipe.style.visibility != 'visible' )
              ){
                this.waterPipeLocation.column -= 1;
                if(this.waterPipeLocation.column == 1){
                  this.renderer.setElementClass(this.waterSpill, 'waterSpillRightFirst', true)
                  this.waterSpill.spillClass = 'waterSpillRightFirst';
                }
                else{
                  this.renderer.setElementClass(this.waterSpill, 'waterSpillRight', true); 
                  this.waterSpill.spillClass = 'waterSpillRight';
                }
                this.loseGame();
                return;
            }
            if(this.waterPipeLocation.column == this.gameTableData.length + 2){
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockRightHalfLast', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockRightHalfLast';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'last');
            }
            else if(_.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['left'])[0] == 'right'){
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockRightfull', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockRightfull';
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'LeftRight';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'full');
            }
            else{
              this.nextWaterDirection = _.difference(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].connectors, ['left'])[0];
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].waterDirection = 'Left' + this.nextWaterDirection.charAt(0).toUpperCase() + this.nextWaterDirection.slice(1);
              this.renderer.setElementClass(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'waterBlockRightHalfLeft', true);
              this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0].waterClass = 'waterBlockRightHalfLeft';
              this.setWaterAnimation(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'firstHalf');
            }
          break;
        }
      this.waterPipes.push(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row]);

      // create new bubbles and move existing bubbles
      if(this.waterPipes.length > 2 && this.waterPipeLocation.column < this.endColumn + 1) this.moveBubbles();
      if(this.waterPipes.length % 2 == 0) this.newBubble();
     }
  }

  /**
   * create a new bubbles in the water
   */
  newBubble(){
    this.waterPipes[0].specialEffect.src = _.sample(this.bubbles);
    this.renderer.setElementClass(this.waterPipes[0].specialEffect, 'bubblesStart', true);
    this.renderer.setElementStyle(this.waterPipes[0].specialEffect, 'visibility', 'visible');
    this.renderer.setElementStyle(this.waterPipes[0].specialEffect, '-webkit-animation-duration', this.levelWaterSpeed + 's');
    this.renderer.setElementStyle(this.waterPipes[0].specialEffect, 'animation-duration', this.levelWaterSpeed + 's');
  }

  /**
   * move bubbles to the next water pipe
   */
  moveBubbles(){
    for(let i = this.waterPipes.length - 1; i > 0; i--){
      if(this.waterPipes[i - 1].specialEffect.style.visibility == 'visible'){
        this.renderer.setElementStyle(this.waterPipes[i - 1].specialEffect, 'visibility', 'hidden');
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, 'visibility', 'visible');
        this.waterPipes[i].specialEffect.src = this.waterPipes[i - 1].specialEffect.src;
        this.renderer.setElementClass(this.waterPipes[i - 1].specialEffect, 'bubbles' + ((i - 1) == 0 ? 'Start': this.waterPipes[i -1].waterDirection), false);
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, '-webkit-animation-duration', this.levelWaterSpeed + 's');
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, 'animation-duration', this.levelWaterSpeed + 's');
        this.renderer.setElementClass(this.waterPipes[i].specialEffect, 'bubbles' + this.waterPipes[i].waterDirection, true);
      }
    }
  }

/**
 * reset the gameboard
 */
  reset(){
  
    // set the spill img to the water spill img
    this.spillImg = this.waterSpillImg;
      
    // clear the definitions
    for(var i = 0; i < this.finishBoxes.length; ++i){
      this.finishBoxes[i].children[0].textContent = '';
    }

    // clear the word
    for(var i = 0; i < this.startBoxes.length; ++i){
      this.startBoxes[i].children[0].textContent = '';
    }

    // clear the pipes
    for(let i = 1; i< this.gameBoard.length; i++){
      for(let k = 0; k < this.gameBoard[i].length; k++){

        this.gameBoard[i][k].specialEffect.src = '';
        this.gameBoard[i][k].connectors = [];
        _.unset(this.gameBoard[i][k], 'pipeRotation'); 
        this.gameBoard[i][k].water.forEach(wat => {
          this.renderer.setElementClass(wat, wat.waterClass, false)
          this.renderer.setElementStyle(wat, 'visibility', 'hidden');
          _.unset(wat, 'waterClass');
          
        });

        // reset the bubbles classes
        if(this.gameBoard[i][k].waterDirection) {
          this.renderer.setElementClass(this.gameBoard[i][k].specialEffect, 'bubbles' + this.gameBoard[i][k].waterDirection, false);
          this.gameBoard[i][k].waterDirection = '';
        }

        // reset the pipe fittings
        if(this.gameBoard[i][k].fittingsClasses){
          this.resetPipeFittings(i, k);
          _.unset(this.gameBoard[i][k], 'fittingsClasses')
        }
      }
    }

    // reset the rocks
    for(let i = 0; i < this.rockSquares.length; i++){
      if(this.rockSquares[i].src){
        this.rockSquares[i].src = '';
        this.renderer.setElementStyle(this.rockSquares[i], 'visibility', 'hidden');
      }
    }

    // reset the underpipes
    for(var i = 0; i < document.body.getElementsByClassName('underPipe').length; ++i){
      this.renderer.setElementStyle(document.body.getElementsByClassName('underPipe')[i], 'visibility', 'hidden');
    }

    // reset the outer pipes
    for(var i = 0; i < document.body.getElementsByClassName('outerPipe').length; ++i){
      this.renderer.setElementStyle(document.body.getElementsByClassName('outerPipe')[i], 'visibility', 'hidden');
    }
      
    // get new pipes for the container
    this.initPipesInHoldingBoxes();

    // reset the class of the first bubbles
    this.renderer.setElementClass(this.waterPipes[0].specialEffect, 'bubblesStart', false);

    this.waterPipes[0]

    this.waterPipes = [];
    this.waterPipeLocation = {row: 0, column: 1};
    this.levelWaterSpeed = this.defaultWaterSpeed - this.level;
    this.waterDirection = 'right';
    this.nextWaterDirection = '';

    // reset the water spill class
    this.renderer.setElementClass(this.waterSpill, 'waterSpill', true);
    this.renderer.setElementClass(this.waterSpill, this.waterSpill.spillClass, false);
    
    // reload the game board
    this.loadGameboard();

    // start countdown to play again
    this.gameController.startCountdown();
  }

  /**
   *  when a pipe is being dragged over a tile, hightlight the tile
   * @param event 
   * @param column 
   * @param row 
   */
  highlightGameboardTile(event, column, row){
    if((this.gameBoard[column][row].rock && this.gameBoard[column][row].rock.style.visibility == 'visible') || _.find(this.gameBoard[column][row].water, function(water){ return water.style.visibility == 'visible'})) return;
      this.renderer.setElementStyle(this.gameBoard[column][row].element, 'background-color', 'purple');
  }

  /**
   * when a pipe is being dragged off a tile, unhighlight the tile
   * @param event 
   * @param column 
   * @param row 
   */
  unhighlightGameBoardTile(event, column, row){
      this.renderer.setElementStyle(this.gameBoard[column][row].element, 'background-color', '');
  }

  /**
   * shake the recycle bin when a pipe is hovering over it
   * @param event 
   */
  shakeRecycle(event){
    if(this.recycleIsAnimating) return; 
    this.shakeState = 'left';
    this.hoveringOnRecycle = true;
    this.recycleIsAnimating = true;
  }

  /**
   * reset the recycle bin to its normal position once the pipe is recycled or moved off the trash bin.
   * @param event 
   */
  doneWithShake(event){
    if(this.shakeState == 'normal' && !this.hoveringOnRecycle){
      this.recycleIsAnimating = false;
      return;
    }
    if(this.shakeState != 'normal'){
      this.lastShakeState = this.shakeState; 
      this.shakeState = 'normal';
      return;
    }
    if(this.hoveringOnRecycle){
      this.lastShakeState == 'left' ? this.shakeState = 'right' : this.shakeState = 'left'; 
    }
  }

  // remove the pipe that was placed in the recycle bin
  recyclePipe(event){
    this.hoveringOnRecycle = false;

    // get a new pipe for the container
    this.pipesInHoldingBoxes[this.draggedNum] = _.sample(_.difference(this.pipes, this.pipesInHoldingBoxes));
  }

  /**
   * stop shaking the recycle bin when the player rem
   */
  stopShaking(){
    this.hoveringOnRecycle = false;
  }

/**
 * lose game 
 */
  loseGame(){
    
    // reset the level
    this.level = 0;

    // hide the bubbles in the pipes because they look awkward sitting in the pipes
    this.hideBubbles();

    // set the water spill animation
    this.spillState = 'spilled';
    this.renderer.setElementStyle(this.waterSpill, 'visibility', 'visible');
    this.renderer.setElementClass(this.waterSpill, 'waterSpill', false);
    this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].element.appendChild(this.waterSpill);

    // open the lose game dialog
    this.gameController.openLoseGameDialog(this.score, (this.gameType == 'vocab' ? this.activeProblem.word + ': ' + this.activeProblem.definition : this.activeProblem.problem + ' = ' + this.activeProblem.solution));
    this.gameController.updateCoins(this.score);
    
    // reset the score
    this.score = 0;
  }

  /**
   * hide the bubbles on the gameboard after the game is lost 
   */
  hideBubbles(){
     for(let i = 0; i< this.waterPipes.length; i++){
      this.renderer.setElementClass(this.waterPipes[i].specialEffect, 'bubbles' + this.waterPipes[i].waterDirection, false);
      this.renderer.setElementStyle(this.waterPipes[i].specialEffect, 'visibility', 'hidden');
    }
  }

  /**
   * check if the water is in the correct end pipe
   */
  checkForWin(){
    if(this.gameBoard[this.waterPipeLocation.column - 1][this.waterPipeLocation.row].element.children[1].textContent.trim() == (this.gameType == 'vocab' ? this.activeProblem.definition : this.activeProblem.solution)){
      return true;
    }
    return false;
  }

/**
 * the level is won
 */
  winLevel(){
    this.level++;
    this.score += 50;
    if(this.level > 8) this.level = 8;
    this.hideBubbles();
    this.reset();
  }

/**
 * speed up the water when the player presses the fast forward button
 */
  speedUpWater() {
    this.levelWaterSpeed /= 5;
    if(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1] && this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].style.visibility == 'visible') {
      this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], '-webkit-animation-duration', '0s');
      this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1], 'animation-duration', '0s');
    }
    else {
      this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], '-webkit-animation-duration', '0s');
      this.renderer.setElementStyle(this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0], 'animation-duration', '0s');
    }
   }

  /**
   * start the water when the countdown is done
   */
  countdownDone() {
    this.startWater();
  }

  /**
   * reset the game board if the player chooses to play the game again after losing
   */
  playAgain(){
    this.level = 0;
    this.score = 0;
    this.spillState = 'normal';
    this.renderer.setElementStyle(this.waterSpill, 'visibility', 'hidden');
    this.reset();
    this.gameBoard[0][0].element.appendChild(this.waterSpill);
  }

  /**
   * pause the game when the grade sidenav is opened
   */
  pauseGame() {
    var waterPipe = this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1] && this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].style.visibility == 'visible' ? this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1] : this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0];
    this.renderer.setElementStyle(waterPipe, '-webkit-animation-play-state', 'paused');
    this.renderer.setElementStyle(waterPipe, 'animation-play-state', 'paused');

    // pause the bubbles
     for(let i = 0; i <  this.waterPipes.length; i++){
      if(this.waterPipes[i].specialEffect.style.visibility == 'visible'){
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, '-webkit-animation-play-state', 'paused');
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, 'animation-play-state', 'paused');
      }
    }
  }
  
  /**
   * unpause the game when the grade sidenav is closed
   */
  playGame(){
    var waterPipe = this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1] && this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1].style.visibility == 'visible' ? this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[1] : this.gameBoard[this.waterPipeLocation.column][this.waterPipeLocation.row].water[0];
    this.renderer.setElementStyle(waterPipe, '-webkit-animation-play-state', 'running');
    this.renderer.setElementStyle(waterPipe, 'animation-play-state', 'running');

     // pause the bubbles
     for(let i = 0; i <  this.waterPipes.length; i++){
      if(this.waterPipes[i].specialEffect.style.visibility == 'visible'){
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, '-webkit-animation-play-state', 'running');
        this.renderer.setElementStyle(this.waterPipes[i].specialEffect, 'animation-play-state', 'running');
      }
    }
  }

  /**
   * reset the game when a new grade level is chosen
   * @param problems 
   */
  changeGradeLevel(problems){
    this.hideBubbles();
    this.problemsFull = problems;
    this.reset();
  }
}
