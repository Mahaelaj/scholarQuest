import { Component, AfterViewInit,  ViewChild, OnDestroy } from '@angular/core';
import * as _ from 'lodash'
import 'phaser-ce/build/custom/pixi';
import 'phaser-ce/build/custom/p2';
import * as Phaser from 'phaser-ce/build/custom/phaser-split';

import { GameComponent } from '../game/game/game.component';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    templateUrl: './pipes.component.html',
    styleUrls: ['./pipes.component.css'],
})
export class PipesComponent implements AfterViewInit, OnDestroy {

    @ViewChild('game') gameController: GameComponent;

    game: any;
    background: any;
    totProblems: any[];
    problems: any[];
    terrainImages: any[];
    terrainTopImages: any[];
    pipeStorage = [];
    pipes: any;
    curProblem: any;
    curPipe = { x: -1, y: 0 };
    startWater: any;
    gameBoard = [];
    tileLength = 142.5;
    waterDirection = 'right';
    textStyle = { font: "32px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: this.tileLength, align: "center", stroke: '#1f7eff', strokeThickness: 3 };
    startRow;
    waterTween;
    speed = 1;
    glowTweens = {};
    recycleImage;
    recycleGlowImage;
    dragPipeOverRecycle;
    bubbles = [ 'bubbles1', 'bubbles2', 'bubbles3' ];
    waterBubbleCounter = 0;
    rockGroup;
    bubbleGroup;
    waterGroup;
    underPipeGroup;
    overPipeGroup;
    fittingGroup;
    pipeStorageGroup;
    bubbleTweens = [];
    fittings = [];
    startEndPipeImages = [];
    storagePipeImages = [];
    level = 1;
    rockImages = [];
    waterSpillImage;
    endGameDialog = [];
    score = 0;
    scoreText;
    levelText;
    storagePipeTweens = [];
    storagePipeBackgrounds = [];
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

        this.gameController.getMath().subscribe(
            data => {
                if (data.error) return this.gameController.openErrorMessage();
                this.totProblems = data.math;
                this.loadAssets();
                },
            error => {
                this.gameController.openErrorMessage();
            }
        )
    }

    async loadAssets(){
        await this.game.load.image('acid_spill', '../../../assets/games/pipes/acidSpill.png');
        await this.game.load.image('bubbles1', '../../../assets/games/pipes/bubbles_1.png');
        await this.game.load.image('bubbles2', '../../../assets/games/pipes/bubbles_2.png');
        await this.game.load.image('bubbles3', '../../../assets/games/pipes/bubbles_3.png');
        await this.game.load.image('corner_full', '../../../assets/games/pipes/corner_full.png');
        await this.game.load.image('corner_outer', '../../../assets/games/pipes/corner_outer.png');
        await this.game.load.image('corner_under', '../../../assets/games/pipes/corner_under.png');
        await this.game.load.image('end_pipe_outer', '../../../assets/games/pipes/end_pipe_outer.png');
        await this.game.load.image('end_pipe_under', '../../../assets/games/pipes/end_pipe_under.png');
        await this.game.load.image('lavaSpill', '../../../assets/games/pipes/lavaSpill.png');
        await this.game.load.image('math_title', '../../../assets/games/pipes/math_title.png');
        await this.game.load.image('pipe_fitting', '../../../assets/games/pipes/pipe-fitting.png');
        await this.game.load.image('recycle', '../../../assets/games/pipes/recycle.png');
        await this.game.load.image('recycle_glow', '../../../assets/games/pipes/recycle_glow.png');
        await this.game.load.image('rock1', '../../../assets/games/pipes/rock1.png');
        await this.game.load.image('rock2', '../../../assets/games/pipes/rock2.png');
        await this.game.load.image('rock3', '../../../assets/games/pipes/rock3.png');
        await this.game.load.image('straight_full', '../../../assets/games/pipes/straight_full.png');
        await this.game.load.image('straight_outer', '../../../assets/games/pipes/straight_outer.png');
        await this.game.load.image('straight_under', '../../../assets/games/pipes/straight_under.png');
        await this.game.load.image('terrain1', '../../../assets/games/pipes/terrain_1.jpg');
        await this.game.load.image('terrain2', '../../../assets/games/pipes/terrain_2.jpg');
        await this.game.load.image('terrain3', '../../../assets/games/pipes/terrain_3.jpg');
        await this.game.load.image('terrain4', '../../../assets/games/pipes/terrain_4.jpg');
        await this.game.load.image('terrain5', '../../../assets/games/pipes/terrain_5.jpg');
        await this.game.load.image('terrain_grass1', '../../../assets/games/pipes/terrain_grass_1.jpg');
        await this.game.load.image('terrain_grass2', '../../../assets/games/pipes/terrain_grass_2.jpg');
        await this.game.load.image('terrain_grass3', '../../../assets/games/pipes/terrain_grass_3.jpg');
        await this.game.load.image('title', '../../../assets/games/pipes/title.png');
        await this.game.load.image('water_spill', '../../../assets/games/pipes/waterSpill.png');
        await this.game.load.image('fast_forward', '../../../assets/games/pipes/fast_forward.png');
        await this.game.load.image('board_background', '../../../assets/games/pipes/board_background.png');
        await this.game.load.image('fast_forward_glow', '../../../assets/games/pipes/fast_forward_glow.png');
        await this.game.load.image('countdown1', '../../../assets/games/countdown1.png');
        await this.game.load.image('countdown2', '../../../assets/games/countdown2.png');
        await this.game.load.image('countdown3', '../../../assets/games/countdown3.png');
        await this.game.load.image('dialog_background', '../../../assets/games/pipes/dialog_background.png');
        await this.game.load.image('background', '../../../assets/games/pipes/background.png');
        await this.game.load.image('storage_pipe_background', '../../../assets/games/pipes/storage_pipe_background.png');

        await this.game.load.audio('background_music', '../../../assets/games/pipes/audio/background.ogg');
        await this.game.load.audio('short_beep', '../../../assets/games/pipes/audio/short_beep.ogg');
        await this.game.load.audio('long_beep', '../../../assets/games/pipes/audio/long_beep.ogg');
        await this.game.load.audio('fast_forward', '../../../assets/games/pipes/audio/fast_forward.ogg');
        await this.game.load.audio('recycle', '../../../assets/games/pipes/audio/recycle.ogg');
        await this.game.load.audio('place_pipe', '../../../assets/games/pipes/audio/place_pipe.ogg');
        await this.game.load.audio('cant_place_pipe', '../../../assets/games/pipes/audio/cant_place_pipe.ogg');
        await this.game.load.audio('water_spill', '../../../assets/games/pipes/audio/water_spill.ogg');
        await this.game.load.audio('water_in_end_pipe', '../../../assets/games/pipes/audio/water_in_end_pipe.ogg');

        this.game.load.start();
    };

