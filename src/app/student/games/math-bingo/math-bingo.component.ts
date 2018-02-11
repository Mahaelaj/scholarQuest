import { Component, AfterViewInit, Renderer, ViewChild, OnDestroy } from '@angular/core';
import * as _ from 'lodash'

import { ApiService } from '../../../shared/utils/api.service';
import { GameComponent } from '../game/game/game.component';

import * as Phaser from 'phaser-ce';

@Component({
    selector: 'sq-math-bingo',
    templateUrl: './math-bingo.component.html',
    styleUrls: ['./math-bingo.component.css'],
})
export class MathBingoComponent implements AfterViewInit, OnDestroy {

    @ViewChild('game') gameController: GameComponent;

    equations = [];
    scoreText;
    score = 0;
    currEquation;
    secondsPerProblem = 20;
    totEquations = [];
    game: any;
    background;
    moonCards = [];
    problemText;
    twinkleElems = [];
    swirls = [];
    timeLeft = 0;
    timerText;
    timer;
    gameBoard = [];
    twinkleTimer;
    centerSwirl;
    endGameDialog = { dialogBackground: null, dialogText: null, playAgainButton: null, buttonText: null };
    buttonTexts = [];
    canSelectTile = false;
    audio;
    backgroundMusic;

    constructor(public renderer: Renderer, public apiService: ApiService) {}

    /**
     * game cleanup
     */
    ngOnDestroy() {
        this.game.destroy();
    }

