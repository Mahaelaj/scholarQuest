import { Component, AfterViewInit,  ViewChild, OnDestroy } from '@angular/core';
import * as _ from 'lodash'
import * as Phaser from 'phaser-ce';

import { GameComponent } from '../game/game/game.component';
import { take } from 'rxjs/operators/take';

@Component({
    templateUrl: './word-smith.component.html',
    styleUrls: ['./word-smith.component.css'],
})
export class WordSmithComponent implements AfterViewInit, OnDestroy {

    @ViewChild('game') gameController: GameComponent;

    game: any;
    background: any;
    totVocab: any;
    smokeGroup: any;
    dropContainers = [];
    curVocab = [];
    hilts = [];
    blades = [];
    score = 0;
    scoreText;
    levelText;
    timerText;
    level = 0;
    lives = [];
    timeLeft = 0;
    timer: any;
    gameOverDialog = [];
    swordsLeft = 4;
    audio;
    backgroundMusic;

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
        this.game = new Phaser.Game(1355, 750, Phaser.AUTO, document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this) });
    }

    preload() {
        this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading_spritesheet.png', 1355, 761, 8);
    }

    create() {

        // prevent the game from pausing if it is not in focus
        this.game.stage.disableVisibilityChange = true;

        // display the loading background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        const load = this.background.animations.add('load');
        load.play(4, true);

        // after the assets load, display things
         this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);

        this.gameController.getVocabulary().subscribe(
            data => {
                if (data.error) return this.gameController.openErrorMessage();
                this.totVocab = data.vocab;
                this.loadAssets();
                },
            error => {
                this.gameController.openErrorMessage();
            }
        )
    }

    async loadAssets(){
        await this.game.load.image('hilt1', '../../../assets/games/wordSmith/hilt1.png');
        await this.game.load.image('hilt2', '../../../assets/games/wordSmith/hilt2.png');
        await this.game.load.image('hilt3', '../../../assets/games/wordSmith/hilt3.png');
        await this.game.load.image('hilt4', '../../../assets/games/wordSmith/hilt4.png');
        await this.game.load.image('hilt5', '../../../assets/games/wordSmith/hilt5.png');
        await this.game.load.image('hilt1-gem', '../../../assets/games/wordSmith/hilt1_gem.png');
        await this.game.load.image('hilt2-gem', '../../../assets/games/wordSmith/hilt2_gem.png');
        await this.game.load.image('hilt3-gem', '../../../assets/games/wordSmith/hilt3_gem.png');
        await this.game.load.image('hilt4-gem', '../../../assets/games/wordSmith/hilt4_gem.png');
        await this.game.load.image('hilt5-gem', '../../../assets/games/wordSmith/hilt5_gem.png');
        await this.game.load.image('blade', '../../../assets/games/wordSmith/sword.png');
        await this.game.load.image('flame', '../../../assets/games/wordSmith/flame.png');
        await this.game.load.image('smoke', '../../../assets/games/wordSmith/smoke.jpg');
        await this.game.load.image('smoke-background', '../../../assets/games/wordSmith/smokeBackground.png');
        await this.game.load.image('play-again-button', '../../../assets/games/wordSmith/playAgainButton.png');
        await this.game.load.image('drop-border', '../../../assets/games/wordSmith/dropBorder.png');

        await this.game.load.audio('hammer', '../../../assets/games/wordSmith/audio/hammer.ogg');
        await this.game.load.audio('background_music', '../../../assets/games/wordSmith/audio/background.ogg');
        await this.game.load.audio('shatter', '../../../assets/games/wordSmith/audio/shatter.ogg');

        this.game.load.start();
    };

    onAssetsLoaded() {
        this.settupGame();
    }

    settupGame() {

        this.background.destroy();

        this.audio = {
            background: this.game.add.audio('background_music'),
            hammer: this.game.add.audio('hammer'),
            shatter: this.game.add.audio('shatter'),
        }

        this.setSmoke();
    
        this.setFlames();

        this.setScoreText();

        this.setTimerText();
        
        this.setLives();        

        this.startLevel();

        this.startBackgroundMusic();
    }

    startBackgroundMusic() {
        this.backgroundMusic = this.audio.background;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.loopFull(0.5);
    }

    setSwords() {
        
        const hilts = _.sampleSize([ 'hilt1', 'hilt2', 'hilt3', 'hilt4', 'hilt5' ], 4)
        this.hilts = [];

        const gemColors = _.sampleSize([ 0x8fe9da, 0xffe07e, 0xffcfcf, 0xaff73b ], hilts.length);
        
        for (let i = 1; i <= hilts.length; i++) {
            const hiltImg = this.game.add.image(this.game.width - 35, i * this.game.height / 5 + ((-2.5 + i) * 20) , hilts[i - 1]);
            const hiltGemImg = this.game.add.image(this.game.width - 35, i * this.game.height / 5 + ((-2.5 + i) * 20) , hilts[i - 1] + '-gem');
            
            hiltImg.anchor.setTo(1, 0.5);
            hiltGemImg.anchor.setTo(1, 0.5);
            hiltImg.inputEnabled = true
            hiltImg.input.enableDrag(true);
            const hilt = { hilt: hiltImg, x: hiltImg.x, y: hiltImg.y, gem: hiltGemImg };
            hiltImg.events.onDragStop.add(function() { this.onDragStop(hilt) }, this);
            hiltImg.events.onDragUpdate.add(function() { this.onDragUpdate(hilt) }, this);
            this.hilts.push(hilt);
            hiltImg.tint = 0x212121;
            hiltGemImg.tint = gemColors[i - 1];
        }

        this.blades = [];
        for (let i = 1; i <= 4; i++) {
            const blade = this.game.add.image(-70, i * this.game.height / 5 + ((-2.5 + i) * 20), 'blade');
            blade.anchor.setTo(0.5, 0.5);
            blade.scale.setTo(.8);
            blade.tint = 0x212121;
            this.blades.push({ blade: blade })
        }
    }
    
    setScoreText() {
        const style = { font: "26px Arial", fill: '#fff049', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#ff943f', strokeThickness: 3 };
        this.scoreText = this.game.add.text(this.game.width - 195, 5, 'Score: 0', style);
        this.scoreText.anchor.setTo(1, 0);
    }

    setTimerText() {
        const style = { font: "26px Arial", fill: '#fff049', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#ff943f', strokeThickness: 3 };
        this.timerText = this.game.add.text(165, 5, 'Time: 0', style);
    }

    startTimer() {

        this.timeLeft = 40 - (this.level * 5);
        if (this.timeLeft < 5) this.timeLeft = 5;

        this.timerText.text = 'Time: ' + this.timeLeft;

        if (this.timer) this.timer.destroy();
        this.timer = this.game.time.create(false);

        // Set a TimerEvent to occur after 1 seconds
        this.timer.loop(1000, this.decrementTimer, this);

        // Start the timer running - this is important!
        // It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    }

    decrementTimer() {
        this.timeLeft--;
        this.timerText.text = 'Time: ' + this.timeLeft;
        if (this.timeLeft == 0) this.loseGame();
    }

    loseGame() {
        this.hilts.forEach(hilt => hilt.hilt.inputEnabled = false );
        
        const background = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'smoke-background');
        background.anchor.setTo(0.5);
        background.scale.setTo(2.25);
        
        const style = { font: "32px Arial", fill: '#fff049', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#ff943f', strokeThickness: 3 };
        const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 40, `Well Done\nYou Won\n${this.score} Coins`, style);
        text.anchor.setTo(0.5);

        const button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 90, 'play-again-button', this.resetGame, this);
        button.anchor.setTo(0.5);
        button.width = 200
        button.height = 75;

        const playAgaintext = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 90, `Play Again`, style);
        playAgaintext.anchor.setTo(0.5);

        this.timer.destroy();
        
        this.gameOverDialog = [ background, text, button, playAgaintext ];

        this.gameController.updateCoins(this.score);

    }

    resetGame() {
        this.gameOverDialog.forEach(dialogPiece => dialogPiece.destroy());
        this.hilts.forEach(hilt => { hilt.hilt.destroy(); hilt.text.destroy(); hilt.gem.destroy();});
        this.blades.forEach(blade => { blade.blade.destroy(); blade.text.destroy() });
        this.dropContainers.forEach(container => container.destroy());
        this.lives.forEach(life => life.destroy());

        this.level = 0;

        this.score = 0;
        this.scoreText.text = 'Score: 0';

        this.setLives();

        this.startLevel();        
    }

    setDropContainers() {
        this.dropContainers = [];

        for (let i = 1; i <= 4; i++) {
            const container = this.game.add.image(this.game.world.centerX - 105, i * this.game.height / 5 + ((-2.5 + i) * 20), 'drop-border');
            container.anchor.setTo(0.5, 0.5);
            container.scale.setTo(1.033);
            this.dropContainers.push(container);
            container.alpha = 0;
            container.dropActive = true;
            this.game.add.tween(container).to({ alpha: 1 }, 1000, 'Linear', true);
        }
    }

    setSmoke() {
        this.smokeGroup = this.game.add.group();
        let smoke = this.smokeGroup.create(0, -611, 'smoke');
        smoke.scale.setTo(1.33);
        this.setNextSmoke(smoke);
    }

    setNextSmoke(oldSmoke) {
        let newSmoke = this.smokeGroup.create(0, this.game.world.height, 'smoke');
        newSmoke.scale.setTo(1.33);

        let newSmokeMovementTween = this.game.add.tween(newSmoke).to({ y: -611 }, 176000, 'Linear', true);
        newSmokeMovementTween.onComplete.add(function(){ this.setNextSmoke(newSmoke) }, this);

        let oldSmokeMovementTween = this.game.add.tween(oldSmoke).to({ y: -1600 }, 128000, 'Linear', true);
        oldSmokeMovementTween.onComplete.add(function(){ oldSmoke.destroy() });
    }
    
    setFlames() {

        for (let i=0; i<5; i++) {
            let flame = this.game.add.image(i * 300 + 125, 550, 'flame');
            flame.anchor.setTo(0.5, 0.5);
            flame.angle = 10;
            this.game.time.events.add(i * 200, function(){ this.moveFlameDown(flame, 550); }, this);
        }

        for (let i=0; i<5; i++) {
            let flame = this.game.add.image(i * 300, 800, 'flame');
            flame.anchor.setTo(0.5, 0.5);
            flame.angle = -10;
            this.game.time.events.add(i * 200, function(){ this.moveFlameUp(flame, 700); }, this);
        }
    }

    onDragStop(hilt) {
        for (let i = 0; i < this.dropContainers.length; i++){
            let container = this.dropContainers[i];
            if (container.dropActive && this.game.input.x > container.x - .5 * container.width && this.game.input.x < container.x + .5 * container.width && this.game.input.y < container.y + .5 * container.height && this.game.input.y > container.y - .5 * container.height) {
                hilt.hilt.anchor.setTo(0.5);
                hilt.gem.anchor.setTo(0.5);
                hilt.hilt.x = container.x;
                hilt.hilt.y = container.y;
                hilt.text.x = container.x;
                hilt.text.y = container.y;
                hilt.gem.x = hilt.hilt.x;
                hilt.gem.y = hilt.hilt.y;
                if (_.find(this.curVocab, { word: hilt.text.text }).definition == this.blades[i].text.text) {
                    this.audio.hammer.play();
                    let movementTween = this.game.add.tween(hilt.hilt).to({ x: 540 }, 2000, 'Linear', true);
                    this.game.add.tween(hilt.gem).to({ x: 540 }, 2000, 'Linear', true);
                    this.game.add.tween(hilt.text).to({ x: 540 }, 2000, 'Linear', true);
                    movementTween.onComplete.add(function() { this.moveSwordLeft(hilt, this.blades[i]) }, this);
                    this.game.add.tween(container).to({ alpha: 0 }, 1000, 'Linear', true);
                    this.score += 5;
                    this.scoreText.text = 'Score: ' + this.score;
                    container.dropActive = false;
                }
                else {
                    hilt.hilt.tint = 0x212121;
                    hilt.gem.tint = 0x212121;
                    hilt.text.destroy()
                    const swordTween = this.game.add.tween(hilt.hilt).to({ y: 1000 }, 1000, 'Linear', true);
                    this.game.add.tween(hilt.gem).to({ y: 1000 }, 1000, 'Linear', true);
                    this.game.add.tween(hilt.gem).to({ y: 1000 }, 1000, 'Linear', true);
                    this.game.add.tween(hilt.hilt).to({ angle: 90 }, 1000, 'Linear', true);
                    let definitionToRemove = _.find(this.curVocab, { word: hilt.text.text}).definition;
                    this.blades.forEach((blade, k) => {
                        if (blade.text.text != definitionToRemove) return;
                        this.audio.shatter.play();
                        blade.blade.tint = 0x212121;
                        this.game.add.tween(blade.blade).to({ y: 1000 }, 1000, 'Linear', true);
                        this.game.add.tween(blade.blade).to({ angle: -90 }, 1000, 'Linear', true);
                        blade.text.destroy()
                        this.game.add.tween(this.dropContainers[k]).to({ alpha: 0 }, 1000, 'Linear', true);
                        this.loseLife();
                        swordTween.onComplete.add(() => { this.destroySword(hilt, blade); }, this);
                        this.dropContainers[k].dropActive = false;
                    });
                }
                return;
            }
        }
        hilt.hilt.x = hilt.x;
        hilt.hilt.y = hilt.y;
        hilt.text.x = this.game.width - 270;
        hilt.text.y = hilt.y;
        hilt.gem.x = hilt.x;
        hilt.gem.y = hilt.y;
    }

    destroySword(hilt, blade) {
        hilt.hilt.destroy();
        hilt.text.destroy();
        blade.blade.destroy();
        blade.text.destroy();
        hilt.gem.destroy();
        this.swordsLeft--;
        if (this.swordsLeft == 0) this.nextLevel();
    }

    nextLevel() {
        this.timer.destroy();
        this.level++;
        this.startLevel();
    }

    loseLife() {
        let flame = this.lives.pop();
        flame.destroy();

        if (!this.lives.length) this.loseGame();
    }

    moveSwordLeft(hilt, blade) {
        const swordTween = this.game.add.tween(hilt.hilt).to({ x: -200 }, 2000, 'Linear', true);
        this.game.add.tween(hilt.text).to({ x: -200 }, 2000, 'Linear', true);
        this.game.add.tween(hilt.gem).to({ x: -200 }, 2000, 'Linear', true);
        this.game.add.tween(blade.blade).to({ x: -796 }, 2000, 'Linear', true);
        this.game.add.tween(blade.text).to({ x: -795 }, 2000, 'Linear', true);

        swordTween.onComplete.add(() => {
          this.destroySword(hilt, blade);
        }, this);
    }

    onDragUpdate(hilt) {
        hilt.text.x = hilt.hilt.x - 225;
        hilt.text.y = hilt.hilt.y;
        hilt.gem.x = hilt.hilt.x;
        hilt.gem.y = hilt.hilt.y;
    }

    moveFlameUp(flame, yCord) {
        let angleTween = this.game.add.tween(flame).to({ angle: 10 }, 4000, 'Linear', true);
        let movementTween = this.game.add.tween(flame).to({ y: yCord - 25 }, 2000, 'Back.easeInOut', true);
        movementTween.onComplete.add(function() { this.game.add.tween(flame).to({ y: yCord }, 2000, 'Back.easeInOut', true); }, this);
        angleTween.onComplete.add(function() { this.moveFlameDown(flame, yCord); }, this);

    }

    moveFlameDown(flame, yCord) {
        let angleTween = this.game.add.tween(flame).to({ angle: -10 }, 4000, 'Linear', true);
        let movementTween = this.game.add.tween(flame).to({ y: yCord + 25 }, 2000, 'Back.easeInOut', true);
        movementTween.onComplete.add(function() { this.game.add.tween(flame).to({ y: yCord }, 2000, 'Back.easeInOut', true); }, this);
        angleTween.onComplete.add(function() { this.moveFlameUp(flame, yCord); }, this);
    }

    setVocabulary() {
        this.curVocab = _.sampleSize(this.totVocab, 4);
        
        let words = _.map(this.curVocab, vocab => vocab.word);
        words = _.shuffle(words);

        let definitions = _.map(this.curVocab, vocab => vocab.definition);
        definitions = _.shuffle(definitions);

        for (let i = 1; i <= definitions.length; i++) {
            const style = { font: "20px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#565656', strokeThickness: 3 };
            const definitionText = this.game.add.text(160, i * this.game.height / 5 + ((-2.5 + i) * 20), definitions[i - 1], style);
            definitionText.anchor.set(0.5, 0.5);
            this.blades[i - 1].text = definitionText;
            definitionText.tint = 0x181818;
        }

        for (let i = 1; i <= words.length; i++) {
            const style = { font: "20px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#565656', strokeThickness: 3 };
            const wordText = this.game.add.text(this.game.width - 270, i * this.game.height / 5 + ((-2.5 + i) * 20), words[i - 1], style);
            wordText.anchor.set(0.5, 0.5);
            this.hilts[i - 1].text = wordText;
            wordText.tint = 0x181818;
        }
    }

    setLives() {

        let flame = this.game.add.image(70, 10, 'flame');
        flame.scale.setTo(0.05);

        let flame2 = this.game.add.image(85, 10, 'flame');
        flame2.scale.setTo(0.05);

        let flame3 = this.game.add.image(100, 10, 'flame');
        flame3.scale.setTo(0.05);

        this.lives = [ flame, flame2, flame3 ];
    }

    startLevel() {
        
        this.swordsLeft = 4;
        this.setSwords();

        this.setDropContainers();

        this.setVocabulary();

        this.hilts.forEach(hilt => { this.fadeInImage(hilt.hilt, 0x212121); this.fadeInImage(hilt.text, 0x181818)});
        this.blades.forEach(blade => { this.fadeInImage(blade.blade, 0x212121); this.fadeInImage(blade.text, 0x181818)});
        this.startTimer();
    }
    
    fadeInImage(obj, startColor) {

        // create a step object
        let colorBlend = { step: 0 };

        // create a tween to increment that step from 0 to 100.
        let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, 1000, Phaser.Easing.Linear.None);

        // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
        colorTween.onUpdateCallback(() => {
            obj.tint = Phaser.Color.interpolateColor(startColor, 0xffffff, 100, colorBlend.step);
        });

        // finally, start the tween
        colorTween.start();
    }

    changeGradeLevel(vocab) {
        this.totVocab = _.cloneDeep(vocab);
        this.resetGame();
    }
}