    onAssetsLoaded() {

        this.audio = {
            background: this.game.add.audio('background_music'),
            short_beep: this.game.add.audio('short_beep'),
            long_beep: this.game.add.audio('long_beep'),
            fast_forward: this.game.add.audio('fast_forward'),
            recycle: this.game.add.audio('recycle'),
            place_pipe: this.game.add.audio('place_pipe'),
            cant_place_pipe: this.game.add.audio('cant_place_pipe'),
            water_spill: this.game.add.audio('water_spill'),
            water_in_end_pipe: this.game.add.audio('water_in_end_pipe')
        }
        
        this.terrainImages = [ 'terrain1', 'terrain2', 'terrain3', 'terrain4', 'terrain5' ];
        this.terrainTopImages = [ 'terrain_grass1', 'terrain_grass2', 'terrain_grass3' ];

        this.pipes = [
            { fullImg: 'corner_full', rotation: 0, outer_img: 'corner_outer', under_img: 'corner_under', connectors: [ 'left', 'up' ] },
            { fullImg: 'corner_full', rotation: 90, outer_img: 'corner_outer', under_img: 'corner_under', connectors: [ 'up', 'right' ] },
            { fullImg: 'corner_full', rotation: 180, outer_img: 'corner_outer', under_img: 'corner_under', connectors: [ 'right', 'down' ] },
            { fullImg: 'corner_full', rotation: 270, outer_img: 'corner_outer', under_img: 'corner_under', connectors: [ 'down', 'left' ] },
            { fullImg: 'straight_full', rotation: 0, outer_img: 'straight_outer', under_img: 'straight_under', connectors: [ 'left', 'right' ] },
            { fullImg: 'straight_full', rotation: 90, outer_img: 'straight_outer', under_img: 'straight_under', connectors: [ 'up', 'down' ] },
        ];

        // destroy the loading background
        this.background.destroy();
        
        // set the new background
        this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'background').anchor.setTo(0.5);
        this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'board_background').anchor.setTo(0.5);

        // set up the gameboard in a 2d array
        for (let y = 0; y < 5; y++){
            this.gameBoard.push([]);
            for (let x = 0; x < 5; x++) {
                const boardTile = this.game.add.image(this.game.world.centerX + (x - 2) * this.tileLength + (x - 2) * 2.5, this.game.world.centerY + (y - 2) * this.tileLength  + (y - 2) * 2.5, !y ? _.sample(this.terrainTopImages) : _.sample(this.terrainImages));
                boardTile.anchor.setTo(0.5);
                boardTile.width = this.tileLength;
                boardTile.height = this.tileLength;
                boardTile.inputEnabled = true;
                this.gameBoard[y].push({ tile: boardTile });
            }
        }

        // set the tile length, to be used to determine sprite placement
        this.tileLength = 145;

        // add the fast forward image
        const fastForwardGlow = this.game.add.sprite(75, 70, 'fast_forward_glow');
        fastForwardGlow.scale.setTo(.23);
        fastForwardGlow.anchor.setTo(.5);
        fastForwardGlow.alpha = .75;
        const fastForward = this.game.add.button(75, 70, 'fast_forward', this.fastForward, this);
        fastForward.scale.setTo(.2);
        fastForward.anchor.setTo(.5);

        // enable the fastforward image to be clicked
        fastForward.events.onInputDown.add(this.fastForward, this);
        fastForward.inputEnabled = true;

        // change the glow color of the fast forward when the cursor is over it
        fastForward.events.onInputOver.add(function() { this.setGlowHoverColor(fastForwardGlow, 'fastForward') }, this);
        fastForward.events.onInputOut.add(function() { this.unsetGlowHoverColor(fastForwardGlow, 'fastForward') }, this);
        
        // interpolate the fastforward glow colors between yellow and orange
        this.interpolateGlowColor(fastForwardGlow, [ 0xe5ff07, 0xec8d06 ], 'fastForward');

        // add the recycle image
        this.recycleGlowImage = this.game.add.image(90, 670, 'recycle_glow');
        this.recycleGlowImage.scale.setTo(.15);
        this.recycleGlowImage.anchor.setTo(.5);
        this.recycleGlowImage.alpha = .75;
        this.recycleImage = this.game.add.image(90, 670, 'recycle');
        this.recycleImage.scale.setTo(.15);
        this.recycleImage.anchor.setTo(.5);

        // interpolate the recyle glow colors between yellow and orange
        this.interpolateGlowColor(this.recycleGlowImage, [ 0xe5ff07, 0xec8d06 ], 'recycle');

        // set the score and level texts
        const textFont = {
            font: "20px Arial",
            fill: "#e5ff07",
            wordWrap: true,
            align: "center"
          };
        this.levelText = this.game.add.text(1100, 10, 'Level: 1', textFont);
        this.scoreText = this.game.add.text(1225, 10, 'Score: 0', textFont);

        // set up the background images for the storage pipes
        const storagePipeBackground = this.game.add.image(7.75, 445, 'storage_pipe_background');
        const storagePipeBackground2 = this.game.add.image(7.75, 290, 'storage_pipe_background');
        const storagePipeBackground3 = this.game.add.image(7.75, 135, 'storage_pipe_background');
        storagePipeBackground.scale.setTo(1.5);
        storagePipeBackground2.scale.setTo(1.5);
        storagePipeBackground3.scale.setTo(1.5);
        this.storagePipeBackgrounds = [ storagePipeBackground, storagePipeBackground2, storagePipeBackground3 ];

        this.startBackgroundMusic();

        this.setUpGame();
    }

    startBackgroundMusic() {
        this.backgroundMusic = this.audio.background;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.2;
        this.backgroundMusic.loopFull(0.5);
    }

    /**
     * begin the game, called after the countdown has finished
     */
    startGame() {

        // add the pipes to the storage
        for(let i = 0; i < 3; i++) {
            const pipe = this.addPipeToStorage(i);
            this.pipeStorage.push(pipe);
        }

        // start the water
        this.waterTween = this.game.add.tween(this.startWater).to( { width: 80 }, 10000, 'Linear', true);
        this.waterTween.onComplete.add(this.moveFirstWater, this);
    }

    /**
     * get everything ready for the game to start
     */
    setUpGame() {

        // get only the promblems with unique solutions so that there is only one correct answer on the board  
        this.problems = _.uniqBy(this.totProblems, function(problem){ return problem.solution });

        // pick a problem
        this.curProblem = _.sample(this.problems);

        // randomly select a row for the water to start
        this.startRow = _.random(0, 4);

        // add the under part of the start pipe
        this.curPipe.y = this.startRow;
        const startPipeUnder = this.game.add.image(this.game.world.centerX  - 3 * this.tileLength, this.game.world.centerY + (this.startRow - 2) * this.tileLength, 'end_pipe_under');
        startPipeUnder.anchor.set(0.5);
        startPipeUnder.width = this.tileLength;
        startPipeUnder.height = this.tileLength;
        
        // add the water to the start pipe
        const startWaterBitmap = this.game.add.bitmapData(1, 50);
        startWaterBitmap.fill(64, 164, 223, 1);
        this.startWater = this.game.add.image(this.game.world.centerX  - 3 * this.tileLength, this.game.world.centerY - (2 - this.startRow)  * this.tileLength, startWaterBitmap);
        this.startWater.anchor.set(0, 0.5);

        // add the outer part of the start pipe
        const startPipeOuter = this.game.add.image(this.game.world.centerX  - 3 * this.tileLength, this.game.world.centerY +  (this.startRow - 2) * this.tileLength, 'end_pipe_outer');
        startPipeOuter.anchor.set(0.5);
        startPipeOuter.width = this.tileLength;
        startPipeOuter.height = this.tileLength;

        // set up the pipes on the right side of the gameboard
        this.setEndPipes();

        // add the problem text to the left side of the gameboard
        const problemText = this.game.add.text(210, this.game.world.centerY + (this.startRow - 2) * this.tileLength, this.curProblem.solution, this.textStyle);
        problemText.anchor.set(1, 0.5);
       
        // set up groups
        this.rockGroup = this.game.add.group();
        this.underPipeGroup = this.game.add.group();
        this.waterGroup = this.game.add.group();
        this.bubbleGroup = this.game.add.group();
        this.overPipeGroup = this.game.add.group();
        this.fittingGroup = this.game.add.group();
        this.pipeStorageGroup = this.game.add.group();

        // get a reference to all the images so they can be destroyed later
        this.startEndPipeImages.push(startPipeUnder, startPipeOuter, this.startWater, problemText);

        // set up the water direction and pipe location so that the game will know which way the water is flowing and from where
        this.waterDirection = 'right';
        this.curPipe.x = -1;

        // add three rocks to the gameboard, they can be placed anywhere except the first and last column
        const rockPlacement = _.sampleSize([ { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }], 3);
        rockPlacement.forEach(rock => {
            const rockImage = this.rockGroup.create(this.gameBoard[rock.y][rock.x].tile.x, this.gameBoard[rock.y][rock.x].tile.y, _.sample(['rock1', 'rock2', 'rock3']));
            rockImage.anchor.setTo(0.5);
            rockImage.scale.setTo(.15);
            this.rockImages.push(rockImage);
            this.gameBoard[rock.y][rock.x].rock = true;
        })

        // start the countdown
        this.countdown(3);
    }

    /**
     * make the fastforward and recycle images glow purple when they are being hovered over 
     * @param glow 
     * @param glowName 
     */    
    setGlowHoverColor(glow, glowName) {
        this.glowTweens[ glowName ].stop();
          let colorBlend = {
            step: 0
        };
        let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, 500, Phaser.Easing.Linear.None, 0);
        colorTween.onUpdateCallback(() => {
            glow.tint = Phaser.Color.interpolateColor(glow.tint, 0x3826e3, 100, colorBlend.step);
        });
        this.glowTweens[ glowName ] = colorTween;
        colorTween.start();
    }

    /**
     * make the fastforward and glow yellow when they are on longer being hovered over
     */
    unsetGlowHoverColor(glow, glowName) {
        this.glowTweens[ glowName ].stop();
          let colorBlend = {
            step: 0
        };
        let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, 2000, Phaser.Easing.Linear.None, 0);
        colorTween.onUpdateCallback(() => {
            glow.tint = Phaser.Color.interpolateColor(glow.tint, 0xe5ff07, 100, colorBlend.step);
        });
        colorTween.onComplete.add(function() { this.interpolateGlowColor(glow, [ 0xe5ff07, 0xec8d06 ], glowName) }, this);
        this.glowTweens[ glowName ] = colorTween;
        colorTween.start();
    }

    /**
     * make the water move faster when the fastforward button is pressed
     */
    fastForward() {

        // only fastforward after the game has started
        if (!this.waterTween || !this.waterTween.isRunning) return;
        this.audio.fast_forward.play();

        this.speed += 5;
        
        // make the water move faster 
        this.waterTween.timeScale = this.speed;
        
        // make the bubbles move faster
        this.bubbleTweens.forEach(bubbleTween => { if (bubbleTween.isRunning) bubbleTween.timeScale = this.speed; })
    }
    
    /**
     * randomly set three endpipes with problems at the right of the gameboard
     */
    setEndPipes() {

        // randomly select three rows
        const endPipeRows = _.sampleSize([0, 1, 2, 3, 4], 3);
        
        // get the endpipe problems
        const endPipeProblems = _.sampleSize(_.without(this.problems, this.curProblem), 2);
        endPipeProblems.push(this.curProblem);

        for (let i = 0; i < endPipeRows.length; i++) {
            
            // set the endpipe underpipe
            const endPipeUnder = this.game.add.image(this.game.world.centerX  + 3 * this.tileLength, this.game.world.centerY + (endPipeRows[i] - 2) * this.tileLength, 'end_pipe_under');
            endPipeUnder.anchor.set(0.5);
            endPipeUnder.width = this.tileLength;
            endPipeUnder.height = this.tileLength;
            endPipeUnder.angle = 180;
            
            // set the endpipe water
            const endWaterBitmap = this.game.add.bitmapData(1, 50);
            endWaterBitmap.fill(64, 164, 223, 1);
            const endWater = this.game.add.sprite(this.game.world.centerX + 3 * this.tileLength, this.game.world.centerY - (2 - endPipeRows[i])  * this.tileLength, endWaterBitmap);
            endWater.anchor.set(0, 0.5);

            // set the endpipe outerpipe
            const endPipeOuter = this.game.add.image(this.game.world.centerX + 3 * this.tileLength, this.game.world.centerY +  (endPipeRows[i] - 2) * this.tileLength, 'end_pipe_outer');
            endPipeOuter.anchor.set(0.5);
            endPipeOuter.width = this.tileLength;
            endPipeOuter.height = this.tileLength;
            endPipeOuter.angle = 180;

            // set the endpipe problem text
            const problemText = this.game.add.text(1145, this.game.world.centerY + (endPipeRows[i] - 2) * this.tileLength, endPipeProblems[i].problem, this.textStyle);
            problemText.anchor.set(0, 0.5);

            // add the pipe to the gameboard
            this.gameBoard[endPipeRows[i]][5] = { water1: endWater, problem: endPipeProblems[i].problem };

            // get a refrence to the pipes, so they can be deleted later
            this.startEndPipeImages.push(endPipeUnder, endWater, endPipeOuter, problemText);
        }
    }

    /**
     * lose game if the water does not make it to the correct end pipe
     */
    loseGame() {
        let tileCord;
        
        // set the waterspill image
        if (this.curPipe.x == 5) {
            tileCord = { x: this.gameBoard[ this.curPipe.y ][ this.curPipe.x - 1 ].tile.x, y: this.gameBoard[ this.curPipe.y ][ this.curPipe.x - 1 ].tile.y }
            this.waterDirection = 'left';
        }
        else if (this.curPipe.x == -1) {
            tileCord = { x: this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1 ].tile.x, y: this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1 ].tile.y }
            this.waterDirection = 'right';
        }
        else if (this.curPipe.y == -1) {
            tileCord = { x: this.gameBoard[ this.curPipe.y + 1 ][ this.curPipe.x ].tile.x, y: this.gameBoard[ this.curPipe.y + 1 ][ this.curPipe.x ].tile.y }
            this.waterDirection = 'down';
        }
        else if (this.curPipe.y == 5) {
            tileCord = { x: this.gameBoard[ this.curPipe.y - 1 ][ this.curPipe.x ].tile.x, y: this.gameBoard[ this.curPipe.y - 1 ][ this.curPipe.x ].tile.y }
            this.waterDirection = 'up';
        }
        else tileCord = { x: this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x, y: this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y }
        this.waterSpillImage = this.game.add.sprite(tileCord.x, tileCord.y, 'water_spill');
        switch(this.waterDirection) {
            case 'right': 
                this.waterSpillImage.x -= 1/2 * this.tileLength;
                break;
            case 'left': 
                this.waterSpillImage.x += 1/2 * this.tileLength;
                break;
            case 'up': 
                this.waterSpillImage.y += 1/2 * this.tileLength;
                break;
            case 'down': 
                this.waterSpillImage.y -= 1/2 * this.tileLength;
                break;
        }
        this.waterSpillImage.anchor.set(0.5);
        this.waterSpillImage.scale.setTo(0.3);
        
        this.audio.water_spill.play();

        // start the water spill tween
        const waterSpillTween = this.game.add.tween(this.waterSpillImage.scale).to({x: 1.0, y: 1.0}, 2000, 'Linear', true);
        waterSpillTween.onComplete.add(this.setEndGameDialog, this);

        // prevent the storage pipes from being dragged
        this.storagePipeImages.forEach(pipe => pipe.inputEnabled = false);

        // remove the bubbles in the water
        this.removeBubbles();
    }

    /**
     * open the dialog prompting the user to play again
     */
    setEndGameDialog() {
        const dialogBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dialog_background');
        dialogBackground.anchor.setTo(.5, .5);
        const dialogText = this.game.add.text(this.game.width/2, this.game.height/2 - 50, `Well Done\nYou Won\n${this.score} Coins`, { 
            font: "50px Arial",
            fill: "#484848",
            stroke: "#d8d8d9",
            strokeThickness: 4,
            wordWrap: true,
            wordWrapWidth: dialogBackground.width,
            align: "center"
          });
          dialogText.anchor.set(0.5);
          const playAgainButton = this.game.add.button(this.game.width/2, this.game.height/2 + 100, 'straight_full', this.resetGame, this);
          playAgainButton.anchor.set(0.5);
          playAgainButton.scale.setTo(.15, .15);
          const buttonText = this.game.add.text(this.game.width/2, this.game.height/2 + 100, 'Play Again', {
            font: "25px Arial",
            fill: "#40a4df",
            wordWrap: true,
            wordWrapWidth: playAgainButton.width,
            align: "center"
          });
          buttonText.anchor.set(0.5);
          this.gameController.updateCoins(this.score);
          this.endGameDialog = [ dialogBackground, dialogText, playAgainButton, buttonText ];
    }

    /**
     * remove the bubbles from the water, called after the game is won or lost
     */
    removeBubbles() {
        const bubbleTween = this.game.add.tween(this.bubbleGroup).to({ alpha: 0 }, 1000, 'Linear', true);
        bubbleTween.onComplete.add(function() {
            this.bubbleGroup.children.forEach(bubble => bubble.destroy());
        }, this)
    }

    /**
     * set the recycle and fastforward colors to interpolate between yellow and orange
     */
    interpolateGlowColor(glow, colors, glowName) {
         let colorBlend = {
            step: 0
        };
        glow.tint = colors[0];
        let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, 5000, Phaser.Easing.Linear.None, 0);
        colorTween.onUpdateCallback(() => {
            glow.tint = Phaser.Color.interpolateColor(colors[0], colors[1], 100, colorBlend.step);
        });
        colorTween.onComplete.add(function() { this.interpolateGlowColor(glow, _.reverse(colors), glowName) }, this);
        this.glowTweens[ glowName ] = colorTween;
        colorTween.start();
    }

    /**
     * move the first water inside the current pipe
     */
    moveFirstWater() {

        // create bubbles in the water
        this.waterBubbleCounter += 1;
        if (this.waterBubbleCounter % 3 == 2) {
            const bubble = this.bubbleGroup.create(this.game.world.centerX  - 3 * this.tileLength + 10, this.game.world.centerY + (this.startRow - 2) * this.tileLength, _.sample(this.bubbles));
            bubble.scale.setTo(.01);
            bubble.anchor.setTo(0.5);
            bubble.alpha = 0;
            this.game.add.tween(bubble.scale).to({ x: 0.1, y: 0.1 }, 1000, 'Linear', true);
            this.game.add.tween(bubble).to({ alpha: 1 }, 1000, 'Linear', true);
            const bubbleMovement = this.game.add.tween(bubble).to( {x: bubble.x + 60 }, 4500, 'Linear', true);
            bubbleMovement.onComplete.add(function() { this.moveBubble({ bubbleImg: bubble, x: 0, y: this.startRow, direction: 'right', firsthalf: true }) }, this);
            bubbleMovement.timeScale = this.speed;
            this.bubbleTweens.push(bubbleMovement);
        }

        // move the water
        let firstWaterTween;
        switch(this.waterDirection) {
            case 'right':
                this.curPipe.x += 1;
                if ((this.curPipe.x == 5 && (!this.gameBoard[ this.curPipe.y ][ this.curPipe.x ] || this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].problem != this.curProblem.problem)) || (this.curPipe.x != 5 && (!this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe || !_.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'left')))) {
                    this.loseGame();
                    return;
                }
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.height = 55;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.anchor.set(0, 0.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.x = (this.curPipe.x == 5 ? this.gameBoard[ this.curPipe.y ][ this.curPipe.x - 1 ].tile.x + this.gameBoard[ this.curPipe.y ][ this.curPipe.x - 1 ].tile.width/2 : this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x - this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.width/2);
                firstWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1).to( { width: (this.curPipe.x == 5 ? 80 : 100) }, 6000, 'Linear', true);
                
                if (this.curPipe.x == 5) {
                    this.audio.water_in_end_pipe.play();
                    firstWaterTween.onComplete.add(this.winGame, this);
                }

                else {
                    firstWaterTween.onComplete.add(function() {
                        this.moveSecondWater(_.without(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'left')[0], _.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'right'));
                    }, this)
                }
                break;
            case 'up':
                this.curPipe.y -= 1;
                if (this.curPipe.y == -1 || !this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe || !_.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'down')) {
                    this.loseGame();
                    return;
                }
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.width = 55;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.anchor.set(0.5, 1);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y + this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.height/2;
                firstWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1).to( { height: 100 }, 6000, 'Linear', true);
                
                firstWaterTween.onComplete.add(function() {
                    this.moveSecondWater(_.without(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'down')[0], _.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'up'));
                }, this)
                break;
            case 'left':
                this.curPipe.x -= 1;
                if (this.curPipe.x == -1 || !this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe || !_.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'right')) {
                    this.loseGame();
                    return;
                }
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.height = 55;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.anchor.set(1, 0.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x + this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.width/2;
                firstWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1).to( { width: 100 }, 6000, 'Linear', true);
                
                firstWaterTween.onComplete.add(function() {
                    this.moveSecondWater(_.without(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'right')[0], _.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'left'));
                }, this)
                break;
            case 'down':
                this.curPipe.y += 1;
                if (this.curPipe.y == 5 || !this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe || !_.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'up')) {
                    this.loseGame();
                    return;
                }
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.width = 55;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.anchor.set(0.5, 0);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y - this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.height/2;
                firstWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water1).to( { height: 100 }, 6000, 'Linear', true);
                
                firstWaterTween.onComplete.add(function() {
                    this.moveSecondWater(_.without(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'up')[0], _.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].pipe.connectors, 'down'));
                }, this)
                break;
        }
        this.waterTween = firstWaterTween;
        this.waterTween.timeScale = this.speed;
    }

    /**
     * move the bubbles in the water 
     */
    moveBubble(bubble) {
        let nextDirection;
        let bubbleTween;

        if (!this.gameBoard[ bubble.y ][ bubble.x ] || !this.gameBoard[ bubble.y ][ bubble.x ].pipe) return;
        switch(bubble.direction) {
            case 'right':
                bubbleTween = this.game.add.tween(bubble.bubbleImg).to( { x: bubble.bubbleImg.x + 72.5 }, 4500, 'Linear', true);
                if (bubble.firsthalf) bubble.direction = _.without(this.gameBoard[ bubble.y ][ bubble.x ].pipe.connectors, 'left')[0];
                else { 
                    bubble.direction = 'right';
                    bubble.x += 1;
                }
                break;
            case 'left':
                bubbleTween = this.game.add.tween(bubble.bubbleImg).to( { x: bubble.bubbleImg.x - 72.5 }, 4500, 'Linear', true);
                if (bubble.firsthalf) bubble.direction = _.without(this.gameBoard[ bubble.y ][ bubble.x ].pipe.connectors, 'right')[0];
                else { 
                    bubble.direction = 'left';
                    bubble.x -= 1;
                }
                break;
            case 'down':
                bubbleTween = this.game.add.tween(bubble.bubbleImg).to( { y: bubble.bubbleImg.y + 72.5 }, 4500, 'Linear', true);
                if (bubble.firsthalf) bubble.direction = _.without(this.gameBoard[ bubble.y ][ bubble.x ].pipe.connectors, 'up')[0];
                else {
                    bubble.direction = 'down';
                    bubble.y += 1;
                }
                break;
            case 'up':
                bubbleTween = this.game.add.tween(bubble.bubbleImg).to( { y: bubble.bubbleImg.y - 72.5 }, 4500, 'Linear', true);
                if (bubble.firsthalf) bubble.direction = _.without(this.gameBoard[ bubble.y ][ bubble.x ].pipe.connectors, 'down')[0];
                else {
                    bubble.direction = 'up';
                    bubble.y -= 1;
                }
                break;
        }

        // if bubble was moving through the first half of the water then it should move through the second next and vice versa
        bubble.firsthalf = !bubble.firsthalf;

        // the bubbles should move at the speed of the water
        bubbleTween.timeScale = this.speed;

        // start the tween
        this.bubbleTweens.push(bubbleTween);
        bubbleTween.onComplete.add(function() { this.moveBubble(bubble) }, this);
    }

    /**
     * the game is won, start the next level
     */
    winGame() {

        // update the level and score
        this.level++;
        this.score += 25;
        this.scoreText.text = 'Score: ' + this.score;
        this.levelText.text = 'Level: ' + this.level;
        
        // immediatly destroy the bubbles
        this.bubbleGroup.destroy();

        // clear the game board
        this.clearGame();

        // increase the speed of the game
        this.speed = 1.15 * (this.level - 1);
        
        // setup the game
        this.setUpGame();
    }

    /**
     * clear the gameboard
     */
    clearGame() {

        // remove the images from the gameboard
        for (let y = 0; y < this.gameBoard.length; y++) {
            for (let x = 0; x < this.gameBoard.length; x++) {
                if (this.gameBoard[y][x].pipe) {
                    this.gameBoard[y][x].underPipe.destroy();
                    this.gameBoard[y][x].outerPipe.destroy();
                    this.gameBoard[y][x].water1.destroy();
                    this.gameBoard[y][x].water2.destroy();

                    // remove the reference to the pipe
                    this.gameBoard[y][x].pipe = null;
                }

                // set the rock to false
                this.gameBoard[y][x].rock = false;
            }
        }

        // remove the end pipes
        this.startEndPipeImages.forEach(image => image.destroy())
        this.startEndPipeImages = [];

        // remove the pipe fittings
        this.fittings.forEach(fitting => fitting.destroy())
        this.fittings = [];

        // remove the storage pipes images 
        this.storagePipeImages.forEach(pipe => pipe.destroy()); 
        this.storagePipeImages = [];
        this.pipeStorage = [];
        
        // remove the rocks
        this.rockImages.forEach(rock => rock.destroy());

        // remove the end game dialog
        this.endGameDialog.forEach(dialogPiece => dialogPiece.destroy());

        // reset the water counter
        this.waterBubbleCounter = 0;

        // remove the waterspill
        if (this.waterSpillImage) this.waterSpillImage.destroy();
    }

    /**
     * start the countdown, when the countdown is over, the game starts
     */
    countdown(number) {

        // lower the background music at the start of the countdown
        if (number == 3) {
            this.game.add.tween(this.backgroundMusic).to( { volume: 0.2 }, 1000, 'Linear', true, 0);
        }
        if (number == 1) this.audio.long_beep.play();
        else this.audio.short_beep.play();

        // add the countdown image
        const countdownImage = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'countdown' + number);
        countdownImage.anchor.setTo(.5);
        countdownImage.scale.setTo(2);
        countdownImage.alpha = 0;
        
        // add the tweens for the countdown images to fade them in and out
        const countdownTweenFadeIn = this.game.add.tween(countdownImage).to( { alpha: 1 }, 100, 'Linear');
        const countdownTweenFadeOut = this.game.add.tween(countdownImage).to( { alpha: 0 }, 700, 'Linear', false, 200);
        countdownTweenFadeIn.chain(countdownTweenFadeOut);
        countdownTweenFadeIn.start();
        
        // start game when the countdown is done
        countdownTweenFadeOut.onComplete.add(function() {
            if (number - 1  == 0) {
                this.game.add.tween(this.backgroundMusic).to( { volume: 0.5 }, 2000, 'Linear', true, 0);
                this.startGame();
                return;
            }
            
            // recursively call function until the countdown is over
            this.countdown(number - 1);
        }, this)
    }

    /**
     *  move the second water of the pipe
     */
    moveSecondWater(direction, straightPipe) {
        let secondWaterTween;
        switch(direction) {
            case 'down':
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.width = 60;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.height = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.anchor.set(0.5, 0);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y + (straightPipe ?  28.5 : 27.5);
                secondWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2).to( { height: 50 }, 3000, 'Linear', true);
                this.waterDirection = 'down';
                break;
            case 'up':
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.width = 60;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.height = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.anchor.set(0.5, 1);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y - (straightPipe ?  28.5 : 27.5);
                secondWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2).to( { height: 50 }, 3000, 'Linear', true);
                this.waterDirection = 'up';
                break;
            case 'right':
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.width = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.height = 60;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.anchor.set(0, 0.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x + (straightPipe ?  28.5 : 27.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y;
                secondWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2).to( { width: 50 }, 3000, 'Linear', true);
                this.waterDirection = 'right';
                break;
            case 'left':
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.width = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.height = 60;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.anchor.set(1, 0.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.x - (straightPipe ?  28.5 : 27.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].tile.y;
                secondWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x ].water2).to( { width: 50 }, 3000, 'Linear', true);
                this.waterDirection = 'left';
                break;
        }

        this.waterTween = secondWaterTween;
        this.waterTween.timeScale = this.speed;

        // when the water is done moving, move the first water of the next pipe
        secondWaterTween.onComplete.add(function() {
            this.moveFirstWater();
        }, this)
    }

    /**
     * add a new pipe to the storage
     */
    addPipeToStorage(index) {
    
        // get a pipe that is not already in storage
        const pipe =  _.sample(_.difference(this.pipes, this.pipeStorage));

        //add the pipe image
        const pipeImage = this.pipeStorageGroup.create(this.storagePipeBackgrounds[ index ].x + (this.storagePipeBackgrounds[ index ].width / 2), this.storagePipeBackgrounds[ index ].y + (this.storagePipeBackgrounds[ index ].height / 2), pipe.fullImg);
        pipeImage.anchor.setTo(0.5);
        pipeImage.angle = pipe.rotation;
        pipeImage.width = this.tileLength;
        pipeImage.height = this.tileLength;
        pipeImage.scale.setTo(0.075);
        
        // enable input on the pipe so it can be dragged
        pipeImage.inputEnabled = true;
        pipeImage.input.enableDrag(true);
        pipeImage.events.onDragStop.add(function(dragPipe) { this.onDragStop(pipe, dragPipe) }, this);

        // add a tween to make the pipe bounce when it appears
        this.game.add.tween(pipeImage.scale).to({ x: .145, y: .145 }, 2000, Phaser.Easing.Bounce.Out, true);

        // add an index to the pipe
        pipeImage.index = index;
        this.storagePipeImages.push(pipeImage);
        return pipe;
    }

    // do something after the pipe is done being dragged
    onDragStop(pipe, dragPipe) {

        // pipe is over recycle so recycle pipe
        if (this.game.input.x > this.recycleImage.x - this.recycleImage.width / 2 && this.game.input.x < this.recycleImage.x + this.recycleImage.width / 2 && this.game.input.y > this.recycleImage.y - this.recycleImage.width / 2 && this.game.input.y < this.recycleImage.y + this.recycleImage.width / 2){
            this.audio.recycle.play();
            this.getNewPipeForStorage(pipe, dragPipe);
            return;
        }

        // get the tile the pipe is being dragged over
        const hoverTile = this.getHoverTile();

        // tile already has a pipe, a rock, or drag pipe is not over a tile, so put the pipe back into storage
        if (!hoverTile || this.gameBoard[hoverTile.y][hoverTile.x].pipe || this.gameBoard[hoverTile.y][hoverTile.x].rock) {
            this.audio.cant_place_pipe.play();
            dragPipe.x = this.storagePipeBackgrounds[ dragPipe.index ].x + (this.storagePipeBackgrounds[ dragPipe.index ].width / 2);
            dragPipe.y = this.storagePipeBackgrounds[ dragPipe.index ].y + (this.storagePipeBackgrounds[ dragPipe.index ].height / 2)
            return;
        }

        this.audio.place_pipe.play();
        
        const tile = this.gameBoard[hoverTile.y][hoverTile.x].tile
        this.gameBoard[hoverTile.y][hoverTile.x].pipe = pipe;

        // set the under pipe for the tile
        const underPipeImage = this.underPipeGroup.create(tile.x, tile.y, pipe.under_img);
        underPipeImage.angle = pipe.rotation;
        underPipeImage.anchor.setTo(0.5);
        underPipeImage.width = this.tileLength;
        underPipeImage.height = this.tileLength;
        this.gameBoard[hoverTile.y][hoverTile.x].underPipe = underPipeImage;
        
        // set the water for the tile
        const startWaterBitmap = this.game.add.bitmapData(1, 1);
        startWaterBitmap.fill(64, 164, 223, 1);
        const water = this.waterGroup.create(this.game.world.centerX  - (2 - hoverTile.x)  * this.tileLength, this.game.world.centerY - (2 - hoverTile.y)  * this.tileLength, startWaterBitmap);
        water.alpha = 0;
        water.anchor.set(0);
        this.gameBoard[hoverTile.y][hoverTile.x].water1 = water;
        const water2 = this.waterGroup.create(this.game.world.centerX  - (2 - hoverTile.x)  * this.tileLength, this.game.world.centerY - (2 - hoverTile.y)  * this.tileLength, startWaterBitmap);
        water2.alpha = 0;
        water2.anchor.set(0);
        this.gameBoard[hoverTile.y][hoverTile.x].water2 = water2;

        // set the outerpipe for the tile
        const outerPipeImage = this.overPipeGroup.create(tile.x, tile.y, pipe.outer_img);
        outerPipeImage.angle = pipe.rotation;
        outerPipeImage.anchor.setTo(0.5);
        outerPipeImage.width = this.tileLength;
        outerPipeImage.height = this.tileLength;
        this.gameBoard[hoverTile.y][hoverTile.x].outerPipe = outerPipeImage;
         
        // add pipe fittings to the pipe
        this.addPipeFittings(pipe.connectors, hoverTile);

        // get a new pipe for storage
        this.getNewPipeForStorage(pipe, dragPipe);
    }

    /**
     * add a new pipe to the storage
     */
    getNewPipeForStorage(pipe, dragPipe) {
        const pipeIndex = _.findIndex(this.pipeStorage, pipe);
        
        const newPipe = this.addPipeToStorage(pipeIndex);
        this.pipeStorage[pipeIndex] = newPipe;
        dragPipe.destroy();
    }

    /**
     * add pipe fittings to the pipes to connect them on the gamebopard
     */
    addPipeFittings(pipeConnectors, hoverTile) {
        const tileCord = { x: this.gameBoard[hoverTile.y][hoverTile.x].tile.x, y: this.gameBoard[hoverTile.y][hoverTile.x].tile.y };
        if (hoverTile.x == 0 && this.startRow == hoverTile.y && pipeConnectors.includes('left')) {
            const fitting = this.fittingGroup.create(tileCord.x - 1/2 * this.tileLength, tileCord.y, 'pipe_fitting');
            fitting.anchor.setTo(.5);
            fitting.scale.setTo(0.15);
            this.fittings.push(fitting);
        }

        if (hoverTile.x > 0 && pipeConnectors.includes('left') && this.gameBoard[hoverTile.y][hoverTile.x -1 ].pipe && this.gameBoard[hoverTile.y][hoverTile.x -1 ].pipe.connectors.includes('right')) {
            const fitting = this.fittingGroup.create(tileCord.x - 1/2 * this.tileLength, tileCord.y, 'pipe_fitting');
            fitting.anchor.setTo(.5);
            fitting.scale.setTo(0.15);
            this.fittings.push(fitting);
        }

        if (hoverTile.x < 4 && pipeConnectors.includes('right') && this.gameBoard[hoverTile.y][hoverTile.x + 1 ].pipe && this.gameBoard[hoverTile.y][hoverTile.x + 1 ].pipe.connectors.includes('left')) {
            const fitting = this.fittingGroup.create(tileCord.x + 1/2 * this.tileLength, tileCord.y, 'pipe_fitting');
            fitting.anchor.setTo(.5);
            fitting.scale.setTo(0.15);
            this.fittings.push(fitting);
        }

        if (hoverTile.x == 4 && pipeConnectors.includes('right') && this.gameBoard[hoverTile.y][hoverTile.x + 1 ]) {
            const fitting = this.fittingGroup.create(tileCord.x + 1/2 * this.tileLength, tileCord.y, 'pipe_fitting');
            fitting.anchor.setTo(.5);
            fitting.scale.setTo(0.15);
            this.fittings.push(fitting);
        }

        if (hoverTile.y > 0 && pipeConnectors.includes('up') && this.gameBoard[hoverTile.y - 1][hoverTile.x].pipe && this.gameBoard[hoverTile.y - 1][hoverTile.x ].pipe.connectors.includes('down')) {
            const fitting = this.fittingGroup.create(tileCord.x, tileCord.y - 1/2 * this.tileLength, 'pipe_fitting');
            fitting.anchor.setTo(.5);
            fitting.scale.setTo(0.15);
            fitting.angle = 90;
            this.fittings.push(fitting);
        }

        if (hoverTile.y < 4 && pipeConnectors.includes('down') && this.gameBoard[hoverTile.y + 1][hoverTile.x].pipe && this.gameBoard[hoverTile.y + 1][hoverTile.x ].pipe.connectors.includes('up')) {
            const fitting = this.fittingGroup.create(tileCord.x, tileCord.y + 1/2 * this.tileLength, 'pipe_fitting');
            fitting.anchor.setTo(.5);
            fitting.scale.setTo(0.15);
            fitting.angle = 90;
            this.fittings.push(fitting);
        }
    }

    /**
     * determine which tile the drag pipe is hovering over when it is dropped
     */
    getHoverTile() {
        for (let y = 0; y < this.gameBoard.length; y++) {
            for (let x = 0; x < this.gameBoard[0].length; x++) {
                if (this.gameBoard[y][x] && this.gameBoard[y][x].tile) {
                    let tile = this.gameBoard[y][x].tile
                    if (this.game.input.x > tile.x - tile.width / 2 && this.game.input.x < tile.x + tile.width / 2 && this.game.input.y > tile.y - tile.width / 2 && this.game.input.y < tile.y + tile.width / 2) return { y: y, x: x };
                }
            }
        }
        return false;
    }

    /**
     *  change grade level to something else
     */
    changeGradeLevel(problems) {
        this.totProblems = _.cloneDeep(problems);
        this.problems = _.cloneDeep(problems);
        this.resetGame();
    }

    /**
     * reset the game so it can start over
     */
    resetGame() {
        this.game.tweens.removeAll();
        this.level = 1;
        this.score = 0;
        this.speed = 1;
        this.scoreText.text = 'Score: ' + this.score;
        this.levelText.text = 'Level: ' + this.level;
        this.clearGame();
        this.setUpGame();
    }
}

