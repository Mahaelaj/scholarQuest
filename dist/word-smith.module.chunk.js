webpackJsonp(["word-smith.module"],{

/***/ "../../../../../src/app/student/games/word-smith/word-smith.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".title {\r\n    margin: auto;\r\n    display: block;\r\n    margin-bottom: 30px;\r\n    height: 200px;\r\n  }\r\n\r\n.game {\r\n    margin: auto;\r\n    width: 1354px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/word-smith/word-smith.component.html":
/***/ (function(module, exports) {

module.exports = "<img src=\"../../../assets/games/wordSmith/title.png\" class=\"title\">\r\n<sq-game #game (changeGradeLevelEvent)=\"changeGradeLevel($event)\" type=\"vocab\" height=\"950px\">\r\n    <div class=\"game\" id=\"phaser-game-parent\"></div>\r\n</sq-game>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/student/games/word-smith/word-smith.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordSmithComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser_ce__ = __webpack_require__("../../../../phaser-ce/build/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser_ce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__ = __webpack_require__("../../../../../src/app/student/games/game/game/game.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var WordSmithComponent = (function () {
    function WordSmithComponent() {
        this.dropContainers = [];
        this.curVocab = [];
        this.hilts = [];
        this.blades = [];
        this.score = 0;
        this.level = 0;
        this.lives = [];
        this.timeLeft = 0;
        this.gameOverDialog = [];
        this.swordsLeft = 4;
    }
    /**
     * game cleanup
     */
    WordSmithComponent.prototype.ngOnDestroy = function () {
        this.game.destroy();
    };
    /**
    * start the game
    */
    WordSmithComponent.prototype.ngAfterViewInit = function () {
        this.game = new __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Game"](1355, 750, __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["AUTO"], document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this) });
    };
    WordSmithComponent.prototype.preload = function () {
        this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading/loading_spritesheet.png', 1355, 761, 8);
        this.game.load.spritesheet('loading_start', '../../../assets/games/loading/start.png', 1355, 761, 8);
    };
    WordSmithComponent.prototype.create = function () {
        var _this = this;
        // prevent the game from pausing if it is not in focus
        this.game.stage.disableVisibilityChange = true;
        // display the loading background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        var load = this.background.animations.add('load');
        load.play(4, true);
        // after the assets load, display things
        this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);
        this.gameController.getVocabulary().subscribe(function (data) {
            if (data.error)
                console.log(data);
            if (data.error)
                return _this.gameController.openErrorMessage();
            _this.totVocab = data.vocab;
            _this.loadAssets();
        }, function (error) {
            _this.gameController.openErrorMessage();
        });
    };
    WordSmithComponent.prototype.loadAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.game.load.image('hilt1', '../../../assets/games/wordSmith/hilt1.png')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt2', '../../../assets/games/wordSmith/hilt2.png')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt3', '../../../assets/games/wordSmith/hilt3.png')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt4', '../../../assets/games/wordSmith/hilt4.png')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt5', '../../../assets/games/wordSmith/hilt5.png')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt1-gem', '../../../assets/games/wordSmith/hilt1_gem.png')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt2-gem', '../../../assets/games/wordSmith/hilt2_gem.png')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt3-gem', '../../../assets/games/wordSmith/hilt3_gem.png')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt4-gem', '../../../assets/games/wordSmith/hilt4_gem.png')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('hilt5-gem', '../../../assets/games/wordSmith/hilt5_gem.png')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('blade', '../../../assets/games/wordSmith/sword.png')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('flame', '../../../assets/games/wordSmith/flame.png')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('smoke', '../../../assets/games/wordSmith/smoke.jpg')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('smoke-background', '../../../assets/games/wordSmith/smokeBackground.png')];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('play-again-button', '../../../assets/games/wordSmith/playAgainButton.png')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('drop-border', '../../../assets/games/wordSmith/dropBorder.png')];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('hammer', '../../../assets/games/wordSmith/audio/hammer.ogg')];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('background_music', '../../../assets/games/wordSmith/audio/background.ogg')];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('shatter', '../../../assets/games/wordSmith/audio/shatter.ogg')];
                    case 19:
                        _a.sent();
                        this.game.load.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
      * add the start button
      */
    WordSmithComponent.prototype.onAssetsLoaded = function () {
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'loading_start', this.initGame, this);
        button.anchor.setTo(.5, .5);
        button.alpha = 0;
        this.game.add.tween(button).to({ alpha: 1 }, 2000, 'Linear', true);
    };
    WordSmithComponent.prototype.initGame = function () {
        this.background.destroy();
        this.audio = {
            background: this.game.add.audio('background_music'),
            hammer: this.game.add.audio('hammer'),
            shatter: this.game.add.audio('shatter'),
        };
        this.setSmoke();
        this.setFlames();
        this.setScoreText();
        this.setTimerText();
        this.setLives();
        this.startLevel();
        this.startBackgroundMusic();
    };
    WordSmithComponent.prototype.startBackgroundMusic = function () {
        this.backgroundMusic = this.audio.background;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.loopFull(0.5);
    };
    WordSmithComponent.prototype.setSwords = function () {
        var hilts = __WEBPACK_IMPORTED_MODULE_1_lodash__["sampleSize"](['hilt1', 'hilt2', 'hilt3', 'hilt4', 'hilt5'], 4);
        this.hilts = [];
        var gemColors = __WEBPACK_IMPORTED_MODULE_1_lodash__["sampleSize"]([0x8fe9da, 0xffe07e, 0xffcfcf, 0xaff73b], hilts.length);
        var _loop_1 = function (i) {
            var hiltImg = this_1.game.add.image(this_1.game.width - 35, i * this_1.game.height / 5 + ((-2.5 + i) * 20), hilts[i - 1]);
            var hiltGemImg = this_1.game.add.image(this_1.game.width - 35, i * this_1.game.height / 5 + ((-2.5 + i) * 20), hilts[i - 1] + '-gem');
            hiltImg.anchor.setTo(1, 0.5);
            hiltGemImg.anchor.setTo(1, 0.5);
            hiltImg.inputEnabled = true;
            hiltImg.input.enableDrag(true);
            var hilt = { hilt: hiltImg, x: hiltImg.x, y: hiltImg.y, gem: hiltGemImg };
            hiltImg.events.onDragStop.add(function () { this.onDragStop(hilt); }, this_1);
            hiltImg.events.onDragUpdate.add(function () { this.onDragUpdate(hilt); }, this_1);
            this_1.hilts.push(hilt);
            hiltImg.tint = 0x212121;
            hiltGemImg.tint = gemColors[i - 1];
        };
        var this_1 = this;
        for (var i = 1; i <= hilts.length; i++) {
            _loop_1(i);
        }
        this.blades = [];
        for (var i = 1; i <= 4; i++) {
            var blade = this.game.add.image(-70, i * this.game.height / 5 + ((-2.5 + i) * 20), 'blade');
            blade.anchor.setTo(0.5, 0.5);
            blade.scale.setTo(.8);
            blade.tint = 0x212121;
            this.blades.push({ blade: blade });
        }
    };
    WordSmithComponent.prototype.setScoreText = function () {
        var style = { font: "26px Arial", fill: '#fff049', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#ff943f', strokeThickness: 3 };
        this.scoreText = this.game.add.text(this.game.width - 195, 5, 'Score: 0', style);
        this.scoreText.anchor.setTo(1, 0);
    };
    WordSmithComponent.prototype.setTimerText = function () {
        var style = { font: "26px Arial", fill: '#fff049', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#ff943f', strokeThickness: 3 };
        this.timerText = this.game.add.text(165, 5, 'Time: 0', style);
    };
    WordSmithComponent.prototype.startTimer = function () {
        this.timeLeft = 40 - (this.level * 5);
        if (this.timeLeft < 5)
            this.timeLeft = 5;
        this.timerText.text = 'Time: ' + this.timeLeft;
        if (this.timer)
            this.timer.destroy();
        this.timer = this.game.time.create(false);
        // Set a TimerEvent to occur after 1 seconds
        this.timer.loop(1000, this.decrementTimer, this);
        // Start the timer running - this is important!
        // It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    };
    WordSmithComponent.prototype.decrementTimer = function () {
        this.timeLeft--;
        this.timerText.text = 'Time: ' + this.timeLeft;
        if (this.timeLeft == 0)
            this.loseGame();
    };
    WordSmithComponent.prototype.loseGame = function () {
        this.hilts.forEach(function (hilt) { return hilt.hilt.inputEnabled = false; });
        var background = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'smoke-background');
        background.anchor.setTo(0.5);
        background.scale.setTo(2.25);
        var style = { font: "32px Arial", fill: '#fff049', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#ff943f', strokeThickness: 3 };
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 40, "Well Done\nYou Won\n" + this.score + " Coins", style);
        text.anchor.setTo(0.5);
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 90, 'play-again-button', this.resetGame, this);
        button.anchor.setTo(0.5);
        button.width = 200;
        button.height = 75;
        var playAgaintext = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 90, "Play Again", style);
        playAgaintext.anchor.setTo(0.5);
        this.timer.destroy();
        this.gameOverDialog = [background, text, button, playAgaintext];
        this.gameController.updateCoins(this.score);
    };
    WordSmithComponent.prototype.resetGame = function () {
        this.gameOverDialog.forEach(function (dialogPiece) { return dialogPiece.destroy(); });
        this.hilts.forEach(function (hilt) { hilt.hilt.destroy(); hilt.text.destroy(); hilt.gem.destroy(); });
        this.blades.forEach(function (blade) { blade.blade.destroy(); blade.text.destroy(); });
        this.dropContainers.forEach(function (container) { return container.destroy(); });
        this.lives.forEach(function (life) { return life.destroy(); });
        this.level = 0;
        this.score = 0;
        this.scoreText.text = 'Score: 0';
        this.setLives();
        this.startLevel();
    };
    WordSmithComponent.prototype.setDropContainers = function () {
        this.dropContainers = [];
        for (var i = 1; i <= 4; i++) {
            var container = this.game.add.image(this.game.world.centerX - 105, i * this.game.height / 5 + ((-2.5 + i) * 20), 'drop-border');
            container.anchor.setTo(0.5, 0.5);
            container.scale.setTo(1.033);
            this.dropContainers.push(container);
            container.alpha = 0;
            container.dropActive = true;
            this.game.add.tween(container).to({ alpha: 1 }, 1000, 'Linear', true);
        }
    };
    WordSmithComponent.prototype.setSmoke = function () {
        this.smokeGroup = this.game.add.group();
        var smoke = this.smokeGroup.create(0, -611, 'smoke');
        smoke.scale.setTo(1.33);
        this.setNextSmoke(smoke);
    };
    WordSmithComponent.prototype.setNextSmoke = function (oldSmoke) {
        var newSmoke = this.smokeGroup.create(0, this.game.world.height, 'smoke');
        newSmoke.scale.setTo(1.33);
        var newSmokeMovementTween = this.game.add.tween(newSmoke).to({ y: -611 }, 176000, 'Linear', true);
        newSmokeMovementTween.onComplete.add(function () { this.setNextSmoke(newSmoke); }, this);
        var oldSmokeMovementTween = this.game.add.tween(oldSmoke).to({ y: -1600 }, 128000, 'Linear', true);
        oldSmokeMovementTween.onComplete.add(function () { oldSmoke.destroy(); });
    };
    WordSmithComponent.prototype.setFlames = function () {
        var _loop_2 = function (i) {
            var flame = this_2.game.add.image(i * 300 + 125, 550, 'flame');
            flame.anchor.setTo(0.5, 0.5);
            flame.angle = 10;
            this_2.game.time.events.add(i * 200, function () { this.moveFlameDown(flame, 550); }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < 5; i++) {
            _loop_2(i);
        }
        var _loop_3 = function (i) {
            var flame = this_3.game.add.image(i * 300, 800, 'flame');
            flame.anchor.setTo(0.5, 0.5);
            flame.angle = -10;
            this_3.game.time.events.add(i * 200, function () { this.moveFlameUp(flame, 700); }, this_3);
        };
        var this_3 = this;
        for (var i = 0; i < 5; i++) {
            _loop_3(i);
        }
    };
    WordSmithComponent.prototype.onDragStop = function (hilt) {
        var _this = this;
        var _loop_4 = function (i) {
            var container = this_4.dropContainers[i];
            if (container.dropActive && this_4.game.input.x > container.x - .5 * container.width && this_4.game.input.x < container.x + .5 * container.width && this_4.game.input.y < container.y + .5 * container.height && this_4.game.input.y > container.y - .5 * container.height) {
                hilt.hilt.anchor.setTo(0.5);
                hilt.gem.anchor.setTo(0.5);
                hilt.hilt.x = container.x;
                hilt.hilt.y = container.y;
                hilt.text.x = container.x;
                hilt.text.y = container.y;
                hilt.gem.x = hilt.hilt.x;
                hilt.gem.y = hilt.hilt.y;
                if (__WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this_4.curVocab, { word: hilt.text.text }).definition == this_4.blades[i].text.text) {
                    this_4.audio.hammer.play();
                    var movementTween = this_4.game.add.tween(hilt.hilt).to({ x: 540 }, 2000, 'Linear', true);
                    this_4.game.add.tween(hilt.gem).to({ x: 540 }, 2000, 'Linear', true);
                    this_4.game.add.tween(hilt.text).to({ x: 540 }, 2000, 'Linear', true);
                    movementTween.onComplete.add(function () { this.moveSwordLeft(hilt, this.blades[i]); }, this_4);
                    this_4.game.add.tween(container).to({ alpha: 0 }, 1000, 'Linear', true);
                    this_4.score += 5;
                    this_4.scoreText.text = 'Score: ' + this_4.score;
                    container.dropActive = false;
                }
                else {
                    hilt.hilt.tint = 0x212121;
                    hilt.gem.tint = 0x212121;
                    hilt.text.destroy();
                    var swordTween_1 = this_4.game.add.tween(hilt.hilt).to({ y: 1000 }, 1000, 'Linear', true);
                    this_4.game.add.tween(hilt.gem).to({ y: 1000 }, 1000, 'Linear', true);
                    this_4.game.add.tween(hilt.gem).to({ y: 1000 }, 1000, 'Linear', true);
                    this_4.game.add.tween(hilt.hilt).to({ angle: 90 }, 1000, 'Linear', true);
                    var definitionToRemove_1 = __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this_4.curVocab, { word: hilt.text.text }).definition;
                    this_4.blades.forEach(function (blade, k) {
                        if (blade.text.text != definitionToRemove_1)
                            return;
                        _this.audio.shatter.play();
                        blade.blade.tint = 0x212121;
                        _this.game.add.tween(blade.blade).to({ y: 1000 }, 1000, 'Linear', true);
                        _this.game.add.tween(blade.blade).to({ angle: -90 }, 1000, 'Linear', true);
                        blade.text.destroy();
                        _this.game.add.tween(_this.dropContainers[k]).to({ alpha: 0 }, 1000, 'Linear', true);
                        _this.loseLife();
                        swordTween_1.onComplete.add(function () { _this.destroySword(hilt, blade); }, _this);
                        _this.dropContainers[k].dropActive = false;
                    });
                }
                return { value: void 0 };
            }
        };
        var this_4 = this;
        for (var i = 0; i < this.dropContainers.length; i++) {
            var state_1 = _loop_4(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        hilt.hilt.x = hilt.x;
        hilt.hilt.y = hilt.y;
        hilt.text.x = this.game.width - 270;
        hilt.text.y = hilt.y;
        hilt.gem.x = hilt.x;
        hilt.gem.y = hilt.y;
    };
    WordSmithComponent.prototype.destroySword = function (hilt, blade) {
        hilt.hilt.destroy();
        hilt.text.destroy();
        blade.blade.destroy();
        blade.text.destroy();
        hilt.gem.destroy();
        this.swordsLeft--;
        if (this.swordsLeft == 0)
            this.nextLevel();
    };
    WordSmithComponent.prototype.nextLevel = function () {
        this.timer.destroy();
        this.level++;
        this.startLevel();
    };
    WordSmithComponent.prototype.loseLife = function () {
        var flame = this.lives.pop();
        flame.destroy();
        if (!this.lives.length)
            this.loseGame();
    };
    WordSmithComponent.prototype.moveSwordLeft = function (hilt, blade) {
        var _this = this;
        var swordTween = this.game.add.tween(hilt.hilt).to({ x: -200 }, 2000, 'Linear', true);
        this.game.add.tween(hilt.text).to({ x: -200 }, 2000, 'Linear', true);
        this.game.add.tween(hilt.gem).to({ x: -200 }, 2000, 'Linear', true);
        this.game.add.tween(blade.blade).to({ x: -796 }, 2000, 'Linear', true);
        this.game.add.tween(blade.text).to({ x: -795 }, 2000, 'Linear', true);
        swordTween.onComplete.add(function () {
            _this.destroySword(hilt, blade);
        }, this);
    };
    WordSmithComponent.prototype.onDragUpdate = function (hilt) {
        hilt.text.x = hilt.hilt.x - 225;
        hilt.text.y = hilt.hilt.y;
        hilt.gem.x = hilt.hilt.x;
        hilt.gem.y = hilt.hilt.y;
    };
    WordSmithComponent.prototype.moveFlameUp = function (flame, yCord) {
        var angleTween = this.game.add.tween(flame).to({ angle: 10 }, 4000, 'Linear', true);
        var movementTween = this.game.add.tween(flame).to({ y: yCord - 25 }, 2000, 'Back.easeInOut', true);
        movementTween.onComplete.add(function () { this.game.add.tween(flame).to({ y: yCord }, 2000, 'Back.easeInOut', true); }, this);
        angleTween.onComplete.add(function () { this.moveFlameDown(flame, yCord); }, this);
    };
    WordSmithComponent.prototype.moveFlameDown = function (flame, yCord) {
        var angleTween = this.game.add.tween(flame).to({ angle: -10 }, 4000, 'Linear', true);
        var movementTween = this.game.add.tween(flame).to({ y: yCord + 25 }, 2000, 'Back.easeInOut', true);
        movementTween.onComplete.add(function () { this.game.add.tween(flame).to({ y: yCord }, 2000, 'Back.easeInOut', true); }, this);
        angleTween.onComplete.add(function () { this.moveFlameUp(flame, yCord); }, this);
    };
    WordSmithComponent.prototype.setVocabulary = function () {
        this.curVocab = __WEBPACK_IMPORTED_MODULE_1_lodash__["sampleSize"](this.totVocab, 4);
        var words = __WEBPACK_IMPORTED_MODULE_1_lodash__["map"](this.curVocab, function (vocab) { return vocab.word; });
        words = __WEBPACK_IMPORTED_MODULE_1_lodash__["shuffle"](words);
        var definitions = __WEBPACK_IMPORTED_MODULE_1_lodash__["map"](this.curVocab, function (vocab) { return vocab.definition; });
        definitions = __WEBPACK_IMPORTED_MODULE_1_lodash__["shuffle"](definitions);
        for (var i = 1; i <= definitions.length; i++) {
            var style = { font: "20px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#565656', strokeThickness: 3 };
            var definitionText = this.game.add.text(160, i * this.game.height / 5 + ((-2.5 + i) * 20), definitions[i - 1], style);
            definitionText.anchor.set(0.5, 0.5);
            this.blades[i - 1].text = definitionText;
            definitionText.tint = 0x181818;
        }
        for (var i = 1; i <= words.length; i++) {
            var style = { font: "20px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: 315, align: "center", stroke: '#565656', strokeThickness: 3 };
            var wordText = this.game.add.text(this.game.width - 270, i * this.game.height / 5 + ((-2.5 + i) * 20), words[i - 1], style);
            wordText.anchor.set(0.5, 0.5);
            this.hilts[i - 1].text = wordText;
            wordText.tint = 0x181818;
        }
    };
    WordSmithComponent.prototype.setLives = function () {
        var flame = this.game.add.image(70, 10, 'flame');
        flame.scale.setTo(0.05);
        var flame2 = this.game.add.image(85, 10, 'flame');
        flame2.scale.setTo(0.05);
        var flame3 = this.game.add.image(100, 10, 'flame');
        flame3.scale.setTo(0.05);
        this.lives = [flame, flame2, flame3];
    };
    WordSmithComponent.prototype.startLevel = function () {
        var _this = this;
        this.swordsLeft = 4;
        this.setSwords();
        this.setDropContainers();
        this.setVocabulary();
        this.hilts.forEach(function (hilt) { _this.fadeInImage(hilt.hilt, 0x212121); _this.fadeInImage(hilt.text, 0x181818); });
        this.blades.forEach(function (blade) { _this.fadeInImage(blade.blade, 0x212121); _this.fadeInImage(blade.text, 0x181818); });
        this.startTimer();
    };
    WordSmithComponent.prototype.fadeInImage = function (obj, startColor) {
        // create a step object
        var colorBlend = { step: 0 };
        // create a tween to increment that step from 0 to 100.
        var colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, 1000, __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Easing"].Linear.None);
        // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
        colorTween.onUpdateCallback(function () {
            obj.tint = __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Color"].interpolateColor(startColor, 0xffffff, 100, colorBlend.step);
        });
        // finally, start the tween
        colorTween.start();
    };
    WordSmithComponent.prototype.changeGradeLevel = function (vocab) {
        this.totVocab = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](vocab);
        this.resetGame();
    };
    return WordSmithComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('game'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__["a" /* GameComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__["a" /* GameComponent */]) === "function" && _a || Object)
], WordSmithComponent.prototype, "gameController", void 0);
WordSmithComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/student/games/word-smith/word-smith.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/word-smith/word-smith.component.css")],
    })
], WordSmithComponent);

var _a;
//# sourceMappingURL=word-smith.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/word-smith/word-smith.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WordSmithModule", function() { return WordSmithModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_game_module__ = __webpack_require__("../../../../../src/app/student/games/game/game.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__word_smith_component__ = __webpack_require__("../../../../../src/app/student/games/word-smith/word-smith.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__word_smith_component__["a" /* WordSmithComponent */] },
    { path: 'word-smith', component: __WEBPACK_IMPORTED_MODULE_6__word_smith_component__["a" /* WordSmithComponent */] }
];
var WordSmithModule = (function () {
    function WordSmithModule() {
    }
    return WordSmithModule;
}());
WordSmithModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_5__game_game_module__["a" /* GameModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__word_smith_component__["a" /* WordSmithComponent */]
        ]
    })
], WordSmithModule);

//# sourceMappingURL=word-smith.module.js.map

/***/ })

});
//# sourceMappingURL=word-smith.module.chunk.js.map