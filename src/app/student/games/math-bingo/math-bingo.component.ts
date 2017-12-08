import { Component, AfterViewInit, Renderer, ViewChild } from '@angular/core';
import * as _ from 'lodash'

import { ApiService } from '../../../shared/utils/api.service';
import { GameComponent } from '../game/game/game.component';

// necessary to get phaser to work
import * as Phaser from 'phaser-ce';
import { Math } from 'phaser-ce';

@Component({
    selector: 'sq-math-bingo',
    templateUrl: './math-bingo.component.html',
    styleUrls: ['./math-bingo.component.css'],
})
export class MathBingoComponent implements AfterViewInit {

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

    async loadAssets(){
        await this.game.load.image('bingo_card', '../../../assets/games/mathBingo/bingoCard.png');
        await this.game.load.image('background', '../../../assets/games/mathBingo/background.png');
        await this.game.load.image('crystal_ball_back', '../../../assets/games/mathBingo/crystalBallBack.png');
        await this.game.load.image('crystal_ball_front', '../../../assets/games/mathBingo/crystalBallFront.png');
        await this.game.load.image('crystal_ball_stand', '../../../assets/games/mathBingo/crystalBallStand.png');
        await this.game.load.image('center_swirl', '../../../assets/games/mathBingo/centerSwirl.png');
        await this.game.load.image('bingoCardCell', '../../../assets/games/mathBingo/bingoCardCell.png');
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
        this.game.load.start();
    };

