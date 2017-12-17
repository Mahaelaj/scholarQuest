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
    equations: any[];
    terrainImages: any[];
    terrainTopImages: any[];
    pipeStorage = [];
    pipes: any;

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
        this.game.load.start();
    };

    onAssetsLoaded() {
        this.terrainImages = [ 'terrain1', 'terrain2', 'terrain3', 'terrain4', 'terrain5' ];
        this.terrainTopImages = [ 'terrain_grass1', 'terrain_grass2', 'terrain_grass3' ];

        this.pipes = [
            { fullImg: 'corner_full', rotation: 0 },
            { fullImg: 'corner_full', rotation: 90 },
            { fullImg: 'corner_full', rotation: 180 },
            { fullImg: 'corner_full', rotation: 270 },
            { fullImg: 'straight_full', rotation: 0 },
            { fullImg: 'straight_full', rotation: 180 },
        ];

        this.pipeStorage = _.sampleSize(this.pipes, 3);

        const tileLength = 145;
        this.background.destroy();
        this.game.stage.backgroundColor = "#4488AA";
        for (let y = 0; y < 5; y++){
            for (let x = 0; x < 5; x++) {
                const boardTile = this.game.add.image(this.game.world.centerX + (x - 2) * tileLength, this.game.world.centerY + (y - 2) * tileLength, !y ? _.sample(this.terrainTopImages) : _.sample(this.terrainImages));
                boardTile.anchor.setTo(0.5);
                boardTile.width = tileLength;
                boardTile.height = tileLength;
            }
        }

        for
    }

    update() {
    }

    changeGradeLevel(equations) {
        this.game.tweens.removeAll();
        this.totProblems = equations;
        // this.reload();
        // if (this.timer) this.timer.destroy();
    }
}

