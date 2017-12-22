import { Component, AfterViewInit,  ViewChild } from '@angular/core';
import * as _ from 'lodash'
import * as Phaser from 'phaser-ce';

import { GameComponent } from '../game/game/game.component';


@Component({
    templateUrl: './pipes.component.html',
    styleUrls: ['./pipes.component.css'],
})
export class PipesComponent implements AfterViewInit {

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
    draggingPipe = false;
    gameBoard = [];
    hoverTile: any;
    tileLength = 142.5;
    waterDirection = 'right';

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
        
        this.game.stage.disableVisibilityChange = true;
        // display the background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        const load = this.background.animations.add('load');
        load.play(4, true);

        // after the assets load, display things
         this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);

        this.gameController.getMath().subscribe(
            data => {
                this.totProblems= data.math;
                this.loadAssets();
                },
            error => {
                console.log('error')
            }
        )
    }

    async loadAssets(){
        await this.game.load.image('acid_spill', '../../../assets/games/pipes/acidSpill.png');
        await this.game.load.image('bubbles1', '../../../assets/games/pipes/bubbles_1.png');
        await this.game.load.image('bubbles2', '../../../assets/games/pipes/bubbles_2.png');
        await this.game.load.image('bubbles3', '../../../assets/games/pipes/bubbles_3.png');
        await this.game.load.image('corner_full', '../../../assets/games/pipes/corner_full1.png');
        await this.game.load.image('corner_outer', '../../../assets/games/pipes/corner_outer.png');
        await this.game.load.image('corner_under', '../../../assets/games/pipes/corner_under.png');
        await this.game.load.image('end_pipe_outer', '../../../assets/games/pipes/end_pipe_outer.png');
        await this.game.load.image('end_pipe_under', '../../../assets/games/pipes/end_pipe_under.png');
        await this.game.load.image('lavaSpill', '../../../assets/games/pipes/lavaSpill.png');
        await this.game.load.image('math_title', '../../../assets/games/pipes/math_title.png');
        await this.game.load.image('pipe_fitting', '../../../assets/games/pipes/pipe-fitting.png');
        await this.game.load.image('recycle', '../../../assets/games/pipes/recycle.png');
        await this.game.load.image('rock1', '../../../assets/games/pipes/rock1.png');
        await this.game.load.image('rock2', '../../../assets/games/pipes/rock2.png');
        await this.game.load.image('rock3', '../../../assets/games/pipes/rock3.png');
        await this.game.load.image('straight_full', '../../../assets/games/pipes/straight_full1.png');
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
        await this.game.load.image('board_background', '../../../assets/games/pipes/board_background.png');
        this.game.load.start();
    };

    onAssetsLoaded() {
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

        this.background.destroy();

        const boardbackground = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'board_background').anchor.setTo(0.5);

        this.game.stage.backgroundColor = "#4488AA";
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
        for(let i = 0; i < 3; i++) {
            const pipe = this.addPipeToStorage(i);
            this.pipeStorage.push(pipe);
        }

        // todo: each of the problems should have different solutions

        // todo: make sure at least one of the starting pipes has a left connector

        this.problems = _.sampleSize(this.totProblems, 3);
        this.curProblem = _.sample(this.problems);

        const startRow = _.random(0, 4);
        this.curPipe.y = startRow;
        const startPipeUnder = this.game.add.image(this.game.world.centerX  - 3 * this.tileLength, this.game.world.centerY + (startRow - 2) * this.tileLength, 'end_pipe_under');
        startPipeUnder.anchor.set(0.5);
        startPipeUnder.width = this.tileLength;
        startPipeUnder.height = this.tileLength;
        
        const startWaterBitmap = this.game.add.bitmapData(1, 50);
        startWaterBitmap.fill(64, 164, 223, 1);
        this.startWater = this.game.add.sprite(this.game.world.centerX  - 3 * this.tileLength, this.game.world.centerY + (startRow - 2) * this.tileLength, startWaterBitmap);
        this.startWater.anchor.set(0, 0.5);

        const startPipeOuter = this.game.add.image(this.game.world.centerX  - 3 * this.tileLength, this.game.world.centerY +  (startRow - 2) * this.tileLength, 'end_pipe_outer');
        startPipeOuter.anchor.set(0.5);
        startPipeOuter.width = this.tileLength;
        startPipeOuter.height = this.tileLength;

        const style = { font: "32px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: this.tileLength, align: "center", stroke: '#1f7eff', strokeThickness: 3 };
        const problemText = this.game.add.text(195, this.game.world.centerY + (startRow - 2) * this.tileLength, this.curProblem.solution, style);
        problemText.anchor.set(0.5);

        const waterTween = this.game.add.tween(this.startWater).to( { width: 70 }, 10000, 'Linear', true);
        waterTween.onComplete.add(this.nextWaterPipe, this);
    }

    nextWaterPipe() {
        switch(this.waterDirection) {
            case 'right':
                if (!this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].pipe || !_.includes(this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].pipe.connectors, 'left')) {
                    return;
                }
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water1.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water1.height = 50;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water1.anchor.set(0, 0.5);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water1.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].tile.x - this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].tile.width/2;
                const firstWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water1).to( { width: 100 }, 6000, 'Linear', true);
                firstWaterTween.onComplete.add(function() {
                    this.moveSecondWater(_.without(this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].pipe.connectors, 'left')[0]);
                }, this)
                break;
        }
    }

    moveSecondWater(direction) {
        switch(direction) {
            case 'down':
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.alpha = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.width = 50;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.height = 1;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.anchor.set(0.5, 0);
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].tile.x;
                this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.y = this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].tile.y + 20;
                const secondWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2).to( { height: 50 }, 3000, 'Linear', true);
        }
        
        // this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water2.x = this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].tile.x - this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].tile.width/2;
        // const firstWaterTween = this.game.add.tween(this.gameBoard[ this.curPipe.y ][ this.curPipe.x + 1].water1).to( { width: 100 }, 5000, 'Linear', true);
    }

    addPipeToStorage(index) {
        const pipe =  _.sample(_.difference(this.pipes, this.pipeStorage));
        const pipeImage = this.game.add.image(this.game.world.centerX - 4 * this.tileLength - 25, this.game.world.centerY + (index - 1) * this.tileLength, pipe.fullImg);
        pipeImage.angle = pipe.rotation;
        pipeImage.anchor.setTo(0.5);
        pipeImage.width = this.tileLength;
        pipeImage.height = this.tileLength;

        //  Input Enable the sprites
        pipeImage.inputEnabled = true;

        //  Allow dragging - the 'true' parameter will make the sprite snap to the center
        pipeImage.input.enableDrag(true);

        pipeImage.events.onDragStart.add(this.onDragStart, this);
        pipeImage.events.onDragStop.add(function(dragPipe) { this.onDragStop(pipe, dragPipe) }, this);

        return pipe;
    }

    onDragStart() {
        this.draggingPipe = true;
    }

    onDragStop(pipe, dragPipe) {
        this.draggingPipe = false;
        const tile = this.gameBoard[this.hoverTile.y][this.hoverTile.x].tile
        this.gameBoard[this.hoverTile.y][this.hoverTile.x].pipe = pipe;

        const underPipeImage = this.game.add.image(tile.x, tile.y, pipe.under_img);
        underPipeImage.angle = pipe.rotation;
        underPipeImage.anchor.setTo(0.5);
        underPipeImage.width = this.tileLength;
        underPipeImage.height = this.tileLength;

        const startWaterBitmap = this.game.add.bitmapData(1, 1);
        startWaterBitmap.fill(64, 164, 223, 1);
        const water = this.game.add.sprite(this.game.world.centerX  - (2 - this.hoverTile.x)  * this.tileLength, this.game.world.centerY - (2 - this.hoverTile.y)  * this.tileLength, startWaterBitmap);
        water.alpha = 0;
        water.anchor.set(0);
        this.gameBoard[this.hoverTile.y][this.hoverTile.x].water1 = water;

        const water2 = this.game.add.sprite(this.game.world.centerX  - (2 - this.hoverTile.x)  * this.tileLength, this.game.world.centerY - (2 - this.hoverTile.y)  * this.tileLength, startWaterBitmap);
        water2.alpha = 0;
        water2.anchor.set(0);
        this.gameBoard[this.hoverTile.y][this.hoverTile.x].water2 = water2;

        const outerPipeImage = this.game.add.image(tile.x, tile.y, pipe.outer_img);
        outerPipeImage.angle = pipe.rotation;
        outerPipeImage.anchor.setTo(0.5);
        outerPipeImage.width = this.tileLength;
        outerPipeImage.height = this.tileLength;

        const pipeIndex = _.findIndex(this.pipeStorage, pipe);
        
        const newPipe = this.addPipeToStorage(pipeIndex);
        this.pipeStorage[pipeIndex] = newPipe;

        dragPipe.destroy();
        this.hoverTile = {};
        
    }

    update() {
        for (let y = 0; y < this.gameBoard.length; y++) {
            for (let x = 0; x < this.gameBoard.length; x++) {
                if (this.isPointerIsOverTile(this.gameBoard[y][x].tile)) {
                    this.hoverTile = { x: x, y: y };

                }
            }
        }
    }

    isPointerIsOverTile(tile: any) {
        if (this.game.input.x > tile.x - tile.width / 2 && this.game.input.x < tile.x + tile.width / 2 && this.game.input.y > tile.y - tile.width / 2 && this.game.input.y < tile.y + tile.width / 2) return true;
    }

    changeGradeLevel(equations) {
        this.game.tweens.removeAll();
        this.totProblems = equations;
        // this.reload();
        // if (this.timer) this.timer.destroy();
    }
}

