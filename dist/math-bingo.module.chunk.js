webpackJsonp(["math-bingo.module"],{

/***/ "../../../../../src/app/student/games/math-bingo/math-bingo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".title {\r\n    margin: auto;\r\n    display: block;\r\n    margin-bottom: 30px;\r\n    height: 200px;\r\n  }\r\n\r\n.game {\r\n    margin: auto;\r\n    width: 1354px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/math-bingo/math-bingo.component.html":
/***/ (function(module, exports) {

module.exports = "<img src=\"../../../assets/games/mathBingo/title.png\" class=\"title\">\r\n\r\n<sq-game #game (changeGradeLevelEvent)=\"changeGradeLevel($event)\" type=\"math\" height=\"950px\">\r\n    <div class=\"game\" id=\"phaser-game-parent\"></div>\r\n</sq-game>\r\n"

/***/ }),

/***/ "../../../../../src/app/student/games/math-bingo/math-bingo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MathBingoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__ = __webpack_require__("../../../../../src/app/student/games/game/game/game.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_phaser_ce__ = __webpack_require__("../../../../phaser-ce/build/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_phaser_ce__);
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





var MathBingoComponent = (function () {
    function MathBingoComponent(renderer, apiService) {
        this.renderer = renderer;
        this.apiService = apiService;
        this.equations = [];
        this.score = 0;
        this.secondsPerProblem = 20;
        this.totEquations = [];
        this.moonCards = [];
        this.twinkleElems = [];
        this.swirls = [];
        this.timeLeft = 0;
        this.gameBoard = [];
        this.endGameDialog = { dialogBackground: null, dialogText: null, playAgainButton: null, buttonText: null };
        this.buttonTexts = [];
        this.canSelectTile = false;
    }
    /**
     * game cleanup
     */
    MathBingoComponent.prototype.ngOnDestroy = function () {
        this.game.destroy();
    };
    /**
    * start the game
    */
    MathBingoComponent.prototype.ngAfterViewInit = function () {
        this.game = new __WEBPACK_IMPORTED_MODULE_4_phaser_ce__["Game"](1355, 750, __WEBPACK_IMPORTED_MODULE_4_phaser_ce__["AUTO"], document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this), update: this.update.bind(this) });
    };
    MathBingoComponent.prototype.preload = function () {
        this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading/loading_spritesheet.png', 1355, 761, 8);
        this.game.load.spritesheet('loading_start', '../../../assets/games/loading/start.png', 1355, 761, 8);
    };
    MathBingoComponent.prototype.create = function () {
        var _this = this;
        // prevent the game from pausing when the game is not in focus
        this.game.stage.disableVisibilityChange = true;
        // display the loading background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        var load = this.background.animations.add('load');
        load.play(4, true);
        // after the assets load, display things
        this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);
        // get the math problems
        this.gameController.getMath().subscribe(function (data) {
            if (data.error)
                console.log(data);
            if (data.error)
                return _this.gameController.openErrorMessage();
            _this.totEquations = data.math;
            _this.loadAssets();
        }, function (error) {
            _this.gameController.openErrorMessage();
        });
    };
    MathBingoComponent.prototype.loadAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.game.load.image('bingo_card', '../../../assets/games/mathBingo/bingoCard.png')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('background', '../../../assets/games/mathBingo/background.jpg')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('crystal_ball_back', '../../../assets/games/mathBingo/crystalBallBack.png')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('crystal_ball_front', '../../../assets/games/mathBingo/crystalBallFront.png')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('crystal_ball_stand', '../../../assets/games/mathBingo/crystalBallStand.png')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('dialog_background', '../../../assets/games/mathBingo/dialogBackground.png')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('swirl', '../../../assets/games/mathBingo/swirlWhite.png')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('bingoCardCell', '../../../assets/games/mathBingo/bingoCardCell.png')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('gold_button', '../../../assets/games/mathBingo/goldButton.jpg')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard1', '../../../assets/games/mathBingo/moonCards/moonCard1.png')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard2', '../../../assets/games/mathBingo/moonCards/moonCard2.png')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard3', '../../../assets/games/mathBingo/moonCards/moonCard3.png')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard4', '../../../assets/games/mathBingo/moonCards/moonCard4.png')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard5', '../../../assets/games/mathBingo/moonCards/moonCard5.png')];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard6', '../../../assets/games/mathBingo/moonCards/moonCard6.png')];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard7', '../../../assets/games/mathBingo/moonCards/moonCard7.png')];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard8', '../../../assets/games/mathBingo/moonCards/moonCard8.png')];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard9', '../../../assets/games/mathBingo/moonCards/moonCard9.png')];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard10', '../../../assets/games/mathBingo/moonCards/moonCard10.png')];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard11', '../../../assets/games/mathBingo/moonCards/moonCard11.png')];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard12', '../../../assets/games/mathBingo/moonCards/moonCard12.png')];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard13', '../../../assets/games/mathBingo/moonCards/moonCard13.png')];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard14', '../../../assets/games/mathBingo/moonCards/moonCard14.png')];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard15', '../../../assets/games/mathBingo/moonCards/moonCard15.png')];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.image('moonCard16', '../../../assets/games/mathBingo/moonCards/moonCard16.png')];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('card_reveal', '../../../assets/games/mathBingo/audio/card_reveal.ogg')];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('background_music', '../../../assets/games/mathBingo/audio/background.ogg')];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('select_correct', '../../../assets/games/mathBingo/audio/select_correct.ogg')];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, this.game.load.audio('select_incorrect', '../../../assets/games/mathBingo/audio/select_incorrect.ogg')];
                    case 29:
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
    MathBingoComponent.prototype.onAssetsLoaded = function () {
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'loading_start', this.initGame, this);
        button.anchor.setTo(.5, .5);
        button.alpha = 0;
        this.game.add.tween(button).to({ alpha: 1 }, 2000, 'Linear', true);
    };
    MathBingoComponent.prototype.initGame = function () {
        this.audio = {
            card_reveal: this.game.add.audio('card_reveal'),
            background: this.game.add.audio('background_music'),
            select_correct: this.game.add.audio('select_correct'),
            select_incorrect: this.game.add.audio('select_incorrect')
        };
        // get 24 solutions for the gameboard
        this.equations = __WEBPACK_IMPORTED_MODULE_1_lodash__["sampleSize"](this.totEquations, 24);
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
        var _loop_1 = function (k) {
            var y = 45 + (k * 133.7);
            this_1.gameBoard.push([{ selected: false }, { selected: false }, { selected: false }, { selected: false }, { selected: false }]);
            var _loop_2 = function (i) {
                var x = 588 + (i * 133.5);
                if (k * 5 + i != 12) {
                    var equationIndex = k * 5 + i > 12 ? k * 5 + i - 1 : k * 5 + i;
                    var buttonText_1;
                    var button = this_1.game.add.button(x, y, 'bingoCardCell', function () { this.tileSelected(buttonText_1, { col: i, row: k }); }, this_1);
                    var style_1 = { font: "32px Arial", fill: '#ffffff', wordWrap: true, wordWrapWidth: button.width, align: "center", stroke: '#1f7eff', strokeThickness: 3 };
                    buttonText_1 = this_1.game.add.text(x + button.width / 2, y + button.height / 2, this_1.equations[equationIndex].solution, style_1);
                    buttonText_1.tint = 0x2080ff;
                    buttonText_1.anchor.set(0.5);
                    buttonText_1.index = k * 5 + i;
                    this_1.buttonTexts.push(buttonText_1);
                    this_1.twinkleElems.push(buttonText_1);
                }
                // add moon cards 
                var moonCard = 'moonCard' + ((k * 5 + i + 1) > 16 ? (k * 5 + i + 1) - 16 : (k * 5 + i + 1));
                var moonCardSprite = this_1.game.add.image(x, y, moonCard);
                moonCardSprite.scale.setTo(.25, .25);
                this_1.moonCards.push(moonCardSprite);
            };
            for (var i = 0; i < 5; i++) {
                _loop_2(i);
            }
        };
        var this_1 = this;
        // set up the bing card
        for (var k = 0; k < 5; k++) {
            _loop_1(k);
        }
        // set the fress space
        this.gameBoard[2][2].selected = true;
        this.gameBoard[2][2].swirl = this.centerSwirl;
        // add the bingo card
        var bingoCard = this.game.add.image(this.game.world.width - 100, this.game.world.centerY, 'bingo_card');
        bingoCard.scale.setTo(.33, .33);
        bingoCard.anchor.setTo(1, .5);
        // add the crystal ball
        var crystalBallBack = this.game.add.image(125, this.game.world.centerY - 60, 'crystal_ball_back');
        crystalBallBack.scale.setTo(.17, .17);
        crystalBallBack.anchor.setTo(0, .5);
        // add the text to the crystal ball
        this.problemText = this.game.add.text(crystalBallBack.x + (crystalBallBack.width / 2), crystalBallBack.y, '', { font: "32px Arial" });
        this.problemText.anchor.setTo(.5, .5);
        // add the front of the crystal ball
        var crystalBallFront = this.game.add.image(125, this.game.world.centerY - 60, 'crystal_ball_front');
        crystalBallFront.scale.setTo(.17, .17);
        crystalBallFront.anchor.setTo(0, .5);
        // add the crystal ball stand
        var crystalBallStand = this.game.add.image(40, this.game.world.centerY + 215, 'crystal_ball_stand');
        crystalBallStand.scale.setTo(.17, .17);
        crystalBallStand.anchor.setTo(0, .5);
        // add the score and timer texts
        var style = { font: "50px Arial", fill: "#884dd9", stroke: '#5000bd', strokeThickness: 5 };
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
    };
    /**
     * make the solutions twinkle
     */
    MathBingoComponent.prototype.startTwinkleTint = function () {
        this.twinkleTimer = this.game.time.create(false);
        this.twinkleTimer.loop(1000, this.twinkleTint, this);
        this.twinkleTimer.start();
    };
    /**
     * fade the mooncards at the start of the game
     */
    MathBingoComponent.prototype.fadeMooncards = function () {
        // play the card reveal sound 
        this.audio.card_reveal.play();
        // fade out the mooncards
        for (var i = this.moonCards.length - 1; i >= 0; i--) {
            var delayTime = (this.moonCards.length - 1 - i) / 5 * 1000;
            this.game.add.tween(this.moonCards[i]).to({ alpha: 0 }, 2000, 'Linear', true, delayTime);
        }
    };
    /**
     * start timer for 20 seconds to solve the current problem
     */
    MathBingoComponent.prototype.startTimer = function () {
        this.canSelectTile = true;
        this.timeLeft = this.secondsPerProblem;
        this.updateTimerText();
        if (this.timer)
            this.timer.destroy();
        this.timer = this.game.time.create(false);
        this.timeLeft = 20;
        // Set a TimerEvent to occur after 1 seconds
        this.timer.loop(1000, this.decrementTimer, this);
        // Start the timer running - this is important!
        // It won't start automatically, allowing you to hook it to button events and the like.
        this.timer.start();
    };
    /**
     * decrement timer
     */
    MathBingoComponent.prototype.decrementTimer = function () {
        this.timeLeft--;
        if (this.timeLeft >= 0) {
            // update the timer text
            this.updateTimerText();
            return;
        }
        this.timer.destroy();
        // lose three points if the timer runs out and updatde the current problem 
        this.updateScore(-3);
        this.updateProblem();
    };
    /**
     * fade out the current problem and get a new problem
     */
    MathBingoComponent.prototype.updateProblem = function () {
        var tween = this.game.add.tween(this.problemText).to({ alpha: 0 }, 1000, 'Linear', true);
        tween.onComplete.add(this.setCurrentEquation, this);
    };
    /**
     * update the score and score text
     */
    MathBingoComponent.prototype.updateScore = function (points) {
        this.score += points;
        if (this.score < 0)
            this.score = 0;
        this.scoreText.setText('Score: ' + this.score);
    };
    /**
     * update the time text
     */
    MathBingoComponent.prototype.updateTimerText = function () {
        this.timerText.setText('Time: ' + this.timeLeft);
    };
    /**
     * make a solution fade from blue to white to blue
     */
    MathBingoComponent.prototype.twinkleTint = function () {
        var _this = this;
        if (!this.twinkleElems.length)
            return;
        var twinkleElem = this.twinkleElems.splice(__WEBPACK_IMPORTED_MODULE_1_lodash__["random"](0, this.twinkleElems.length - 1), 1)[0];
        this.tweenTint(twinkleElem, 0x2080ff, 0xffffff, 2000, 0, function () {
            _this.tweenTint(twinkleElem, 0xffffff, 0x2080ff, 2000, 0, function () {
                _this.twinkleElems.push(twinkleElem);
            });
        });
    };
    /**
     * interpolate the color on an object
     */
    MathBingoComponent.prototype.tweenTint = function (obj, startColor, endColor, time, delay, callback) {
        if (time === void 0) { time = 250; }
        if (delay === void 0) { delay = 0; }
        if (callback === void 0) { callback = null; }
        // create a step object
        var colorBlend = {
            step: 0
        };
        // create a tween to increment that step from 0 to 100.
        var colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, time, __WEBPACK_IMPORTED_MODULE_4_phaser_ce__["Easing"].Linear.None, delay);
        // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
        colorTween.onUpdateCallback(function () {
            obj.tint = __WEBPACK_IMPORTED_MODULE_4_phaser_ce__["Color"].interpolateColor(startColor, endColor, 100, colorBlend.step);
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
    };
    /**
     * check if the tile seleected is the correct tile
     */
    MathBingoComponent.prototype.tileSelected = function (buttonText, buttonIndex) {
        // only let tiles be selected if the timer is runnint
        if (!this.timer || !this.timer.running)
            return;
        // if the tile selected is the correct solution
        if (buttonText.text == this.currEquation.solution) {
            // play select correct audio
            this.audio.select_correct.play();
            // don't select tile if the countdown has started, or if it has already been selected
            if (!this.canSelectTile)
                return;
            // don't select the tile again
            this.canSelectTile = false;
            // stop the timer
            if (this.timer)
                this.timer.destroy();
            // give the user 5 points
            this.updateScore(5);
            // add a swirl to the tile to mark it
            var swirl = this.setSolutionToSwirl(buttonText);
            this.gameBoard[buttonIndex.col][buttonIndex.row].selected = true;
            this.gameBoard[buttonIndex.col][buttonIndex.row].swirl = swirl.swirl;
            // remove the equation so it is not used
            this.equations.splice(__WEBPACK_IMPORTED_MODULE_1_lodash__["findIndex"](this.equations, this.currEquation), 1);
            var selectedSwirls_1 = this.checkForWin();
            // if the game is won, set the game to won, otherwise get the next problem
            if (selectedSwirls_1) {
                swirl.swirlTween.onComplete.add(function () { this.setWin(selectedSwirls_1); }, this);
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
    };
    /**
     * check to see if a bingo was won
     */
    MathBingoComponent.prototype.checkForWin = function () {
        var winTracker = true;
        var selectedSwirls = [];
        // check for horizontal win
        for (var row = 0; row < this.gameBoard[0].length; row++) {
            winTracker = true;
            selectedSwirls = [];
            for (var col = 0; col < this.gameBoard.length; col++) {
                if (!this.gameBoard[col][row].selected)
                    winTracker = false;
                selectedSwirls.push(this.gameBoard[col][row].swirl);
            }
            if (winTracker) {
                return selectedSwirls;
            }
        }
        // check for a vertical win
        for (var col = 0; col < this.gameBoard.length; col++) {
            winTracker = true;
            selectedSwirls = [];
            for (var row = 0; row < this.gameBoard[0].length; row++) {
                if (!this.gameBoard[col][row].selected)
                    winTracker = false;
                selectedSwirls.push(this.gameBoard[col][row].swirl);
            }
            if (winTracker) {
                return selectedSwirls;
            }
        }
        winTracker = true;
        selectedSwirls = [];
        // check for downward sloping diagonal win
        for (var i = 0; i < this.gameBoard.length; i++) {
            if (!this.gameBoard[i][i].selected)
                winTracker = false;
            selectedSwirls.push(this.gameBoard[i][i].swirl);
        }
        if (winTracker) {
            return selectedSwirls;
        }
        winTracker = true;
        selectedSwirls = [];
        // check for downward sloping diagonal win
        for (var i = 0; i < this.gameBoard.length; i++) {
            if (!this.gameBoard[i][this.gameBoard.length - 1 - i].selected)
                winTracker = false;
            selectedSwirls.push(this.gameBoard[i][this.gameBoard.length - 1 - i].swirl);
        }
        if (winTracker) {
            return selectedSwirls;
        }
        return null;
    };
    /**
     * set the game to won
     */
    MathBingoComponent.prototype.setWin = function (selectedSwirls) {
        this.game.tweens.removeAll();
        selectedSwirls.forEach(function (swirl) {
            swirl.tint = 0x2ecc71;
        });
        // set the end game dialog, promting the uesr to play again
        this.endGameDialog.dialogBackground = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dialog_background');
        this.endGameDialog.dialogBackground.anchor.setTo(.5, .5);
        this.endGameDialog.dialogText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 50, "Well Done\nYou Won\n" + this.score + " Coins", {
            font: "50px Arial",
            fill: "#5000bd",
            wordWrap: true,
            wordWrapWidth: this.endGameDialog.dialogBackground.width,
            align: "center"
        });
        this.endGameDialog.dialogText.anchor.set(0.5);
        this.endGameDialog.playAgainButton = this.game.add.button(this.game.width / 2, this.game.height / 2 + 100, 'gold_button', this.onPlayAgainButton, this);
        this.endGameDialog.playAgainButton.anchor.set(0.5);
        this.endGameDialog.playAgainButton.scale.setTo(1.5, 1.5);
        this.endGameDialog.buttonText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 100, 'Play Again', {
            font: "25px Arial",
            fill: "#5000bd",
            wordWrap: true,
            wordWrapWidth: this.endGameDialog.playAgainButton.width,
            align: "center"
        });
        this.endGameDialog.buttonText.anchor.set(0.5);
        this.gameController.updateCoins(this.score);
    };
    /**
     * the play again button is pressed
     */
    MathBingoComponent.prototype.onPlayAgainButton = function () {
        // remove thte end game dialog
        this.endGameDialog.buttonText.destroy();
        this.endGameDialog.dialogBackground.destroy();
        this.endGameDialog.dialogText.destroy();
        this.endGameDialog.playAgainButton.destroy();
        // reload the game
        this.reload();
    };
    /**
     * reload the game
     */
    MathBingoComponent.prototype.reload = function () {
        var _this = this;
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
        for (var i = 0; i < this.gameBoard.length; i++) {
            for (var k = 0; k < this.gameBoard[i].length; k++) {
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
        this.twinkleElems = __WEBPACK_IMPORTED_MODULE_1_lodash__["map"](this.buttonTexts);
        this.startTwinkleTint();
        // fade in the moo cards
        this.moonCards.forEach(function (moonCard) { return _this.game.add.tween(moonCard).to({ alpha: 1 }, 2000, 'Linear', true, 0); });
        // when the mooncards are done fadding in, set up the gameboard
        this.game.time.events.add(2000, this.setupBoard, this);
    };
    /**
     * fade out the background music
     */
    MathBingoComponent.prototype.fadeOutBackroundMusic = function () {
        if (!this.backgroundMusic || !this.backgroundMusic.isPlaying)
            return;
        this.game.add.tween(this.backgroundMusic).to({ volume: 0 }, 2000, 'Linear', true, 0);
    };
    /**
     * set up the gameboard
     */
    MathBingoComponent.prototype.setupBoard = function () {
        // get the solutions and add them to the gameboard
        this.equations = __WEBPACK_IMPORTED_MODULE_1_lodash__["sampleSize"](this.totEquations, 24);
        for (var i = 0; i < this.buttonTexts.length; i++) {
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
    };
    /**
     * start the background music
     */
    MathBingoComponent.prototype.startBackgroundMusic = function () {
        this.backgroundMusic = this.audio.background;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.loopFull(0.5);
    };
    /**
     * fade in the background music
     */
    MathBingoComponent.prototype.fadeInBackgroundMusic = function () {
        if (!this.backgroundMusic)
            return this.startBackgroundMusic();
        this.backgroundMusic.restart();
        this.backgroundMusic.loopFull(0.5);
        this.backgroundMusic.volume = 0.5;
    };
    /**
     * add a swirl to a game tile, replacing the text
     */
    MathBingoComponent.prototype.setSolutionToSwirl = function (buttonText) {
        // scale the text to a size it won't be seen
        var textTween = this.game.add.tween(buttonText.scale).to({ x: .1, y: .1 }, 1000, 'Linear', true);
        // add a swirl over the text
        var swirl = this.game.add.sprite(buttonText.x, buttonText.y, 'swirl');
        swirl.tint = 0x2080ff;
        swirl.scale.setTo(.01, .01);
        swirl.anchor.setTo(.5, .5);
        var swirlTween = this.game.add.tween(swirl.scale).to({ x: .17, y: .17 }, 1000, 'Linear', true);
        this.swirls.push(swirl);
        // remove the text from the twinkle element array, so it won't be twinkled
        __WEBPACK_IMPORTED_MODULE_1_lodash__["remove"](this.twinkleElems, function (elem) { return (elem.index == buttonText.index); });
        // add the swirl to the twinkle elements
        this.twinkleElems.push(swirl);
        return { swirl: swirl, swirlTween: swirlTween };
    };
    /**
     * set the equation to be solved for
     */
    MathBingoComponent.prototype.setCurrentEquation = function (delayTime) {
        if (delayTime === void 0) { delayTime = 1000; }
        this.currEquation = __WEBPACK_IMPORTED_MODULE_1_lodash__["sample"](this.equations);
        // fade in the new problem
        this.problemText.alpha = 0;
        this.problemText.setText(this.currEquation.problem);
        var tween = this.game.add.tween(this.problemText).to({ alpha: 1 }, 1000, 'Linear', true, delayTime);
        // after the problem is faded in, start the timer
        tween.onComplete.add(this.startTimer, this);
    };
    MathBingoComponent.prototype.update = function () {
        // twirl the swirls
        this.swirls.forEach(function (swirl) {
            swirl.angle += 1;
        });
    };
    /**
     * change the grade levels
     */
    MathBingoComponent.prototype.changeGradeLevel = function (equations) {
        if (this.audio.card_reveal.isPlaying)
            this.audio.card_reveal.stop();
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.totEquations = equations;
        this.reload();
        if (this.timer)
            this.timer.destroy();
    };
    return MathBingoComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('game'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__["a" /* GameComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__["a" /* GameComponent */]) === "function" && _a || Object)
], MathBingoComponent.prototype, "gameController", void 0);
MathBingoComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-math-bingo',
        template: __webpack_require__("../../../../../src/app/student/games/math-bingo/math-bingo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/math-bingo/math-bingo.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */]) === "function" && _c || Object])
], MathBingoComponent);

var _a, _b, _c;
//# sourceMappingURL=math-bingo.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/math-bingo/math-bingo.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathBingoModule", function() { return MathBingoModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__math_bingo_component__ = __webpack_require__("../../../../../src/app/student/games/math-bingo/math-bingo.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_game_module__ = __webpack_require__("../../../../../src/app/student/games/game/game.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__math_bingo_component__["a" /* MathBingoComponent */] },
    { path: 'math-bingo', component: __WEBPACK_IMPORTED_MODULE_5__math_bingo_component__["a" /* MathBingoComponent */] }
];
var MathBingoModule = (function () {
    function MathBingoModule() {
    }
    return MathBingoModule;
}());
MathBingoModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_6__game_game_module__["a" /* GameModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__math_bingo_component__["a" /* MathBingoComponent */]
        ]
    })
], MathBingoModule);

//# sourceMappingURL=math-bingo.module.js.map

/***/ })

});
//# sourceMappingURL=math-bingo.module.chunk.js.map