webpackJsonp(["apple-drop.module"],{

/***/ "../../../../../src/app/student/games/apple-drop/apple-drop.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".title {\r\n  margin: auto;\r\n  display: block;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.game {\r\n  margin: auto;\r\n  width: 1354px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/apple-drop/apple-drop.component.html":
/***/ (function(module, exports) {

module.exports = "<sq-game #game (changeGradeLevelEvent)=\"changeGradeLevel($event)\" (openSidenavEvent)=\"pauseGame()\" (closeSidenavEvent)=\"playGame()\" height=\"950px\">\r\n    <img src=\"../../../assets/games/appleDrop/title.png\" class=\"title\">\r\n    <div class=\"game\" id=\"phaser-game-parent\"></div>\r\n</sq-game>\r\n"

/***/ }),

/***/ "../../../../../src/app/student/games/apple-drop/apple-drop.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppleDropComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser_ce__ = __webpack_require__("../../../../phaser-ce/build/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser_ce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
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


// necessary to get phaser to work


var AppleDropComponent = (function () {
    function AppleDropComponent(apiService) {
        this.apiService = apiService;
        this.bagVelocity = 0;
        this.letterIndex = 0;
        this.startDialog = {};
        this.apples = [];
        this.score = 0;
        this.isGameOver = false;
        this.gameOverDialog = {};
        this.bag = [];
        this.correctAppleInBag = false;
        this.incorrectAppleInBag = false;
        this.wormDown = false;
        this.gravity = 100;
        this.appleTweenTime = 3000;
        this.defaultGravity = 100;
        this.defaultAappleTweenTime = 3000;
        this.gameReady = false;
    }
    /**
     * game cleanup
     */
    AppleDropComponent.prototype.ngOnDestroy = function () {
        this.game.destroy();
    };
    /**
     * start the game
     */
    AppleDropComponent.prototype.ngAfterViewInit = function () {
        this.game = new __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Game"](1355, 750, __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["AUTO"], document.getElementById('phaser-game-parent'), { preload: this.preload, create: this.create.bind(this), update: this.update.bind(this) });
    };
    /**
     * load the background image
     */
    AppleDropComponent.prototype.preload = function () {
        this.game.load.spritesheet('loading_spritesheet', '../../../assets/games/loading/loading_spritesheet.png', 1355, 761, 8);
        this.game.load.spritesheet('loading_start', '../../../assets/games/loading/start.png', 1355, 761, 8);
    };
    /**
     * do stuff before the assets load
     */
    AppleDropComponent.prototype.create = function () {
        var _this = this;
        // display the background
        this.background = this.game.add.image(0, 0, 'loading_spritesheet');
        var load = this.background.animations.add('load');
        load.play(4, true);
        // after the assets load, display things
        this.game.load.onLoadComplete.add(this.onAssetsLoaded, this);
        // get the vocabulary to be used, and the skin color of the arms
        this.gameController.getVocabulary().subscribe(function (vocab) {
            if (vocab.error)
                console.log(vocab);
            if (vocab.error)
                return _this.gameController.openErrorMessage();
            _this.apiService.post('getAvatarSkinColor', {}).subscribe(function (skinColor) {
                if (!skinColor.skin)
                    _this.loadAssets(3);
                else
                    _this.loadAssets(skinColor.skin);
            }, function (error) { return _this.gameController.openErrorMessage(); });
            // get a copy of the vocabulary to be used
            _this.vocabFull = vocab.vocab;
            _this.vocabRemaining = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](_this.vocabFull);
            // set the arrow keys as inputs
            _this.arrowKeys = _this.game.input.keyboard.createCursorKeys();
        }, function (error) { _this.gameController.openErrorMessage(); });
    };
    /**
     * add the start button
     */
    AppleDropComponent.prototype.onAssetsLoaded = function () {
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'loading_start', this.initGame, this);
        button.anchor.setTo(.5, .5);
        button.alpha = 0;
        this.game.add.tween(button).to({ alpha: 1 }, 2000, 'Linear', true);
    };
    AppleDropComponent.prototype.initGame = function () {
        this.audio = {
            background: this.game.add.audio('background_music'),
            no_apple: this.game.add.audio('no_apple'),
            apple_catch: this.game.add.audio('apple_catch'),
            wrong_apple: this.game.add.audio('wrong_apple'),
        };
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
    };
    /**
     * load assets
     * @param skinColor - the color of the arms/ hands
     */
    AppleDropComponent.prototype.loadAssets = function (skinColor) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.game.load.image('apple_cap_a', '../../../assets/games/appleDrop/apple_cap_a.png')];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_b', '../../../assets/games/appleDrop/apple_cap_b.png')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_c', '../../../assets/games/appleDrop/apple_cap_c.png')];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_d', '../../../assets/games/appleDrop/apple_cap_d.png')];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_e', '../../../assets/games/appleDrop/apple_cap_e.png')];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_f', '../../../assets/games/appleDrop/apple_cap_f.png')];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_g', '../../../assets/games/appleDrop/apple_cap_g.png')];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_h', '../../../assets/games/appleDrop/apple_cap_h.png')];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_i', '../../../assets/games/appleDrop/apple_cap_i.png')];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_j', '../../../assets/games/appleDrop/apple_cap_j.png')];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_k', '../../../assets/games/appleDrop/apple_cap_k.png')];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_l', '../../../assets/games/appleDrop/apple_cap_l.png')];
                    case 12:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_m', '../../../assets/games/appleDrop/apple_cap_m.png')];
                    case 13:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_n', '../../../assets/games/appleDrop/apple_cap_n.png')];
                    case 14:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_o', '../../../assets/games/appleDrop/apple_cap_o.png')];
                    case 15:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_p', '../../../assets/games/appleDrop/apple_cap_p.png')];
                    case 16:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_q', '../../../assets/games/appleDrop/apple_cap_q.png')];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_r', '../../../assets/games/appleDrop/apple_cap_r.png')];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_s', '../../../assets/games/appleDrop/apple_cap_s.png')];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_t', '../../../assets/games/appleDrop/apple_cap_t.png')];
                    case 20:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_u', '../../../assets/games/appleDrop/apple_cap_u.png')];
                    case 21:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_v', '../../../assets/games/appleDrop/apple_cap_v.png')];
                    case 22:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_w', '../../../assets/games/appleDrop/apple_cap_w.png')];
                    case 23:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_x', '../../../assets/games/appleDrop/apple_cap_x.png')];
                    case 24:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_y', '../../../assets/games/appleDrop/apple_cap_y.png')];
                    case 25:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_cap_z', '../../../assets/games/appleDrop/apple_cap_z.png')];
                    case 26:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_a', '../../../assets/games/appleDrop/apple_low_a.png')];
                    case 27:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_b', '../../../assets/games/appleDrop/apple_low_b.png')];
                    case 28:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_c', '../../../assets/games/appleDrop/apple_low_c.png')];
                    case 29:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_d', '../../../assets/games/appleDrop/apple_low_d.png')];
                    case 30:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_e', '../../../assets/games/appleDrop/apple_low_e.png')];
                    case 31:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_f', '../../../assets/games/appleDrop/apple_low_f.png')];
                    case 32:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_g', '../../../assets/games/appleDrop/apple_low_g.png')];
                    case 33:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_h', '../../../assets/games/appleDrop/apple_low_h.png')];
                    case 34:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_i', '../../../assets/games/appleDrop/apple_low_i.png')];
                    case 35:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_j', '../../../assets/games/appleDrop/apple_low_j.png')];
                    case 36:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_k', '../../../assets/games/appleDrop/apple_low_k.png')];
                    case 37:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_l', '../../../assets/games/appleDrop/apple_low_l.png')];
                    case 38:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_m', '../../../assets/games/appleDrop/apple_low_m.png')];
                    case 39:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_n', '../../../assets/games/appleDrop/apple_low_n.png')];
                    case 40:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_o', '../../../assets/games/appleDrop/apple_low_o.png')];
                    case 41:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_p', '../../../assets/games/appleDrop/apple_low_p.png')];
                    case 42:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_q', '../../../assets/games/appleDrop/apple_low_q.png')];
                    case 43:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_r', '../../../assets/games/appleDrop/apple_low_r.png')];
                    case 44:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_s', '../../../assets/games/appleDrop/apple_low_s.png')];
                    case 45:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_t', '../../../assets/games/appleDrop/apple_low_t.png')];
                    case 46:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_u', '../../../assets/games/appleDrop/apple_low_u.png')];
                    case 47:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_v', '../../../assets/games/appleDrop/apple_low_v.png')];
                    case 48:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_w', '../../../assets/games/appleDrop/apple_low_w.png')];
                    case 49:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_x', '../../../assets/games/appleDrop/apple_low_x.png')];
                    case 50:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_y', '../../../assets/games/appleDrop/apple_low_y.png')];
                    case 51:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('apple_low_z', '../../../assets/games/appleDrop/apple_low_z.png')];
                    case 52:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_a', '../../../assets/games/appleDrop/twigs_cap_a.png')];
                    case 53:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_b', '../../../assets/games/appleDrop/twigs_cap_b.png')];
                    case 54:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_c', '../../../assets/games/appleDrop/twigs_cap_c.png')];
                    case 55:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_d', '../../../assets/games/appleDrop/twigs_cap_d.png')];
                    case 56:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_e', '../../../assets/games/appleDrop/twigs_cap_e.png')];
                    case 57:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_f', '../../../assets/games/appleDrop/twigs_cap_f.png')];
                    case 58:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_g', '../../../assets/games/appleDrop/twigs_cap_g.png')];
                    case 59:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_h', '../../../assets/games/appleDrop/twigs_cap_h.png')];
                    case 60:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_i', '../../../assets/games/appleDrop/twigs_cap_i.png')];
                    case 61:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_j', '../../../assets/games/appleDrop/twigs_cap_j.png')];
                    case 62:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_k', '../../../assets/games/appleDrop/twigs_cap_k.png')];
                    case 63:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_l', '../../../assets/games/appleDrop/twigs_cap_l.png')];
                    case 64:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_m', '../../../assets/games/appleDrop/twigs_cap_m.png')];
                    case 65:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_n', '../../../assets/games/appleDrop/twigs_cap_n.png')];
                    case 66:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_o', '../../../assets/games/appleDrop/twigs_cap_o.png')];
                    case 67:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_p', '../../../assets/games/appleDrop/twigs_cap_p.png')];
                    case 68:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_q', '../../../assets/games/appleDrop/twigs_cap_q.png')];
                    case 69:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_r', '../../../assets/games/appleDrop/twigs_cap_r.png')];
                    case 70:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_s', '../../../assets/games/appleDrop/twigs_cap_s.png')];
                    case 71:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_t', '../../../assets/games/appleDrop/twigs_cap_t.png')];
                    case 72:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_u', '../../../assets/games/appleDrop/twigs_cap_u.png')];
                    case 73:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_v', '../../../assets/games/appleDrop/twigs_cap_v.png')];
                    case 74:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_w', '../../../assets/games/appleDrop/twigs_cap_w.png')];
                    case 75:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_x', '../../../assets/games/appleDrop/twigs_cap_x.png')];
                    case 76:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_y', '../../../assets/games/appleDrop/twigs_cap_y.png')];
                    case 77:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_cap_z', '../../../assets/games/appleDrop/twigs_cap_z.png')];
                    case 78:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_a', '../../../assets/games/appleDrop/twigs_low_a.png')];
                    case 79:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_b', '../../../assets/games/appleDrop/twigs_low_b.png')];
                    case 80:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_c', '../../../assets/games/appleDrop/twigs_low_c.png')];
                    case 81:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_d', '../../../assets/games/appleDrop/twigs_low_d.png')];
                    case 82:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_e', '../../../assets/games/appleDrop/twigs_low_e.png')];
                    case 83:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_f', '../../../assets/games/appleDrop/twigs_low_f.png')];
                    case 84:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_g', '../../../assets/games/appleDrop/twigs_low_g.png')];
                    case 85:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_h', '../../../assets/games/appleDrop/twigs_low_h.png')];
                    case 86:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_i', '../../../assets/games/appleDrop/twigs_low_i.png')];
                    case 87:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_j', '../../../assets/games/appleDrop/twigs_low_j.png')];
                    case 88:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_k', '../../../assets/games/appleDrop/twigs_low_k.png')];
                    case 89:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_l', '../../../assets/games/appleDrop/twigs_low_l.png')];
                    case 90:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_m', '../../../assets/games/appleDrop/twigs_low_m.png')];
                    case 91:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_n', '../../../assets/games/appleDrop/twigs_low_n.png')];
                    case 92:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_o', '../../../assets/games/appleDrop/twigs_low_o.png')];
                    case 93:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_p', '../../../assets/games/appleDrop/twigs_low_p.png')];
                    case 94:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_q', '../../../assets/games/appleDrop/twigs_low_q.png')];
                    case 95:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_r', '../../../assets/games/appleDrop/twigs_low_r.png')];
                    case 96:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_s', '../../../assets/games/appleDrop/twigs_low_s.png')];
                    case 97:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_t', '../../../assets/games/appleDrop/twigs_low_t.png')];
                    case 98:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_u', '../../../assets/games/appleDrop/twigs_low_u.png')];
                    case 99:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_v', '../../../assets/games/appleDrop/twigs_low_v.png')];
                    case 100:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_w', '../../../assets/games/appleDrop/twigs_low_w.png')];
                    case 101:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_x', '../../../assets/games/appleDrop/twigs_low_x.png')];
                    case 102:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_y', '../../../assets/games/appleDrop/twigs_low_y.png')];
                    case 103:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('twigs_low_z', '../../../assets/games/appleDrop/twigs_low_z.png')];
                    case 104:
                        _b.sent();
                        _a = skinColor;
                        switch (_a) {
                            case 1: return [3 /*break*/, 105];
                            case 2: return [3 /*break*/, 107];
                            case 3: return [3 /*break*/, 109];
                            case 4: return [3 /*break*/, 111];
                            case 5: return [3 /*break*/, 113];
                            case 6: return [3 /*break*/, 115];
                        }
                        return [3 /*break*/, 117];
                    case 105: return [4 /*yield*/, this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl01_front.png')];
                    case 106:
                        _b.sent();
                        return [3 /*break*/, 117];
                    case 107: return [4 /*yield*/, this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl02_front.png')];
                    case 108:
                        _b.sent();
                        return [3 /*break*/, 117];
                    case 109: return [4 /*yield*/, this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl03_front.png')];
                    case 110:
                        _b.sent();
                        return [3 /*break*/, 117];
                    case 111: return [4 /*yield*/, this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl04_front.png')];
                    case 112:
                        _b.sent();
                        return [3 /*break*/, 117];
                    case 113: return [4 /*yield*/, this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl05_front.png')];
                    case 114:
                        _b.sent();
                        return [3 /*break*/, 117];
                    case 115: return [4 /*yield*/, this.game.load.image('bag_front', '../../../assets/games/appleDrop/bag_cl06_front.png')];
                    case 116:
                        _b.sent();
                        return [3 /*break*/, 117];
                    case 117: return [4 /*yield*/, this.game.load.image('bag_back', '../../../assets/games/appleDrop/bag_back.png')];
                    case 118:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('word_box', '../../../assets/games/appleDrop/word_box.jpg')];
                    case 119:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('life', '../../../assets/games/appleDrop/live.png')];
                    case 120:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.image('background', '../../../assets/games/appleDrop/background.jpg')];
                    case 121:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.spritesheet('worm_spritesheet', '../../../assets/games/appleDrop/worm_spritesheet.png', 68, 146, 351)];
                    case 122:
                        _b.sent();
                        //retrieved from https://loonride.com/tools/physics
                        return [4 /*yield*/, this.game.load.physics("physics", "https://loonride.com/data/p2/-KvuM0Urb6tBpa8xydUw")];
                    case 123:
                        //retrieved from https://loonride.com/tools/physics
                        _b.sent();
                        return [4 /*yield*/, this.game.load.audio('apple_catch', '../../../assets/games/appleDrop/audio/apple_catch.ogg')];
                    case 124:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.audio('no_apple', '../../../assets/games/appleDrop/audio/no_apple.ogg')];
                    case 125:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.audio('wrong_apple', '../../../assets/games/appleDrop/audio/wrong_apple.ogg')];
                    case 126:
                        _b.sent();
                        return [4 /*yield*/, this.game.load.audio('background_music', '../../../assets/games/appleDrop/audio/background.ogg')];
                    case 127:
                        _b.sent();
                        this.game.load.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * display the score text
     */
    AppleDropComponent.prototype.displayScoreText = function () {
        this.scoreText = this.game.add.text(this.game.width - 40, 40, 'SCORE: ' + this.score, {
            font: "40px Arial",
            fill: "#cd2f43",
            align: "center"
        });
        this.scoreText.anchor.setTo(1, .5);
    };
    /**
     * when the sidenav is opened, pause the game
     */
    AppleDropComponent.prototype.pauseGame = function () {
        this.game.paused = true;
    };
    /**
     * when the sidenav is closed, pause the game
     */
    AppleDropComponent.prototype.playGame = function () {
        this.game.paused = false;
    };
    /**
     * if a new grade level is selected in the sidenav, change the vocabulary, and reset the game
     * @param event
     */
    AppleDropComponent.prototype.changeGradeLevel = function (event) {
        this.vocabFull = event;
        // remove the life images
        for (var i = this.livesGroup.children.length - 1; i >= 0; i--) {
            if (this.livesGroup.children[i]) {
                this.livesGroup.children[i].destroy();
            }
        }
        // if the game over dialog is showing, remove it
        if (this.isGameOver) {
            this.removeGameOverDialog();
            this.isGameOver = false;
        }
        else if (this.isStartDialogDisplayed) {
            this.isStartDialogDisplayed = false;
            this.removeStartDialog();
        }
        // reset the game
        this.reset();
    };
    // initial setup of the physics system
    AppleDropComponent.prototype.setPhysics = function () {
        //  Enable P2
        this.game.physics.startSystem(__WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Physics"].P2JS);
        this.game.physics.p2.gravity.y = this.gravity;
        //  Turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents(true);
        // how bouncy physics bodies are
        this.game.physics.p2.restitution = 0.4;
    };
    /**
     * spell out the active word in the branch letters, then hide it
     */
    AppleDropComponent.prototype.getBranchLetters = function () {
        this.treeLetters = this.game.add.group();
        for (var _i = 0, _a = this.word; _i < _a.length; _i++) {
            var letter = _a[_i];
            var treeLetter = void 0;
            if (letter === letter.toUpperCase())
                treeLetter = this.treeLetters.create(this.treeLetters.width, 37, 'twigs_cap_' + __WEBPACK_IMPORTED_MODULE_1_lodash__["toLower"](letter));
            else
                treeLetter = this.treeLetters.create(this.treeLetters.width, 50, 'twigs_low_' + letter);
            treeLetter.alpha = 0;
        }
        this.treeLetters.x = this.game.width / 2 - this.treeLetters.width / 2;
    };
    /**
     * display the lives images
     */
    AppleDropComponent.prototype.displayLives = function () {
        this.livesGroup = this.game.add.group();
        //  Create our bag_front sprite
        for (var i = 0; i < 3; i++) {
            var life = this.livesGroup.create((i * 45) + 50, 40, 'life');
            this.game.physics.p2.enable(life);
            life.body.setCollisionGroup(this.livesCollisionGroup);
            life.body.kinematic = true;
        }
    };
    /**
     * when a correct apple is in the bag, show the corresponding letter in the tree
     */
    AppleDropComponent.prototype.displayTreeLetter = function () {
        this.treeLetters.children[this.letterIndex].scale.setTo(0.1);
        this.treeLetters.children[this.letterIndex].alpha = 1;
        var tween = this.game.add.tween(this.treeLetters.children[this.letterIndex].scale).to({ x: 1.0, y: 1.0 }, 3000, __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Easing"].Exponential.InOut, true);
    };
    /**
     * after the letter has been spelled out, start a new level
     */
    AppleDropComponent.prototype.levelOver = function () {
        this.score += 20;
        this.updateScoreText();
        this.letterIndex = 0;
        this.gravity += 15;
        this.appleTweenTime > 250 ? this.appleTweenTime -= 250 : this.appleTweenTime = 250;
        this.game.physics.p2.gravity.y = this.gravity;
        this.getNewWord();
        this.displayStartDialog();
    };
    /**
     * update the score text
     */
    AppleDropComponent.prototype.updateScoreText = function () {
        this.scoreText.text = 'SCORE: ' + this.score;
    };
    /**
     * set the ceiling and wall colliders
     */
    AppleDropComponent.prototype.setBoundaries = function () {
        // set the cieling collider
        var ceilingShape = this.game.add.bitmapData(this.game.width + 500, 50);
        var ceiling = this.game.add.sprite(this.game.width / 2, -25, ceilingShape);
        this.game.physics.p2.enable(ceiling, false);
        ceiling.body.data.sensor = true;
        ceiling.body.setCollisionGroup(this.boundaryCollisionGroup);
        ceiling.body.collides(this.appleCollisionGroup, function () { }, this);
        ceiling.body.kinematic = true;
        // set the left wall collider
        var wallShape = this.game.add.bitmapData(50, this.game.height + 50);
        var leftWall = this.game.add.sprite(-25, this.game.height / 2 - 150, wallShape);
        this.game.physics.p2.enable(leftWall, true);
        leftWall.body.data.sensor = true;
        leftWall.body.setCollisionGroup(this.boundaryCollisionGroup);
        leftWall.body.collides(this.appleCollisionGroup, function () { }, this);
        leftWall.body.kinematic = true;
        // set the right wall collider
        var rightWall = this.game.add.sprite(this.game.width + 25, this.game.height / 2 - 150, wallShape);
        this.game.physics.p2.enable(rightWall, true);
        rightWall.body.data.sensor = true;
        rightWall.body.setCollisionGroup(this.boundaryCollisionGroup);
        rightWall.body.collides(this.appleCollisionGroup, function () { }, this);
        rightWall.body.kinematic = true;
    };
    // create collision groups
    AppleDropComponent.prototype.setCollisionGroups = function () {
        //  Create our collision groups. One for the player, one for the pandas
        this.bagCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.appleCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.boundaryCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.livesCollisionGroup = this.game.physics.p2.createCollisionGroup();
    };
    /**
     * destroy an apple
     * @param apple - the apple to destroy
     */
    AppleDropComponent.prototype.destroyApple = function (apple) {
        apple.destroy();
        this.appleCount--;
        // if all of the apple hit the floor, lose a life
        if (!this.appleCount && !this.correctAppleInBag && !this.incorrectAppleInBag) {
            this.audio.no_apple.play();
            this.loseLife();
        }
        // if there are still letters left in the word, display the next apples, otherwise start the next level
        if (!this.appleCount && this.letterIndex < this.word.length)
            this.displayApples(this.getNextApples());
        else if (!this.appleCount && this.letterIndex == this.word.length)
            this.levelOver();
    };
    /**
     * remove a life image
     */
    AppleDropComponent.prototype.loseLife = function () {
        var livesLeft = this.livesGroup.children.length - 1;
        if (this.livesGroup.children[livesLeft])
            this.livesGroup.children[livesLeft].destroy();
        if (!livesLeft)
            this.gameOver();
    };
    /**
     * display the game over dialog if there are no more lives left
     */
    AppleDropComponent.prototype.gameOver = function () {
        this.isGameOver = true;
        this.gameOverDialog.dialog = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'word_box');
        this.gameOverDialog.dialog.scale.setTo(1.25, 1.4);
        this.gameOverDialog.dialog.anchor.setTo(0.5);
        this.gameOverDialog.dialog.inputEnabled = true;
        this.gameOverDialog.dialogText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 50, "GAME OVER\nYou Won\n" + this.score + " Coins", {
            font: "50px Arial",
            fill: "#cd2f43",
            wordWrap: true,
            wordWrapWidth: this.gameOverDialog.dialog.width,
            align: "center"
        });
        this.gameOverDialog.dialogText.anchor.set(0.5);
        this.gameOverDialog.playAgainButton = this.game.add.button(this.game.width / 2, this.game.height / 2 + 100, 'word_box', this.onPlayAgainButton, this);
        this.gameOverDialog.playAgainButton.anchor.set(0.5);
        this.gameOverDialog.playAgainButton.scale.setTo(.4, .25);
        this.gameOverDialog.buttonText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 100, 'Play Again', {
            font: "25px Arial",
            fill: "#cd2f43",
            wordWrap: true,
            wordWrapWidth: this.gameOverDialog.playAgainButton.width,
            align: "center"
        });
        this.gameOverDialog.buttonText.anchor.set(0.5);
        this.gameController.updateCoins(this.score);
    };
    AppleDropComponent.prototype.startBackgroundMusic = function () {
        this.backgroundMusic = this.audio.background;
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.5;
        this.backgroundMusic.loopFull(0.5);
    };
    /**
     * if the play again button is pressed, reset the game
     */
    AppleDropComponent.prototype.onPlayAgainButton = function () {
        // reset the game
        this.vocabRemaining = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](this.vocabFull);
        this.removeGameOverDialog();
        this.reset();
        this.isGameOver = false;
    };
    /**
     * reset the game
     */
    AppleDropComponent.prototype.reset = function () {
        // destroy any active levels
        for (var _i = 0, _a = this.apples; _i < _a.length; _i++) {
            var apple = _a[_i];
            if (apple.alive)
                apple.destroy();
        }
        this.game.tweens.removeAll();
        this.displayLives();
        this.getNewWord();
        this.displayStartDialog();
        this.score = 0;
        this.updateScoreText();
        this.letterIndex = 0;
        if (this.treeLetters && this.treeLetters.children)
            this.treeLetters.destroy();
        this.getBranchLetters();
        this.appleTweenTime = this.defaultAappleTweenTime;
        this.gravity = this.defaultGravity;
        this.game.physics.p2.gravity.y = this.gravity;
    };
    /**
     * remove the game over dialog
     */
    AppleDropComponent.prototype.removeGameOverDialog = function () {
        this.gameOverDialog.dialog.destroy();
        this.gameOverDialog.dialogText.destroy();
        this.gameOverDialog.playAgainButton.destroy();
        this.gameOverDialog.buttonText.destroy();
    };
    /**
     * move the bag each update
     */
    AppleDropComponent.prototype.update = function () {
        if (!this.gameReady || !this.isGameOver)
            return;
        for (var _i = 0, _a = this.apples; _i < _a.length; _i++) {
            var apple = _a[_i];
            if (apple.alive && apple.y > this.game.height + 150) {
                this.destroyApple(apple);
            }
        }
        if (this.arrowKeys.left.isDown && this.bagFront.x >= 108) {
            this.bagVelocity -= 6;
        }
        else if (this.arrowKeys.right.isDown && this.bagFront.x <= 1245) {
            this.bagVelocity += 6;
        }
        else {
            if (this.bagVelocity < 0)
                this.bagVelocity += 2.25;
            if (this.bagVelocity > 0)
                this.bagVelocity -= 2.25;
        }
        this.bagFront.body.moveRight(this.bagVelocity);
        this.bagFront.body.angle = (this.game.width / 2 - this.bagFront.x) / 100;
        this.bagFront.angle = (this.game.width / 2 - this.bagFront.x) / 100;
        this.bagBack.body.moveRight(this.bagVelocity);
        this.bagBack.body.angle = (this.game.width / 2 - this.bagFront.x) / 100;
        this.bagBack.angle = (this.game.width / 2 - this.bagFront.x) / 100;
        this.bagSensor.body.x = this.bagFront.body.x + (this.game.width / 2 - this.bagFront.x) / 65;
        this.bagSensor.body.angle = (this.game.width / 2 - this.bagFront.x) / 100;
        this.bagSensor.angle = (this.game.width / 2 - this.bagFront.x) / 100;
        if (this.bagFront.x <= 108 && this.bagVelocity < 0) {
            this.bagVelocity *= -.8;
        }
        if (this.bagFront.x >= 1245 && this.bagVelocity > 0) {
            this.bagVelocity *= -.80;
        }
    };
    /**
     * dispay the bag
     */
    AppleDropComponent.prototype.displayBag = function () {
        // display the bag
        this.bagBack = this.game.add.sprite(this.game.width / 2, 745, 'bag_back');
        this.game.physics.p2.enable(this.bagBack, false);
        this.bagBack.body.fixedRotation = true;
        //  display the front of the bag
        this.bagFront = this.game.add.sprite(this.game.width / 2, 745, 'bag_front');
        this.game.physics.p2.enable(this.bagFront, false);
        this.bagFront.body.fixedRotation = true;
        this.bagFront.body.clearShapes();
        this.bagFront.body.loadPolygon('physics', 'bag_front');
        // set the bag sensor
        var blockShape = this.game.add.bitmapData(50, 35);
        blockShape.ctx.rect(0, 0, 50, 35);
        this.bagSensor = this.game.add.sprite(this.game.width / 2, 695, blockShape);
        this.game.physics.p2.enable(this.bagSensor, false);
        this.bagSensor.body.data.sensor = true;
        //  Set the bag collisions
        this.bagBack.body.setCollisionGroup(this.bagCollisionGroup);
        this.bagFront.body.setCollisionGroup(this.bagCollisionGroup);
        this.bagSensor.body.setCollisionGroup(this.bagCollisionGroup);
        this.bagSensor.body.collides(this.appleCollisionGroup, this.onAppleInBag, this);
        this.bagFront.body.collides(this.appleCollisionGroup, function () { }, this);
        // make the bag resistant to physics
        this.bagSensor.body.kinematic = true;
        this.bagFront.body.kinematic = true;
        this.bagBack.body.kinematic = true;
    };
    /**
     * logic when an apple goes in the bag
     * @param obj1 - the bag
     * @param obj2 - the apple
     */
    AppleDropComponent.prototype.onAppleInBag = function (obj1, obj2) {
        // logic if the apple is the correct apple, or the incorrect apple
        if (obj2.sprite && obj2.sprite.letter == this.curLetter && !this.incorrectAppleInBag) {
            this.audio.apple_catch.play();
            this.score += 5;
            this.updateScoreText();
            this.correctAppleInBag = true;
            this.displayTreeLetter();
            this.letterIndex++;
        }
        else if (obj2.sprite && !this.incorrectAppleInBag && !this.correctAppleInBag) {
            this.audio.wrong_apple.play();
            this.loseLife();
            this.incorrectAppleInBag = true;
            this.startWormAnim();
        }
        if (obj2.sprite)
            this.destroyApple(obj2.sprite);
    };
    /**
     * if the wrong apple went in the bag, display the worm animatino
     */
    AppleDropComponent.prototype.startWormAnim = function () {
        var _this = this;
        this.worm = this.game.add.sprite(this.bagFront.x, 600, 'worm_spritesheet');
        this.wormDown = false;
        // do swapping so that the worm is always in front of apples, behind the bag on its way up, and in front of the bag on its way down
        var flip = this.worm.animations.add('flip');
        flip.onComplete.add(this.wormFlipDone, this);
        this.game.world.swap(this.worm, this.bagFront);
        // move the worm up
        var upTween = this.game.add.tween(this.worm).to({ y: this.worm.y - 175 }, 500, 'Linear', true);
        // when the worm is done moving up do a flip
        upTween.onComplete.add(function () {
            _this.wormDown = true;
            _this.game.world.swap(_this.worm, _this.bagFront);
            // play the flip animation
            flip.play(165);
        }, this);
    };
    /**
     * when the worm is done with its flip, the worm moves down
     */
    AppleDropComponent.prototype.wormFlipDone = function () {
        var _this = this;
        var downTween = this.game.add.tween(this.worm).to({ y: this.game.height + 100 }, 2750, 'Linear', true);
        // destroy the worm when it is done moving down
        downTween.onComplete.add(function () {
            _this.worm.destroy();
        }, this);
    };
    /**
     * get the next apples that will be displayed
     */
    AppleDropComponent.prototype.getNextApples = function () {
        this.curLetter = this.word[this.letterIndex];
        // get capital or lowercase apples
        if (this.word[this.letterIndex] === this.word[this.letterIndex].toUpperCase())
            return this.getApples('cap');
        else
            return this.getApples('low');
    };
    /**
     * display apples
     * @param applesToDisplay - the apples to display
     */
    AppleDropComponent.prototype.displayApples = function (applesToDisplay) {
        if (this.isGameOver)
            return;
        // randomize the location of the apples
        var apple0 = this.game.add.sprite(__WEBPACK_IMPORTED_MODULE_1_lodash__["random"](150, (this.game.width - 100) / 3 - 50), __WEBPACK_IMPORTED_MODULE_1_lodash__["random"](75, 125), applesToDisplay[0].img);
        apple0.letter = applesToDisplay[0].letter;
        var apple1 = this.game.add.sprite(__WEBPACK_IMPORTED_MODULE_1_lodash__["random"]((this.game.width - 100) / 3 + 50, 2 * (this.game.width - 100) / 3 - 50), __WEBPACK_IMPORTED_MODULE_1_lodash__["random"](75, 125), applesToDisplay[1].img);
        apple1.letter = applesToDisplay[1].letter;
        var apple2 = this.game.add.sprite(__WEBPACK_IMPORTED_MODULE_1_lodash__["random"](2 * (this.game.width - 100) / 3 + 50, this.game.width - 100), __WEBPACK_IMPORTED_MODULE_1_lodash__["random"](75, 125), applesToDisplay[2].img);
        apple2.letter = applesToDisplay[2].letter;
        this.apples = [apple0, apple1, apple2];
        this.appleCount = 3;
        this.incorrectAppleInBag = false;
        this.correctAppleInBag = false;
        var _loop_1 = function (apple) {
            this_1.game.physics.p2.enable(apple, false);
            apple.body.clearShapes();
            apple.body.loadPolygon('physics', 'apple');
            apple.scale.setTo(0.1);
            apple.body.setCollisionGroup(this_1.appleCollisionGroup);
            apple.body.collides([this_1.appleCollisionGroup, this_1.bagCollisionGroup, this_1.boundaryCollisionGroup]);
            apple.body.data.gravityScale = 0;
            if (this_1.worm && this_1.worm.alive && this_1.wormDown)
                this_1.game.world.swap(apple, this_1.worm);
            this_1.game.world.swap(apple, this_1.bagFront);
            if (this_1.worm && this_1.worm.alive && !this_1.wormDown)
                this_1.game.world.swap(apple, this_1.worm);
            // apple grow tween
            var tween = this_1.game.add.tween(apple.scale).to({ x: 1.0, y: 1.0 }, this_1.appleTweenTime, __WEBPACK_IMPORTED_MODULE_2_phaser_ce__["Easing"].Exponential.InOut, true);
            tween.onComplete.add(function () {
                // after the apple is done growing, apply gravity to it
                apple.body.data.gravityScale = __WEBPACK_IMPORTED_MODULE_1_lodash__["random"](50, 100) / 100;
            }, this_1);
        };
        var this_1 = this;
        // set the physics for the apples
        for (var _i = 0, _a = this.apples; _i < _a.length; _i++) {
            var apple = _a[_i];
            _loop_1(apple);
        }
    };
    /**
     * get the apples that will be displayed for a letter in the word
     * @param capitalization
     */
    AppleDropComponent.prototype.getApples = function (capitalization) {
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var apples = [];
        __WEBPACK_IMPORTED_MODULE_1_lodash__["pull"](letters, __WEBPACK_IMPORTED_MODULE_1_lodash__["lowerCase"](this.curLetter));
        apples.push({ letter: this.curLetter, img: 'apple_' + capitalization + '_' + __WEBPACK_IMPORTED_MODULE_1_lodash__["lowerCase"](this.curLetter) });
        for (var i = 0; i < 2; i++) {
            var index = __WEBPACK_IMPORTED_MODULE_1_lodash__["random"](letters.length - 1);
            var letter = letters.splice(index, 1)[0];
            apples.push({ letter: letter, img: 'apple_' + capitalization + '_' + letter });
        }
        // randomize the apples so that the correct apple is not always in the same place
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["shuffle"](apples);
    };
    /**
     * get a new active word
     */
    AppleDropComponent.prototype.getNewWord = function () {
        if (this.vocabRemaining.length == 0)
            this.vocabRemaining = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](this.vocabFull);
        this.word = this.vocabRemaining.splice(__WEBPACK_IMPORTED_MODULE_1_lodash__["random"](this.vocabRemaining.length - 1), 1)[0].word.split('');
    };
    /**
     * set the background of the game
     */
    AppleDropComponent.prototype.setBackground = function () {
        // set the background
        var background = this.game.add.image(0, 0, 'background');
        background.scale.setTo(.68, .5);
    };
    /**
     * display the start dialog
     */
    AppleDropComponent.prototype.displayStartDialog = function () {
        this.isStartDialogDisplayed = true;
        this.startDialog.dialog = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'word_box');
        this.startDialog.dialog.anchor.setTo(0.5);
        this.startDialog.dialog.inputEnabled = true;
        this.startDialog.dialogText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 25, this.word.join(''), {
            font: "50px Arial",
            fill: "#cd2f43",
            wordWrap: true,
            wordWrapWidth: this.startDialog.dialog.width,
            align: "center"
        });
        this.startDialog.dialogText.anchor.set(0.5);
        this.startDialog.startButton = this.game.add.button(this.game.width / 2, this.game.height / 2 + 75, 'word_box', this.onStartButton, this);
        this.startDialog.startButton.anchor.set(0.5);
        this.startDialog.startButton.scale.setTo(.25, .25);
        this.startDialog.buttonText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 75, 'Start', {
            font: "25px Arial",
            fill: "#cd2f43",
            wordWrap: true,
            wordWrapWidth: this.startDialog.startButton.width,
            align: "center"
        });
        this.startDialog.buttonText.anchor.set(0.5);
    };
    /**
     * when the button to start a level is clicked, start the leve
     */
    AppleDropComponent.prototype.onStartButton = function () {
        this.isStartDialogDisplayed = false;
        if (this.treeLetters && this.treeLetters.children)
            this.treeLetters.destroy();
        this.getBranchLetters();
        this.removeStartDialog();
        var applesToDisplay = this.getNextApples();
        this.displayApples(applesToDisplay);
    };
    /**
     * remove the start dialog
     */
    AppleDropComponent.prototype.removeStartDialog = function () {
        this.startDialog.dialogText.destroy();
        this.startDialog.dialog.destroy();
        this.startDialog.startButton.destroy();
        this.startDialog.buttonText.destroy();
    };
    return AppleDropComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('game'),
    __metadata("design:type", Object)
], AppleDropComponent.prototype, "gameController", void 0);
AppleDropComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-apple-drop',
        template: __webpack_require__("../../../../../src/app/student/games/apple-drop/apple-drop.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/apple-drop/apple-drop.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */]) === "function" && _a || Object])
], AppleDropComponent);

var _a;
//# sourceMappingURL=apple-drop.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/apple-drop/apple-drop.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppleDropModule", function() { return AppleDropModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_game_module__ = __webpack_require__("../../../../../src/app/student/games/game/game.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__apple_drop_component__ = __webpack_require__("../../../../../src/app/student/games/apple-drop/apple-drop.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__apple_drop_component__["a" /* AppleDropComponent */] },
    { path: 'apple-drop', component: __WEBPACK_IMPORTED_MODULE_6__apple_drop_component__["a" /* AppleDropComponent */] }
];
var AppleDropModule = (function () {
    function AppleDropModule() {
    }
    return AppleDropModule;
}());
AppleDropModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_5__game_game_module__["a" /* GameModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__apple_drop_component__["a" /* AppleDropComponent */]
        ]
    })
], AppleDropModule);

//# sourceMappingURL=apple-drop.module.js.map

/***/ })

});
//# sourceMappingURL=apple-drop.module.chunk.js.map