import { Component, ElementRef, ViewChild, Renderer, AfterViewInit, OnDestroy } from '@angular/core';

import * as _ from 'lodash';

// necessary to get phaser to work
import * as PhaserGame from 'phaser-ce';

import { ApiService } from '../../../shared/utils/api.service';

@Component({
  selector: 'sq-apple-drop',
  templateUrl: './apple-drop.component.html',
  styleUrls: ['./apple-drop.component.css']
})
export class AppleDropComponent implements AfterViewInit, OnDestroy {
  
  public bagVelocity = 0;

  public vocabFull;
  public vocabRemaining;
  public word: string[];
  public letterIndex = 0;
  
  public game;
  public startDialog: any = {};
  public apples = [];
  public bagFront;
  public bagBack;
  public arrowKeys;
  public curLetter;
  public livesGroup;
  public appleCount;
  public worm;
  public score = 0;
  public scoreText;
  public isGameOver = false;
  public gameOverDialog: any = {};
  
  public boundaryCollisionGroup;
  public appleCollisionGroup;
  public bagCollisionGroup;
  public bag = [];
  public armColliderRight;
  public armColliderLeft;
  public livesCollisionGroup
  public correctAppleInBag = false;
  public incorrectAppleInBag = false;
  public treeLetters;
  public wormDown = false;
  public gravity = 100;
  public bagSensor;
  public appleTweenTime = 3000;
  public defaultGravity = 100;
  public defaultAappleTweenTime = 3000;
  public gameReady = false;
  public coinsAnim;
  public isStartDialogDisplayed;
  public background;
  public audio;
  public backgroundMusic;

  @ViewChild('game') gameController;