    /**
    * start the game
    */
    ngAfterViewInit() {
        this.game = new Phaser.Game(1355, 750, Phaser.AUTO, document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this), update: this.update.bind(this)});
    }

    preload() {        
        this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading/loading_spritesheet.png', 1355, 761, 8);
        this.game.load.spritesheet('loading_start', '../../../assets/games/loading/start.png', 1355, 761, 8);
    }

    create() {
        
        // prevent the game from pausing when the game is not in focus
        this.game.stage.disableVisibilityChange = true;

        // display the loading background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        const load = this.background.animations.add('load');
        load.play(4, true);

        // after the assets load, display things
        this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);

        // get the math problems
        this.gameController.getMath().subscribe(
            data => {
                console.log(data);
                if (data.error) return this.gameController.openErrorMessage();
                this.totEquations = data.math;
                this.loadAssets();
            },
            error => {
                this.gameController.openErrorMessage();
            }
        )
    }

    async loadAssets(){
        await this.game.load.image('bingo_card', '../../../assets/games/mathBingo/bingoCard.png');
        await this.game.load.image('background', '../../../assets/games/mathBingo/background.jpg');
        await this.game.load.image('crystal_ball_back', '../../../assets/games/mathBingo/crystalBallBack.png');
        await this.game.load.image('crystal_ball_front', '../../../assets/games/mathBingo/crystalBallFront.png');
        await this.game.load.image('crystal_ball_stand', '../../../assets/games/mathBingo/crystalBallStand.png');
        await this.game.load.image('dialog_background', '../../../assets/games/mathBingo/dialogBackground.png');
        await this.game.load.image('swirl', '../../../assets/games/mathBingo/swirlWhite.png');
        await this.game.load.image('bingoCardCell', '../../../assets/games/mathBingo/bingoCardCell.png');
        await this.game.load.image('gold_button', '../../../assets/games/mathBingo/goldButton.jpg');
        await this.game.load.image('moonCard1', '../../../assets/games/mathBingo/moonCards/moonCard1.png');
        await this.game.load.image('moonCard2', '../../../assets/games/mathBingo/moonCards/moonCard2.png');
        await this.game.load.image('moonCard3', '../../../assets/games/mathBingo/moonCards/moonCard3.png');
        await this.game.load.image('moonCard4', '../../../assets/games/mathBingo/moonCards/moonCard4.png');
        await this.game.load.image('moonCard5', '../../../assets/games/mathBingo/moonCards/moonCard5.png');
        await this.game.load.image('moonCard6', '../../../assets/games/mathBingo/moonCards/moonCard6.png');
        await this.game.load.image('moonCard7', '../../../assets/games/mathBingo/moonCards/moonCard7.png');
        await this.game.load.image('moonCard8', '../../../assets/games/mathBingo/moonCards/moonCard8.png');
        await this.game.load.image('moonCard9', '../../../assets/games/mathBingo/moonCards/moonCard9.png');
        await this.game.load.image('moonCard10', '../../../assets/games/mathBingo/moonCards/moonCard10.png');
        await this.game.load.image('moonCard11', '../../../assets/games/mathBingo/moonCards/moonCard11.png');
        await this.game.load.image('moonCard12', '../../../assets/games/mathBingo/moonCards/moonCard12.png');
        await this.game.load.image('moonCard13', '../../../assets/games/mathBingo/moonCards/moonCard13.png');
        await this.game.load.image('moonCard14', '../../../assets/games/mathBingo/moonCards/moonCard14.png');
        await this.game.load.image('moonCard15', '../../../assets/games/mathBingo/moonCards/moonCard15.png');
        await this.game.load.image('moonCard16', '../../../assets/games/mathBingo/moonCards/moonCard16.png');

        await this.game.load.audio('card_reveal', '../../../assets/games/mathBingo/audio/card_reveal.ogg');
        await this.game.load.audio('background_music', '../../../assets/games/mathBingo/audio/background.ogg');
        await this.game.load.audio('select_correct', '../../../assets/games/mathBingo/audio/select_correct.ogg');
        await this.game.load.audio('select_incorrect', '../../../assets/games/mathBingo/audio/select_incorrect.ogg');
        this.game.load.start();
    };

    /**
     * add the start button
     */
    onAssetsLoaded() {
        const button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'loading_start', this.initGame, this);
        button.anchor.setTo(.5, .5);
        button.alpha = 0;
        this.game.add.tween(button).to( { alpha: 1 }, 2000, 'Linear', true);
    }

    initGame() {
        this.audio = {
            card_reveal: this.game.add.audio('card_reveal'),
            background: this.game.add.audio('background_music'),
            select_correct: this.game.add.audio('select_correct'),
            select_incorrect: this.game.add.audio('select_incorrect')
        }
        
        // get 24 solutions for the gameboard
        this.equations = _.sampleSize(this.totEquations, 24);
        
        // add the background
        this.background.destroy();
        this.game.add.image(0, 0, 'background');

        // add the swirl to the fress space of the bing card
        this.centerSwirl = this.game.add.sprite(918.4, this.game.world.centerY, 'swirl');
        this.centerSwirl.scale.setTo(.17, .17);
        this.centerSwirl.anchor.setTo(.5, .5);
        this.centerSwirl.tint = 0x5000bd;

        // get a reference to the swirl so it can be rotated
        this.swirls.push(this.centerSwirl);
        
        // set up the bing card
        for(let k = 0; k < 5; k++) {
            const y = 45 + (k * 133.7)
            this.gameBoard.push([{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }]);
            for(let i = 0; i < 5; i++) {
                const x = 588 + (i  * 133.5);
            
                if(k * 5 + i != 12) {
                    const equationIndex = k * 5 + i > 12 ? k * 5 + i - 1 : k * 5 + i;
                    let buttonText;
                    const button = this.game.add.button(x, y, 'bingoCardCell', function() { this.tileSelected(buttonText, { col: i, row: k }) }, this);
                    const style = { font: "32px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: button.width, align: "center", stroke: '#1f7eff', strokeThickness: 3 };
                    buttonText = this.game.add.text(x + button.width / 2, y + button.height / 2, this.equations[equationIndex].solution, style);
                    buttonText.tint = 0x2080ff;
                    buttonText.anchor.set(0.5);
                    buttonText.index = k * 5 + i
                    this.buttonTexts.push(buttonText);
                    this.twinkleElems.push(buttonText);
                }

                // add moon cards 
                const moonCard = 'moonCard' + ((k * 5 + i + 1) > 16 ? (k * 5 + i + 1) - 16 : (k * 5 + i + 1));
                const moonCardSprite = this.game.add.image(x, y, moonCard);
                moonCardSprite.scale.setTo(.25, .25);
                this.moonCards.push(moonCardSprite);
            }
        }

        // set the fress space
        this.gameBoard[2][2].selected = true;
        this.gameBoard[2][2].swirl = this.centerSwirl;
        
        // add the bingo card
        const bingoCard = this.game.add.image(this.game.world.width - 100, this.game.world.centerY, 'bingo_card');
        bingoCard.scale.setTo(.33, .33);
        bingoCard.anchor.setTo(1, .5);

        // add the crystal ball
        const crystalBallBack = this.game.add.image(125, this.game.world.centerY - 60, 'crystal_ball_back');
        crystalBallBack.scale.setTo(.17, .17);
        crystalBallBack.anchor.setTo(0, .5);

        // add the text to the crystal ball
        this.problemText = this.game.add.text(crystalBallBack.x + (crystalBallBack.width / 2), crystalBallBack.y, '', { font: "32px Arial" });
        this.problemText.anchor.setTo(.5, .5);

        // add the front of the crystal ball
        const crystalBallFront = this.game.add.image(125, this.game.world.centerY - 60, 'crystal_ball_front');
        crystalBallFront.scale.setTo(.17, .17);
        crystalBallFront.anchor.setTo(0, .5);

        // add the crystal ball stand
        const crystalBallStand = this.game.add.image(40, this.game.world.centerY + 215 , 'crystal_ball_stand');
        crystalBallStand.scale.setTo(.17, .17);
        crystalBallStand.anchor.setTo(0, .5);

        // add the score and timer texts
        const style = { font: "50px Arial", fill: "#884dd9", stroke: '#5000bd', strokeThickness: 5 };
        this.scoreText = this.game.add.text(50, 25, "Score: 0", style);
        this.timerText = this.game.add.text(325, 25, "Time: 0", style);

        // fade the mooncards on the gameboard to expose the solutions
        this.fadeMooncards();

        // make the solutions twinkle
        this.startTwinkleTint();

        // set the current equation
        this.setCurrentEquation(6000);

        // start the background music
        this.game.time.events.add(7000, this.startBackgroundMusic, this);
    }

    /**
     * make the solutions twinkle
     */
    startTwinkleTint() {
        
        this.twinkleTimer = this.game.time.create(false);

        this.twinkleTimer.loop(1000, this.twinkleTint, this);

        this.twinkleTimer.start();
    }

    /**
     * fade the mooncards at the start of the game
     */
    fadeMooncards() {

        // play the card reveal sound 
        this.audio.card_reveal.play();

        // fade out the mooncards
        for (let i = this.moonCards.length - 1; i >= 0; i--) {
            const delayTime = (this.moonCards.length - 1 - i) / 5 * 1000
            this.game.add.tween(this.moonCards[i]).to( { alpha: 0 }, 2000, 'Linear', true, delayTime);
        }
    }

    /**
     * start timer for 20 seconds to solve the current problem
     */
    startTimer() {
        this.canSelectTile = true;

        this.timeLeft = this.secondsPerProblem;
        this.updateTimerText();

        if (this.timer) this.timer.destroy();
        this.timer = this.game.time.create(false);
        this.timeLeft = 20;

        // Set a TimerEvent to occur after 1 seconds
        this.timer.loop(1000, this.decrementTimer, this);

        // Start the timer running - this is important!
        // It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    }

    /**
     * decrement timer
     */
    decrementTimer() {
        this.timeLeft --;
        if (this.timeLeft >= 0) {

            // update the timer text
            this.updateTimerText();
            return; 
        }
        this.timer.destroy();
        
        // lose three points if the timer runs out and updatde the current problem 
        this.updateScore(-3);
        this.updateProblem();
    }

    /**
     * fade out the current problem and get a new problem
     */
    updateProblem() {
        const tween = this.game.add.tween(this.problemText).to( { alpha: 0 }, 1000, 'Linear', true);
        tween.onComplete.add(this.setCurrentEquation, this);
    }

    /**
     * update the score and score text 
     */
    updateScore(points) {
        this.score += points;
        if (this.score < 0) this.score = 0;
        this.scoreText.setText('Score: ' + this.score);
    }
    
    /**
     * update the time text
     */
    updateTimerText() {
        this.timerText.setText('Time: ' + this.timeLeft);
    }

    /**
     * make a solution fade from blue to white to blue
     */
    twinkleTint() {
        if (!this.twinkleElems.length) return;
        const twinkleElem = this.twinkleElems.splice(_.random(0, this.twinkleElems.length - 1), 1)[0];
        this.tweenTint(twinkleElem, 0x2080ff, 0xffffff, 2000, 0, () => {
            this.tweenTint(twinkleElem, 0xffffff, 0x2080ff, 2000, 0, () => {
                this.twinkleElems.push(twinkleElem);
            })
        });
    }

    /**
     * interpolate the color on an object
     */
    tweenTint(obj, startColor, endColor, time = 250, delay = 0, callback = null) {

        // create a step object
        let colorBlend = {
            step: 0
        };

        // create a tween to increment that step from 0 to 100.
        let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, time, Phaser.Easing.Linear.None, delay);

        // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
        colorTween.onUpdateCallback(() => {
            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
        });

        // set object to the starting colour
        obj.tint = startColor;

        // if you passed a callback, add it to the tween on complete
        if (callback) {
            colorTween.onComplete.add(callback, this);
        }

        // finally, start the tween
        colorTween.start();

        return colorTween;
    }

    /**
     * check if the tile seleected is the correct tile
     */
    tileSelected(buttonText, buttonIndex) {

        // only let tiles be selected if the timer is runnint
        if (!this.timer || !this.timer.running) return;

        // if the tile selected is the correct solution
        if (buttonText.text == this.currEquation.solution) {
            
            // play select correct audio
            this.audio.select_correct.play();
    
            // don't select tile if the countdown has started, or if it has already been selected
            if (!this.canSelectTile) return;

            // don't select the tile again
            this.canSelectTile = false;

            // stop the timer
            if (this.timer) this.timer.destroy();

            // give the user 5 points
            this.updateScore(5);

            // add a swirl to the tile to mark it
            const swirl = this.setSolutionToSwirl(buttonText);
            this.gameBoard[buttonIndex.col][buttonIndex.row].selected = true;
            this.gameBoard[buttonIndex.col][buttonIndex.row].swirl = swirl.swirl;

            // remove the equation so it is not used
            this.equations.splice(_.findIndex(this.equations, this.currEquation), 1);
         
            const selectedSwirls = this.checkForWin();
            
            // if the game is won, set the game to won, otherwise get the next problem
            if (selectedSwirls) {
                swirl.swirlTween.onComplete.add(function() { this.setWin(selectedSwirls) }, this);
            }
            else { 
                this.updateProblem();
            }
            return;
        }

        // if the tile selected is incorrect, remove three points
        this.updateScore(-3);

        // play select incorrect audio
        this.audio.select_incorrect.play();
    }

    /**
     * check to see if a bingo was won
     */
    checkForWin() {
        let winTracker = true;
        let selectedSwirls = [];
        
        // check for horizontal win
        for (let row = 0; row < this.gameBoard[0].length; row++) {
            winTracker = true;
            selectedSwirls = [];
            for (let col = 0; col < this.gameBoard.length; col++) {
                if (!this.gameBoard[col][row].selected) winTracker = false; 
                selectedSwirls.push(this.gameBoard[col][row].swirl);
            }
            if (winTracker) {
                return selectedSwirls;
            }
        }

        // check for a vertical win
        for (let col = 0; col < this.gameBoard.length; col++) {
            winTracker = true;
            selectedSwirls = [];
            for (let row = 0; row < this.gameBoard[0].length; row++) {
                if (!this.gameBoard[col][row].selected) winTracker = false; 
                selectedSwirls.push(this.gameBoard[col][row].swirl);
            }
            if (winTracker) {
                return selectedSwirls;
            }
        }

        winTracker = true;
        selectedSwirls = [];
        
        // check for downward sloping diagonal win
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (!this.gameBoard[i][i].selected) winTracker = false;
            selectedSwirls.push(this.gameBoard[i][i].swirl);
        }
        if (winTracker) {
            return selectedSwirls;
        }
        
        winTracker = true;
        selectedSwirls = [];
        
        // check for downward sloping diagonal win
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (!this.gameBoard[i][this.gameBoard.length - 1 - i].selected) winTracker = false;
            selectedSwirls.push(this.gameBoard[i][this.gameBoard.length - 1 - i].swirl);
            
        }
        if (winTracker) {
            return selectedSwirls;
        }

        return null;
    }

    /**
     * set the game to won 
     */
    setWin(selectedSwirls) {
        this.game.tweens.removeAll();
        selectedSwirls.forEach( swirl => {
            swirl.tint = 0x2ecc71;
        });
        
        // set the end game dialog, promting the uesr to play again
        this.endGameDialog.dialogBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dialog_background');
        this.endGameDialog.dialogBackground.anchor.setTo(.5, .5);
        this.endGameDialog.dialogText = this.game.add.text(this.game.width/2, this.game.height/2 - 50, `Well Done\nYou Won\n${this.score} Coins`, { 
            font: "50px Arial",
            fill: "#5000bd",
            wordWrap: true,
            wordWrapWidth: this.endGameDialog.dialogBackground.width,
            align: "center"
          });
          this.endGameDialog.dialogText.anchor.set(0.5);
          this.endGameDialog.playAgainButton = this.game.add.button(this.game.width/2, this.game.height/2 + 100, 'gold_button', this.onPlayAgainButton, this);
          this.endGameDialog.playAgainButton.anchor.set(0.5);
          this.endGameDialog.playAgainButton.scale.setTo(1.5, 1.5);
          this.endGameDialog.buttonText = this.game.add.text(this.game.width/2, this.game.height/2 + 100, 'Play Again', {
            font: "25px Arial",
            fill: "#5000bd",
            wordWrap: true,
            wordWrapWidth: this.endGameDialog.playAgainButton.width,
            align: "center"
          });
          this.endGameDialog.buttonText.anchor.set(0.5);
          this.gameController.updateCoins(this.score);
    }

    /**
     * the play again button is pressed
     */
    onPlayAgainButton() {

        // remove thte end game dialog
        this.endGameDialog.buttonText.destroy();
        this.endGameDialog.dialogBackground.destroy();
        this.endGameDialog.dialogText.destroy();
        this.endGameDialog.playAgainButton.destroy();

        // reload the game
        this.reload();
    }

    /**
     * reload the game
     */
    reload() {

        // remove the background music;
        this.fadeOutBackroundMusic();

        // stop the solutions on the bingo card from twinkling
        this.twinkleTimer.destroy();
         
        // update the score
        this.score = 0;
        this.updateScore(0);

        // remove the swirls except for the center one
        this.swirls = [];
        this.swirls.push(this.centerSwirl);
        for (let i = 0; i < this.gameBoard.length; i++) {
            for (let k = 0; k < this.gameBoard[i].length; k++) {
                if (!(i == 2 && k == 2)) {
                    this.gameBoard[i][k].selected = false;
                    if (this.gameBoard[i][k].swirl) {
                        this.gameBoard[i][k].swirl.destroy();
                        this.gameBoard[i][k].swirl = null;
                    }
                }
            }
        }

        // set the elements that can be twinkled to just the solution texts
        this.twinkleElems = _.map(this.buttonTexts);
        this.startTwinkleTint();

        // fade in the moo cards
        this.moonCards.forEach(moonCard => this.game.add.tween(moonCard).to( { alpha: 1 }, 2000, 'Linear', true, 0))

        // when the mooncards are done fadding in, set up the gameboard
        this.game.time.events.add(2000, this.setupBoard, this);
    }

    /**
     * fade out the background music
     */
    fadeOutBackroundMusic() {
        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying) return;
        this.game.add.tween(this.backgroundMusic).to( { volume: 0 }, 2000, 'Linear', true, 0);
    }

    /**
     * set up the gameboard
     */
    setupBoard() {

        // get the solutions and add them to the gameboard
        this.equations = _.sampleSize(this.totEquations, 24);
        for (let i = 0; i < this.buttonTexts.length; i++) {
            this.buttonTexts[i].scale.setTo(1);
            this.buttonTexts[i].setText(this.equations[i].solution);
        }

        // set the color of the center swirl
        this.centerSwirl.tint = 0x5000bd;

        // fad the mooncards in
        this.fadeMooncards();

        // set the current problem
        this.setCurrentEquation(6000);

        // start the background music
        this.game.time.events.add(7000, this.fadeInBackgroundMusic, this);
    }

    /**
     * start the background music
     */
    startBackgroundMusic() {
        this.backgroundMusic = this.audio.background;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.loopFull(0.5);
    }

    /**
     * fade in the background music
     */
    fadeInBackgroundMusic() {
        if (!this.backgroundMusic) return this.startBackgroundMusic();
        this.backgroundMusic.restart();
        this.backgroundMusic.loopFull(0.5);
        this.backgroundMusic.volume = 0.5;
    }

    /**
     * add a swirl to a game tile, replacing the text 
     */
    setSolutionToSwirl(buttonText) {
        
        // scale the text to a size it won't be seen
        let textTween = this.game.add.tween(buttonText.scale).to({x: .1, y: .1}, 1000, 'Linear', true);
        
        // add a swirl over the text
        const swirl = this.game.add.sprite(buttonText.x, buttonText.y, 'swirl');
        swirl.tint = 0x2080ff;
        swirl.scale.setTo(.01, .01);
        swirl.anchor.setTo(.5, .5);
        let swirlTween = this.game.add.tween(swirl.scale).to({x: .17, y: .17}, 1000, 'Linear', true);
        this.swirls.push(swirl);

        // remove the text from the twinkle element array, so it won't be twinkled
        _.remove(this.twinkleElems, elem => (elem.index == buttonText.index));

        // add the swirl to the twinkle elements
        this.twinkleElems.push(swirl);
        return { swirl: swirl, swirlTween: swirlTween };
    }

    /**
     * set the equation to be solved for 
     */
    setCurrentEquation(delayTime = 1000) {
        this.currEquation = _.sample(this.equations);

        // fade in the new problem
        this.problemText.alpha = 0;
        this.problemText.setText(this.currEquation.problem);
        const tween = this.game.add.tween(this.problemText).to( { alpha: 1 }, 1000, 'Linear', true, delayTime);

        // after the problem is faded in, start the timer
        tween.onComplete.add(this.startTimer, this);
    }

    update() {

        // twirl the swirls
        this.swirls.forEach(swirl => {
            swirl.angle += 1;
        });
    }

    /**
     * change the grade levels
     */
    changeGradeLevel(equations) {

        if (this.audio.card_reveal.isPlaying) this.audio.card_reveal.stop();
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.totEquations = equations;
        this.reload();
        if (this.timer) this.timer.destroy();
    }
}