    onAssetsLoaded() {

        this.equations = _.sampleSize(this.totEquations, 24);
        this.background.destroy();
        this.game.add.image(0, 0, 'background');

        const centerSwirl = this.game.add.sprite(918.4, this.game.world.centerY, 'center_swirl');
        centerSwirl.scale.setTo(.17, .17);
        centerSwirl.anchor.setTo(.5, .5);
        this.swirls.push(centerSwirl);

        for(let k = 0; k < 5; k++) {
            const y = 45 + (k * 133.7)
            for(let i = 0; i < 5; i++) {
                const x = 588 + (i  * 133.5);
            
                if(k * 5 + i != 12) {
                    const equationIndex = k * 5 + i > 12 ? k * 5 + i - 1 : k * 5 + i;
                    const solution = this.equations[equationIndex].solution;
                    let buttonText;
                    const button = this.game.add.button(x, y, 'bingoCardCell', function() { this.tileSelected(solution, buttonText) }, this);
                    const style = { font: "32px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: button.width, align: "center", stroke: '#1f7eff', strokeThickness: 3 };
                    buttonText = this.game.add.text(x + button.width / 2, y + button.height / 2, this.equations[equationIndex].solution, style);
                    buttonText.tint = 0x2080ff;
                    buttonText.anchor.set(0.5);
                    buttonText.index = k * 5 + i
                    this.twinkleElems.push(buttonText);
                }

                const moonCard = 'moonCard' + ((k * 5 + i + 1) > 16 ? (k * 5 + i + 1) - 16 : (k * 5 + i + 1));
                const moonCardSprite = this.game.add.image(x, y, moonCard);
                moonCardSprite.scale.setTo(.25, .25);
                this.moonCards.push(moonCardSprite);
            }
        }

        const bingoCard = this.game.add.image(this.game.world.width - 100, this.game.world.centerY, 'bingo_card');
        bingoCard.scale.setTo(.33, .33);
        bingoCard.anchor.setTo(1, .5);

        const crystalBallBack = this.game.add.image(125, this.game.world.centerY - 60, 'crystal_ball_back');
        crystalBallBack.scale.setTo(.17, .17);
        crystalBallBack.anchor.setTo(0, .5);

        this.problemText = this.game.add.text(crystalBallBack.x + (crystalBallBack.width / 2), crystalBallBack.y, '', { font: "32px Arial" });
        this.problemText.anchor.setTo(.5, .5);

        const crystalBallFront = this.game.add.image(125, this.game.world.centerY - 60, 'crystal_ball_front');
        crystalBallFront.scale.setTo(.17, .17);
        crystalBallFront.anchor.setTo(0, .5);

        const crystalBallStand = this.game.add.image(40, this.game.world.centerY + 215 , 'crystal_ball_stand');
        crystalBallStand.scale.setTo(.17, .17);
        crystalBallStand.anchor.setTo(0, .5);

        const style = { font: "50px Arial", fill: "#884dd9", stroke: '#5000bd', strokeThickness: 5 };
        this.scoreText = this.game.add.text(50, 25, "Score: 0", style);
        this.timerText = this.game.add.text(325, 25, "Time: 0", style);

        // fade moonCards
        for (let i = this.moonCards.length - 1; i >= 0; i--) {
            const delayTime = (this.moonCards.length - 1 - i) / 5 * 1000
            this.game.add.tween(this.moonCards[i]).to( { alpha: 0 }, 2000, 'Linear', true, delayTime);
        }

        this.twinkleTint();

            // Create our Timer
            const twinkleTimer = this.game.time.create(false);

            // Set a TimerEvent to occur after 2 seconds
            twinkleTimer.loop(1000, this.twinkleTint, this);

            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            twinkleTimer.start();

            this.setCurrentEquation(6000);
    }

    startTimer() {
        this.timeLeft = this.secondsPerProblem;
        this.updateTimerText();

        this.timer = this.game.time.create(false);
        this.timeLeft = 20;

        // Set a TimerEvent to occur after 1 seconds
        this.timer.loop(1000, this.decrementTimer, this);

        // Start the timer running - this is important!
        // It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    }

    decrementTimer() {
        this.timeLeft --;
        if (this.timeLeft >= 0) {
            this.updateTimerText();
            return; 
        }
        this.timer.destroy();
        this.updateScore(-3);
        this.updateProblem();
    }

    updateProblem() {
        const tween = this.game.add.tween(this.problemText).to( { alpha: 0 }, 1000, 'Linear', true);
        tween.onComplete.add(this.setCurrentEquation, this);
    }

    updateScore(points) {
        this.score += points;
        if (this.score < 0) this.score = 0;
        this.scoreText.setText('Score: ' + this.score);
    }
    
    updateTimerText() {
        this.timerText.setText('Time: ' + this.timeLeft);
    }

    twinkleTint() {
        const twinkleElem = this.twinkleElems.splice(_.random(0, this.twinkleElems.length - 1), 1)[0];
        this.tweenTint(twinkleElem, 0x2080ff, 0xffffff, 2000, 0, () => {
            this.tweenTint(twinkleElem, 0xffffff, 0x2080ff, 2000, 0, () => {
                this.twinkleElems.push(twinkleElem);
            })
        });
    }

    tweenTint(obj, startColor, endColor, time = 250, delay = 0, callback = null) {

        // check if is valid object
        if (obj) {
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
        }
    }

    getTextColor(index) {
        switch (index) {
            case 0: return '#e400ff';
            case 1: case 5: return '#6000ff'; 
            case 2: case 6: case 10: return '#00baff'; 
            case 3: case 7: case 11: case 15: return '#00ff12';
            case 4: case 8: case 16: case 20: return '#f0ff00';
            case 9: case 13: case 17: case 21: return '#ffb400';
            case 14: case 18: case 22: return '#ff0000';
            case 19: case 23: case 27: return '#fc00ff';
            case 24: case 28: return '#000000';
            case 25: return '#ffffff';
        }
    }

    tileSelected(solution, buttonText) {
        if (solution == this.currEquation.solution) {
            if (this.timer) this.timer.destroy();
            this.updateScore(5);
            this.setSolutionToSwirl(buttonText);
            this.updateProblem();
            this.equations.splice(_.findIndex(this.equations, this.currEquation), 1);
            return;
        }
        this.updateScore(-3);
    }

    setSolutionToSwirl(buttonText) {
        let textTween = this.game.add.tween(buttonText.scale).to({x: .1, y: .1}, 1000, 'Linear', true);
        const swirl = this.game.add.sprite(buttonText.x, buttonText.y, 'center_swirl');
        swirl.scale.setTo(.01, .01);
        swirl.anchor.setTo(.5, .5);
        let swirlTween = this.game.add.tween(swirl.scale).to({x: .17, y: .17}, 1000, 'Linear', true);
        this.swirls.push(swirl);
        _.remove(this.twinkleElems, elem => (elem.index == buttonText.index));
        
        this.equations.splice(_.findIndex(this.equations, this.currEquation), 1);
        this.twinkleElems.push(swirl);
    }

    setCurrentEquation(delayTime = 1000) {
        this.currEquation = _.sample(this.equations);
        this.problemText.alpha = 0;
        this.problemText.setText(this.currEquation.problem);
        const tween = this.game.add.tween(this.problemText).to( { alpha: 1 }, 1000, 'Linear', true, delayTime);
        tween.onComplete.add(this.startTimer, this);
    }

    update() {
        this.swirls.forEach(swirl => {
            swirl.angle += 1;
        });
    }
}