  constructor (public apiService: ApiService) {}

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
      this.game = new PhaserGame.Game(1355, 750, PhaserGame.AUTO, document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this), update: this.update.bind(this)});
  }

  /**
   * load the background image
   */
  preload() {
    this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading/loading_spritesheet.png', 1355, 761, 8);
    this.game.load.spritesheet('loading_start', '../../../assets/games/loading/start.png', 1355, 761, 8);
  }

  /**
   * do stuff before the assets load
   */
  create(){

    // display the background
    this.background = this.game.add.image(0, 0, 'loading_spritesheet');
    const load = this.background.animations.add('load');
    load.play(4, true);
    
    // after the assets load, display things
    this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);

    // get the vocabulary to be used, and the skin color of the arms
    this.gameController.getVocabulary().subscribe(
      vocab => {
        if (vocab.error) console.log(vocab);
        if (vocab.error) return this.gameController.openErrorMessage();
        this.apiService.post('getAvatarSkinColor', {}).subscribe(
          skinColor => {
            if (!skinColor.skin) this.loadAssets(3);
            else this.loadAssets(skinColor.skin);
          },
          error => { return this.gameController.openErrorMessage(); }
        )
    
        // get a copy of the vocabulary to be used
        this.vocabFull = vocab.vocab
        this.vocabRemaining = _.cloneDeep(this.vocabFull);

        // set the arrow keys as inputs
        this.arrowKeys = this.game.input.keyboard.createCursorKeys();
      },
      error => { this.gameController.openErrorMessage(); }
    )
  }

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
      background: this.game.add.audio('background_music'),
      no_apple: this.game.add.audio('no_apple'),
      apple_catch: this.game.add.audio('apple_catch'),
      wrong_apple: this.game.add.audio('wrong_apple'),
    }
    this.background.destroy();
    this.setBackground();
    this.setPhysics();
    this.setCollisionGroups();
    this.displayLives();
    this.setBoundaries();
    this.displayBag();
    this.getNewWord();
    this.displayStartDialog();
    this.displayScoreText();
    this.startBackgroundMusic();
    this.gameReady = true;
  }


  /**
   * load assets
   * @param skinColor - the color of the arms/ hands 
   */
  async loadAssets(skinColor) {
    await this.game.load.image('apple_cap_a', '../../../assets/games/appleDrop/apple_cap_a.png');
    await this.game.load.image('apple_cap_b', '../../../assets/games/appleDrop/apple_cap_b.png');
    await this.game.load.image('apple_cap_c', '../../../assets/games/appleDrop/apple_cap_c.png');
    await this.game.load.image('apple_cap_d', '../../../assets/games/appleDrop/apple_cap_d.png');
    await this.game.load.image('apple_cap_e', '../../../assets/games/appleDrop/apple_cap_e.png');
    await this.game.load.image('apple_cap_f', '../../../assets/games/appleDrop/apple_cap_f.png');
    await this.game.load.image('apple_cap_g', '../../../assets/games/appleDrop/apple_cap_g.png');
    await this.game.load.image('apple_cap_h', '../../../assets/games/appleDrop/apple_cap_h.png');
    await this.game.load.image('apple_cap_i', '../../../assets/games/appleDrop/apple_cap_i.png');
    await this.game.load.image('apple_cap_j', '../../../assets/games/appleDrop/apple_cap_j.png');
    await this.game.load.image('apple_cap_k', '../../../assets/games/appleDrop/apple_cap_k.png');
    await this.game.load.image('apple_cap_l', '../../../assets/games/appleDrop/apple_cap_l.png');
    await this.game.load.image('apple_cap_m', '../../../assets/games/appleDrop/apple_cap_m.png');
    await this.game.load.image('apple_cap_n', '../../../assets/games/appleDrop/apple_cap_n.png');
    await this.game.load.image('apple_cap_o', '../../../assets/games/appleDrop/apple_cap_o.png');
    await this.game.load.image('apple_cap_p', '../../../assets/games/appleDrop/apple_cap_p.png');
    await this.game.load.image('apple_cap_q', '../../../assets/games/appleDrop/apple_cap_q.png');
    await this.game.load.image('apple_cap_r', '../../../assets/games/appleDrop/apple_cap_r.png');
    await this.game.load.image('apple_cap_s', '../../../assets/games/appleDrop/apple_cap_s.png');
    await this.game.load.image('apple_cap_t', '../../../assets/games/appleDrop/apple_cap_t.png');
    await this.game.load.image('apple_cap_u', '../../../assets/games/appleDrop/apple_cap_u.png');
    await this.game.load.image('apple_cap_v', '../../../assets/games/appleDrop/apple_cap_v.png');
    await this.game.load.image('apple_cap_w', '../../../assets/games/appleDrop/apple_cap_w.png');
    await this.game.load.image('apple_cap_x', '../../../assets/games/appleDrop/apple_cap_x.png');
    await this.game.load.image('apple_cap_y', '../../../assets/games/appleDrop/apple_cap_y.png');
    await this.game.load.image('apple_cap_z', '../../../assets/games/appleDrop/apple_cap_z.png');

    await this.game.load.image('apple_low_a', '../../../assets/games/appleDrop/apple_low_a.png');
    await this.game.load.image('apple_low_b', '../../../assets/games/appleDrop/apple_low_b.png');
    await this.game.load.image('apple_low_c', '../../../assets/games/appleDrop/apple_low_c.png');
    await this.game.load.image('apple_low_d', '../../../assets/games/appleDrop/apple_low_d.png');
    await this.game.load.image('apple_low_e', '../../../assets/games/appleDrop/apple_low_e.png');
    await this.game.load.image('apple_low_f', '../../../assets/games/appleDrop/apple_low_f.png');
    await this.game.load.image('apple_low_g', '../../../assets/games/appleDrop/apple_low_g.png');
    await this.game.load.image('apple_low_h', '../../../assets/games/appleDrop/apple_low_h.png');
    await this.game.load.image('apple_low_i', '../../../assets/games/appleDrop/apple_low_i.png');
    await this.game.load.image('apple_low_j', '../../../assets/games/appleDrop/apple_low_j.png');
    await this.game.load.image('apple_low_k', '../../../assets/games/appleDrop/apple_low_k.png');
    await this.game.load.image('apple_low_l', '../../../assets/games/appleDrop/apple_low_l.png');
    await this.game.load.image('apple_low_m', '../../../assets/games/appleDrop/apple_low_m.png');
    await this.game.load.image('apple_low_n', '../../../assets/games/appleDrop/apple_low_n.png');
    await this.game.load.image('apple_low_o', '../../../assets/games/appleDrop/apple_low_o.png');
    await this.game.load.image('apple_low_p', '../../../assets/games/appleDrop/apple_low_p.png');
    await this.game.load.image('apple_low_q', '../../../assets/games/appleDrop/apple_low_q.png');
    await this.game.load.image('apple_low_r', '../../../assets/games/appleDrop/apple_low_r.png');
    await this.game.load.image('apple_low_s', '../../../assets/games/appleDrop/apple_low_s.png');
    await this.game.load.image('apple_low_t', '../../../assets/games/appleDrop/apple_low_t.png');
    await this.game.load.image('apple_low_u', '../../../assets/games/appleDrop/apple_low_u.png');
    await this.game.load.image('apple_low_v', '../../../assets/games/appleDrop/apple_low_v.png');
    await this.game.load.image('apple_low_w', '../../../assets/games/appleDrop/apple_low_w.png');
    await this.game.load.image('apple_low_x', '../../../assets/games/appleDrop/apple_low_x.png');
    await this.game.load.image('apple_low_y', '../../../assets/games/appleDrop/apple_low_y.png');
    await this.game.load.image('apple_low_z', '../../../assets/games/appleDrop/apple_low_z.png');

    await this.game.load.image('twigs_cap_a', '../../../assets/games/appleDrop/twigs_cap_a.png');
    await this.game.load.image('twigs_cap_b', '../../../assets/games/appleDrop/twigs_cap_b.png');
    await this.game.load.image('twigs_cap_c', '../../../assets/games/appleDrop/twigs_cap_c.png');
    await this.game.load.image('twigs_cap_d', '../../../assets/games/appleDrop/twigs_cap_d.png');
    await this.game.load.image('twigs_cap_e', '../../../assets/games/appleDrop/twigs_cap_e.png');
    await this.game.load.image('twigs_cap_f', '../../../assets/games/appleDrop/twigs_cap_f.png');
    await this.game.load.image('twigs_cap_g', '../../../assets/games/appleDrop/twigs_cap_g.png');
    await this.game.load.image('twigs_cap_h', '../../../assets/games/appleDrop/twigs_cap_h.png');
    await this.game.load.image('twigs_cap_i', '../../../assets/games/appleDrop/twigs_cap_i.png');
    await this.game.load.image('twigs_cap_j', '../../../assets/games/appleDrop/twigs_cap_j.png');
    await this.game.load.image('twigs_cap_k', '../../../assets/games/appleDrop/twigs_cap_k.png');
    await this.game.load.image('twigs_cap_l', '../../../assets/games/appleDrop/twigs_cap_l.png');
    await this.game.load.image('twigs_cap_m', '../../../assets/games/appleDrop/twigs_cap_m.png');
    await this.game.load.image('twigs_cap_n', '../../../assets/games/appleDrop/twigs_cap_n.png');
    await this.game.load.image('twigs_cap_o', '../../../assets/games/appleDrop/twigs_cap_o.png');
    await this.game.load.image('twigs_cap_p', '../../../assets/games/appleDrop/twigs_cap_p.png');
    await this.game.load.image('twigs_cap_q', '../../../assets/games/appleDrop/twigs_cap_q.png');
    await this.game.load.image('twigs_cap_r', '../../../assets/games/appleDrop/twigs_cap_r.png');
    await this.game.load.image('twigs_cap_s', '../../../assets/games/appleDrop/twigs_cap_s.png');
    await this.game.load.image('twigs_cap_t', '../../../assets/games/appleDrop/twigs_cap_t.png');
    await this.game.load.image('twigs_cap_u', '../../../assets/games/appleDrop/twigs_cap_u.png');
    await this.game.load.image('twigs_cap_v', '../../../assets/games/appleDrop/twigs_cap_v.png');
    await this.game.load.image('twigs_cap_w', '../../../assets/games/appleDrop/twigs_cap_w.png');
    await this.game.load.image('twigs_cap_x', '../../../assets/games/appleDrop/twigs_cap_x.png');
    await this.game.load.image('twigs_cap_y', '../../../assets/games/appleDrop/twigs_cap_y.png');
    await this.game.load.image('twigs_cap_z', '../../../assets/games/appleDrop/twigs_cap_z.png');

    await this.game.load.image('twigs_low_a', '../../../assets/games/appleDrop/twigs_low_a.png');
    await this.game.load.image('twigs_low_b', '../../../assets/games/appleDrop/twigs_low_b.png');
    await this.game.load.image('twigs_low_c', '../../../assets/games/appleDrop/twigs_low_c.png');
    await this.game.load.image('twigs_low_d', '../../../assets/games/appleDrop/twigs_low_d.png');
    await this.game.load.image('twigs_low_e', '../../../assets/games/appleDrop/twigs_low_e.png');
    await this.game.load.image('twigs_low_f', '../../../assets/games/appleDrop/twigs_low_f.png');
    await this.game.load.image('twigs_low_g', '../../../assets/games/appleDrop/twigs_low_g.png');
    await this.game.load.image('twigs_low_h', '../../../assets/games/appleDrop/twigs_low_h.png');
    await this.game.load.image('twigs_low_i', '../../../assets/games/appleDrop/twigs_low_i.png');
    await this.game.load.image('twigs_low_j', '../../../assets/games/appleDrop/twigs_low_j.png');
    await this.game.load.image('twigs_low_k', '../../../assets/games/appleDrop/twigs_low_k.png');
    await this.game.load.image('twigs_low_l', '../../../assets/games/appleDrop/twigs_low_l.png');
    await this.game.load.image('twigs_low_m', '../../../assets/games/appleDrop/twigs_low_m.png');
    await this.game.load.image('twigs_low_n', '../../../assets/games/appleDrop/twigs_low_n.png');
    await this.game.load.image('twigs_low_o', '../../../assets/games/appleDrop/twigs_low_o.png');
    await this.game.load.image('twigs_low_p', '../../../assets/games/appleDrop/twigs_low_p.png');
    await this.game.load.image('twigs_low_q', '../../../assets/games/appleDrop/twigs_low_q.png');
    await this.game.load.image('twigs_low_r', '../../../assets/games/appleDrop/twigs_low_r.png');
    await this.game.load.image('twigs_low_s', '../../../assets/games/appleDrop/twigs_low_s.png');
    await this.game.load.image('twigs_low_t', '../../../assets/games/appleDrop/twigs_low_t.png');
    await this.game.load.image('twigs_low_u', '../../../assets/games/appleDrop/twigs_low_u.png');
    await this.game.load.image('twigs_low_v', '../../../assets/games/appleDrop/twigs_low_v.png');
    await this.game.load.image('twigs_low_w', '../../../assets/games/appleDrop/twigs_low_w.png');
    await this.game.load.image('twigs_low_x', '../../../assets/games/appleDrop/twigs_low_x.png');
    await this.game.load.image('twigs_low_y', '../../../assets/games/appleDrop/twigs_low_y.png');
    await this.game.load.image('twigs_low_z', '../../../assets/games/appleDrop/twigs_low_z.png');
    switch (skinColor) {
      case 1:
        await this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl01_front.png');
        break;
      case 2:
        await this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl02_front.png');
        break;
      case 3:
        await this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl03_front.png');
        break;
      case 4:
        await this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl04_front.png');
        break;
      case 5:
        await this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl05_front.png');
        break;
      case 6:
        await this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl06_front.png');
        break;
    }

    await this.game.load.image('bag_back', '../../../assets/games/appleDrop/bag_back.png');
    await this.game.load.image('word_box', '../../../assets/games/appleDrop/word_box.jpg');
    await this.game.load.image('life', '../../../assets/games/appleDrop/live.png');
    await this.game.load.image('background', '../../../assets/games/appleDrop/background.jpg');
    await this.game.load.spritesheet('worm_spritesheet', '../../../assets/games/appleDrop/worm_spritesheet.png', 68, 146, 351);
    
    //retrieved from https://loonride.com/tools/physics
    await this.game.load.physics("physics", "https://loonride.com/data/p2/-KvuM0Urb6tBpa8xydUw");

    await this.game.load.audio('apple_catch', '../../../assets/games/appleDrop/audio/apple_catch.ogg');
    await this.game.load.audio('no_apple', '../../../assets/games/appleDrop/audio/no_apple.ogg');
    await this.game.load.audio('wrong_apple', '../../../assets/games/appleDrop/audio/wrong_apple.ogg');
    await this.game.load.audio('background_music', '../../../assets/games/appleDrop/audio/background.ogg');

    this.game.load.start();
  }

  /**
   * display the score text
   */
  displayScoreText() {
  this.scoreText =  this.game.add.text(this.game.width - 40, 40, 'SCORE: ' + this.score, { 
    font: "40px Arial",
    fill: "#cd2f43",
    align: "center"
  });
  this.scoreText.anchor.setTo(1, .5);
  }

  /**
   * when the sidenav is opened, pause the game
   */
  pauseGame() {
    this.game.paused = true;
  }

  /**
   * when the sidenav is closed, pause the game
   */
  playGame() {
    this.game.paused = false;
  }

  /**
   * if a new grade level is selected in the sidenav, change the vocabulary, and reset the game
   * @param event 
   */
  changeGradeLevel(event) {
    this.vocabFull = event;

    // remove the life images
    for(let i = this.livesGroup.children.length - 1; i >= 0; i--) {
      if(this.livesGroup.children[i]) {
        this.livesGroup.children[i].destroy();
      }
    }

    // if the game over dialog is showing, remove it
    if (this.isGameOver) {
     this.removeGameOverDialog();
     this.isGameOver = false;
    }
      
    // if the start dialog is showing, remove it
    else if(this.isStartDialogDisplayed) {
      this.isStartDialogDisplayed = false;
      this.removeStartDialog();
    }

    // reset the game
    this.reset();
  }

  // initial setup of the physics system
  setPhysics() {
    
    //  Enable P2
    this.game.physics.startSystem(PhaserGame.Physics.P2JS);
    this.game.physics.p2.gravity.y = this.gravity;

    //  Turn on impact events for the world, without this we get no collision callbacks
    this.game.physics.p2.setImpactEvents(true);

    // how bouncy physics bodies are
    this.game.physics.p2.restitution = 0.4;
  }

  /**
   * spell out the active word in the branch letters, then hide it
   */
  getBranchLetters() {
    this.treeLetters = this.game.add.group();
    for(let letter of this.word) {
      let treeLetter;
      if (letter === letter.toUpperCase()) treeLetter = this.treeLetters.create(this.treeLetters.width, 37, 'twigs_cap_' + _.toLower(letter));
      else treeLetter = this.treeLetters.create(this.treeLetters.width, 50, 'twigs_low_' + letter);
      treeLetter.alpha = 0;
    }
    this.treeLetters.x = this.game.width/2 - this.treeLetters.width/2
  }

  /**
   * display the lives images
   */
  displayLives() {
     this.livesGroup = this.game.add.group();
     
      //  Create our bag_front sprite
      for( let i = 0; i < 3; i++) {
        const life = this.livesGroup.create((i * 45) + 50, 40, 'life');
        this.game.physics.p2.enable(life);
        life.body.setCollisionGroup(this.livesCollisionGroup);
        life.body.kinematic = true;
      }
  }

  /**
   * when a correct apple is in the bag, show the corresponding letter in the tree
   */
  displayTreeLetter() {
    this.treeLetters.children[this.letterIndex].scale.setTo(0.1);
    this.treeLetters.children[this.letterIndex].alpha = 1;
    let tween = this.game.add.tween(this.treeLetters.children[this.letterIndex].scale).to({x: 1.0, y: 1.0}, 3000, PhaserGame.Easing.Exponential.InOut, true);
  }

  /**
   * after the letter has been spelled out, start a new level
   */
  levelOver() {
    this.score += 20;
    this.updateScoreText();
    this.letterIndex = 0;
    this.gravity += 15;
    this.appleTweenTime > 250 ? this.appleTweenTime -= 250 : this.appleTweenTime = 250;
    this.game.physics.p2.gravity.y = this.gravity;
    this.getNewWord();
    this.displayStartDialog();
  }

  /**
   * update the score text
   */
  updateScoreText() {
    this.scoreText.text = 'SCORE: ' + this.score;
  }

  /**
   * set the ceiling and wall colliders
   */
  setBoundaries() {

    // set the cieling collider
    const ceilingShape = this.game.add.bitmapData(this.game.width + 500, 50);
    const ceiling = this.game.add.sprite(this.game.width/2, -25, ceilingShape);
    this.game.physics.p2.enable(ceiling, false);
    ceiling.body.data.sensor = true;
    ceiling.body.setCollisionGroup(this.boundaryCollisionGroup);
    ceiling.body.collides(this.appleCollisionGroup, function(){}, this);
    ceiling.body.kinematic = true;

    // set the left wall collider
    const wallShape = this.game.add.bitmapData(50, this.game.height + 50);
    const leftWall = this.game.add.sprite(-25, this.game.height/2 - 150, wallShape);
    this.game.physics.p2.enable(leftWall, true);
    leftWall.body.data.sensor = true;
    leftWall.body.setCollisionGroup(this.boundaryCollisionGroup);
    leftWall.body.collides(this.appleCollisionGroup, function(){}, this);
    leftWall.body.kinematic = true;

    // set the right wall collider
    const rightWall = this.game.add.sprite(this.game.width + 25, this.game.height/2 - 150, wallShape);
    this.game.physics.p2.enable(rightWall, true);
    rightWall.body.data.sensor = true;
    rightWall.body.setCollisionGroup(this.boundaryCollisionGroup);
    rightWall.body.collides(this.appleCollisionGroup, function(){}, this);
    rightWall.body.kinematic = true;
  }

  // create collision groups
  setCollisionGroups() {
    //  Create our collision groups. One for the player, one for the pandas
    this.bagCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.appleCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.boundaryCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.livesCollisionGroup = this.game.physics.p2.createCollisionGroup();
  }

  /**
   * destroy an apple
   * @param apple - the apple to destroy
   */
  destroyApple(apple) {
    apple.destroy();
    this.appleCount--;

    // if all of the apple hit the floor, lose a life
    if(!this.appleCount && !this.correctAppleInBag && !this.incorrectAppleInBag) {
      this.audio.no_apple.play();
      this.loseLife();
    }

    // if there are still letters left in the word, display the next apples, otherwise start the next level
    if (!this.appleCount && this.letterIndex < this.word.length) this.displayApples(this.getNextApples());
    else if(!this.appleCount && this.letterIndex == this.word.length) this.levelOver();
  }

  /**
   * remove a life image
   */
  loseLife() {
    const livesLeft = this.livesGroup.children.length - 1
    if(this.livesGroup.children[ livesLeft ]) this.livesGroup.children[ livesLeft ].destroy();
    if(!livesLeft) this.gameOver();
  }

  /**
   * display the game over dialog if there are no more lives left
   */
  gameOver() {
    this.isGameOver = true;

    this.gameOverDialog.dialog = this.game.add.sprite(this.game.width/2, this.game.height/2, 'word_box');
    this.gameOverDialog.dialog.scale.setTo(1.25, 1.4);
    this.gameOverDialog.dialog.anchor.setTo(0.5);
    this.gameOverDialog.dialog.inputEnabled = true;
    this.gameOverDialog.dialogText = this.game.add.text(this.game.width/2, this.game.height/2 - 50, `GAME OVER\nYou Won\n${this.score} Coins`, { 
      font: "50px Arial",
      fill: "#cd2f43",
      wordWrap: true,
      wordWrapWidth: this.gameOverDialog.dialog.width,
      align: "center"
    });
    this.gameOverDialog.dialogText.anchor.set(0.5);

    this.gameOverDialog.playAgainButton = this.game.add.button(this.game.width/2, this.game.height/2 + 100, 'word_box', this.onPlayAgainButton, this);
    this.gameOverDialog.playAgainButton.anchor.set(0.5);
    this.gameOverDialog.playAgainButton.scale.setTo(.4, .25);
    this.gameOverDialog.buttonText = this.game.add.text(this.game.width/2, this.game.height/2 + 100, 'Play Again', {
      font: "25px Arial",
      fill: "#cd2f43",
      wordWrap: true,
      wordWrapWidth: this.gameOverDialog.playAgainButton.width,
      align: "center"
    });
    this.gameOverDialog.buttonText.anchor.set(0.5);
    this.gameController.updateCoins(this.score);
    
  }

  startBackgroundMusic() {
    this.backgroundMusic = this.audio.background;
    this.backgroundMusic.play();
    this.backgroundMusic.volume = 0.5;
    this.backgroundMusic.loopFull(0.5);
}

  /**
   * if the play again button is pressed, reset the game
   */
  onPlayAgainButton() {
    // reset the game
    this.vocabRemaining = _.cloneDeep(this.vocabFull);
    this.removeGameOverDialog();
    this.reset();
    this.isGameOver = false;
  }

  /**
   * reset the game
   */
  reset() {
    // destroy any active levels
    for(let apple of this.apples) {
      if(apple.alive) apple.destroy();
    }
    this.game.tweens.removeAll();
    this.displayLives();
    this.getNewWord();
    this.displayStartDialog();
    this.score = 0;
    this.updateScoreText();
    this.letterIndex = 0;
    if(this.treeLetters && this.treeLetters.children) this.treeLetters.destroy();
    this.getBranchLetters();
    this.appleTweenTime = this.defaultAappleTweenTime;
    this.gravity = this.defaultGravity;
    this.game.physics.p2.gravity.y = this.gravity;
  }

  /**
   * remove the game over dialog
   */
  removeGameOverDialog() {
    this.gameOverDialog.dialog.destroy();
    this.gameOverDialog.dialogText.destroy();
    this.gameOverDialog.playAgainButton.destroy();
    this.gameOverDialog.buttonText.destroy();
  }

  /**
   * move the bag each update
   */
  update() {
    if(!this.gameReady || !this.isGameOver) return;
      for(let apple of this.apples) {
        if(apple.alive && apple.y > this.game.height + 150) {
          this.destroyApple(apple);
        }
      }

      if (this.arrowKeys.left.isDown && this.bagFront.x >= 108)
      {
          this.bagVelocity -= 6;
      }
      else if (this.arrowKeys.right.isDown && this.bagFront.x <= 1245)
      {
        this.bagVelocity += 6;
      }
      else {
        if (this.bagVelocity < 0) this.bagVelocity += 2.25;
        if (this.bagVelocity > 0) this.bagVelocity -= 2.25;
      }

    this.bagFront.body.moveRight(this.bagVelocity);
    this.bagFront.body.angle = (this.game.width/2 -  this.bagFront.x)/100;
    this.bagFront.angle = (this.game.width/2 -  this.bagFront.x)/100;

    this.bagBack.body.moveRight(this.bagVelocity);
    this.bagBack.body.angle = (this.game.width/2 -  this.bagFront.x)/100;
    this.bagBack.angle = (this.game.width/2 -  this.bagFront.x)/100;

    this.bagSensor.body.x = this.bagFront.body.x +  (this.game.width/2 - this.bagFront.x)/65;
    this.bagSensor.body.angle = (this.game.width/2 -  this.bagFront.x)/100;
    this.bagSensor.angle = (this.game.width/2 -  this.bagFront.x)/100;
    
    if (this.bagFront.x <= 108 && this.bagVelocity < 0) {
      this.bagVelocity *= -.8;
    }

    if (this.bagFront.x >= 1245 && this.bagVelocity > 0) {
      this.bagVelocity *= -.80;
    }
  }

  /**
   * dispay the bag
   */
  displayBag() {

    // display the bag
    this.bagBack = this.game.add.sprite(this.game.width/2, 745, 'bag_back')
    this.game.physics.p2.enable(this.bagBack, false);
    this.bagBack.body.fixedRotation = true;
    
    //  display the front of the bag
    this.bagFront = this.game.add.sprite(this.game.width/2, 745, 'bag_front');
    this.game.physics.p2.enable(this.bagFront, false);
    this.bagFront.body.fixedRotation = true;
    
    this.bagFront.body.clearShapes();
    this.bagFront.body.loadPolygon('physics', 'bag_front');

    // set the bag sensor
    var blockShape = this.game.add.bitmapData(50, 35);
    blockShape.ctx.rect(0, 0, 50, 35);
    this.bagSensor = this.game.add.sprite(this.game.width/2, 695, blockShape);
    this.game.physics.p2.enable(this.bagSensor, false);
    this.bagSensor.body.data.sensor = true;
    
    //  Set the bag collisions
    this.bagBack.body.setCollisionGroup(this.bagCollisionGroup);
    this.bagFront.body.setCollisionGroup(this.bagCollisionGroup);
    this.bagSensor.body.setCollisionGroup(this.bagCollisionGroup);
    this.bagSensor.body.collides(this.appleCollisionGroup, this.onAppleInBag, this);
    this.bagFront.body.collides(this.appleCollisionGroup, function(){}, this);

    // make the bag resistant to physics
    this.bagSensor.body.kinematic = true;
    this.bagFront.body.kinematic = true;
    this.bagBack.body.kinematic = true;
  }

  /**
   * logic when an apple goes in the bag
   * @param obj1 - the bag
   * @param obj2 - the apple
   */
  onAppleInBag(obj1, obj2) {

   // logic if the apple is the correct apple, or the incorrect apple
   if (obj2.sprite && obj2.sprite.letter == this.curLetter && !this.incorrectAppleInBag) {
    this.audio.apple_catch.play();
    this.score += 5;
    this.updateScoreText();
    this.correctAppleInBag = true;
    this.displayTreeLetter();
    this.letterIndex++;
   }
   else if(obj2.sprite && !this.incorrectAppleInBag && !this.correctAppleInBag) {
    this.audio.wrong_apple.play();
    this.loseLife();
    this.incorrectAppleInBag = true;
    this.startWormAnim();
  }
   if(obj2.sprite) this.destroyApple(obj2.sprite);
  }

  /**
   * if the wrong apple went in the bag, display the worm animatino
   */
  startWormAnim() {
    this.worm = this.game.add.sprite(this.bagFront.x, 600, 'worm_spritesheet');
    this.wormDown = false;
    
    // do swapping so that the worm is always in front of apples, behind the bag on its way up, and in front of the bag on its way down
    const flip = this.worm.animations.add('flip');
    flip.onComplete.add(this.wormFlipDone, this);
    this.game.world.swap(this.worm, this.bagFront);

    // move the worm up
    let upTween = this.game.add.tween(this.worm).to({y: this.worm.y - 175}, 500, 'Linear', true);

    // when the worm is done moving up do a flip
    upTween.onComplete.add(() => {
      this.wormDown = true;
      this.game.world.swap(this.worm, this.bagFront);

      // play the flip animation
      flip.play(165);
    }, this);
    
  }

  /**
   * when the worm is done with its flip, the worm moves down
   */
  wormFlipDone() {
    let downTween = this.game.add.tween(this.worm).to({y: this.game.height + 100}, 2750, 'Linear', true);

    // destroy the worm when it is done moving down
    downTween.onComplete.add(() => { 
      this.worm.destroy();
    }, this);
  }

  /**
   * get the next apples that will be displayed
   */
  getNextApples() {
    this.curLetter = this.word[this.letterIndex];
    // get capital or lowercase apples
    if (this.word[this.letterIndex] === this.word[this.letterIndex].toUpperCase()) return this.getApples('cap');
    else return this.getApples('low');
  }

  /**
   * display apples
   * @param applesToDisplay - the apples to display
   */
  displayApples(applesToDisplay) {  
    if(this.isGameOver) return;

    // randomize the location of the apples
    const apple0 = this.game.add.sprite( _.random(150, (this.game.width - 100)/3 - 50), _.random(75, 125), applesToDisplay[0].img);
    apple0.letter = applesToDisplay[0].letter
    const apple1 = this.game.add.sprite( _.random((this.game.width- 100)/3 + 50, 2 * (this.game.width - 100)/3 - 50), _.random(75, 125), applesToDisplay[1].img);
    apple1.letter = applesToDisplay[1].letter
    const apple2 = this.game.add.sprite( _.random(2 * (this.game.width - 100)/3 + 50, this.game.width - 100), _.random(75, 125), applesToDisplay[2].img);
    apple2.letter = applesToDisplay[2].letter

    this.apples = [apple0, apple1, apple2];

    this.appleCount = 3;
    this.incorrectAppleInBag = false;
    this.correctAppleInBag = false;

   // set the physics for the apples
   for (let apple of this.apples){
    this.game.physics.p2.enable(apple, false);
    apple.body.clearShapes();
    apple.body.loadPolygon('physics', 'apple');
    
    apple.scale.setTo(0.1);
    apple.body.setCollisionGroup(this.appleCollisionGroup);
    apple.body.collides([this.appleCollisionGroup, this.bagCollisionGroup, this.boundaryCollisionGroup]);
    apple.body.data.gravityScale = 0;
    if (this.worm && this.worm.alive && this.wormDown) this.game.world.swap(apple, this.worm)
    this.game.world.swap(apple, this.bagFront);
    if (this.worm && this.worm.alive && !this.wormDown) this.game.world.swap(apple, this.worm);

    // apple grow tween
    let tween = this.game.add.tween(apple.scale).to({x: 1.0, y: 1.0}, this.appleTweenTime, PhaserGame.Easing.Exponential.InOut, true);
      tween.onComplete.add(() => {
        // after the apple is done growing, apply gravity to it
        apple.body.data.gravityScale = _.random(50, 100)/100;
    }, this);
   }
  }

  /**
   * get the apples that will be displayed for a letter in the word
   * @param capitalization 
   */
  getApples(capitalization) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
    const apples = [];
    _.pull(letters, _.lowerCase(this.curLetter));
    apples.push({ letter: this.curLetter, img: 'apple_' + capitalization + '_' + _.lowerCase(this.curLetter) });

    for (let i = 0; i < 2; i++){
      let index = _.random(letters.length - 1);
      let letter = letters.splice(index, 1)[0];
      apples.push({ letter: letter, img: 'apple_' + capitalization + '_' + letter })
    }

    // randomize the apples so that the correct apple is not always in the same place
    return _.shuffle(apples);
  }

  /**
   * get a new active word
   */
  getNewWord(){
    if (this.vocabRemaining.length == 0) this.vocabRemaining = _.cloneDeep(this.vocabFull);
    this.word = this.vocabRemaining.splice(_.random(this.vocabRemaining.length - 1), 1)[0].word.split('');
  }

  /**
   * set the background of the game
   */
  setBackground(){
    // set the background
    const background = this.game.add.image(0, 0, 'background');
    background.scale.setTo(.68, .5);
  }

  /**
   * display the start dialog
   */
  displayStartDialog(){
    this.isStartDialogDisplayed = true;
    this.startDialog.dialog = this.game.add.sprite(this.game.width/2, this.game.height/2, 'word_box');
    this.startDialog.dialog.anchor.setTo(0.5);
    this.startDialog.dialog.inputEnabled = true;
    this.startDialog.dialogText = this.game.add.text(this.game.width/2, this.game.height/2 - 25, this.word.join(''), { 
      font: "50px Arial",
      fill: "#cd2f43",
      wordWrap: true,
      wordWrapWidth: this.startDialog.dialog.width,
      align: "center"
    });
    this.startDialog.dialogText.anchor.set(0.5);

    this.startDialog.startButton = this.game.add.button(this.game.width/2, this.game.height/2 + 75, 'word_box', this.onStartButton, this);
    this.startDialog.startButton.anchor.set(0.5);
    this.startDialog.startButton.scale.setTo(.25, .25);
    this.startDialog.buttonText = this.game.add.text(this.game.width/2, this.game.height/2 + 75, 'Start', {
      font: "25px Arial",
      fill: "#cd2f43",
      wordWrap: true,
      wordWrapWidth: this.startDialog.startButton.width,
      align: "center"
    });
    this.startDialog.buttonText.anchor.set(0.5);
  }

  /**
   * when the button to start a level is clicked, start the leve
   */
  onStartButton() {
    this.isStartDialogDisplayed = false;
    if(this.treeLetters && this.treeLetters.children) this.treeLetters.destroy();
    this.getBranchLetters();
    this.removeStartDialog();
    const applesToDisplay = this.getNextApples();
    this.displayApples(applesToDisplay);
  }

  /**
   * remove the start dialog
   */
  removeStartDialog() {
    this.startDialog.dialogText.destroy();
    this.startDialog.dialog.destroy();
    this.startDialog.startButton.destroy();
    this.startDialog.buttonText.destroy();
  }
}
