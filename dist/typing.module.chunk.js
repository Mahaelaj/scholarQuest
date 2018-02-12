webpackJsonp(["typing.module"],{

/***/ "../../../../../src/app/student/games/typing/typing.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".displayWord{\r\n    margin-right: 20px;\r\n    border-bottom: 1px solid black;\r\n}\r\n\r\n.queueWord{\r\n    margin-right: 10px;\r\n}\r\n\r\n.wordRow{\r\n    margin-top: 100px;\r\n    height: 50px;\r\n}\r\n\r\n.title {\r\n    font-family: Georgia, \"Times New Roman\";\r\n    text-align: right;\r\n    font-size: 28px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.score {\r\n    float: right;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.errors {\r\n    margin-bottom: 20px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/typing/typing.component.html":
/***/ (function(module, exports) {

module.exports = "<sq-game #game (playAgainEvent)=\"reload()\" (changeGradeLevelEvent)=\"changeGradeLevel($event)\" type=\"vocab\">\r\n    <div class=\"container\" fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayout.xs=\"column\">\r\n        <h1 class=\"title\">Typing</h1>\r\n    </div>\r\n    <div class=\"container\" fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayout.xs=\"column\">\r\n        <div class=\"errors\" fxFlex=\"50\" fxLayoutAlign=\"center center\" fxLayout=\"column\">\r\n            <div>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n            </div>\r\n            <div>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>\r\n                <mat-icon>clear</mat-icon>            \r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"50\" fxLayoutAlign=\"center center\" >\r\n            <h3 class=\"score\">{{scoreText}}</h3>\r\n        </div>\r\n    </div>\r\n    <div class=\"wordRow\" fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayout.sm=\"column\" fxLayout.xs=\"column\">\r\n        <h3 class=\"displayWord\">\r\n            {{displayedWord}}\r\n        </h3>\r\n        <h5 *ngFor=\"let word of vocabularyQueue\" class=\"queueWord\">\r\n            {{word}}\r\n        </h5>\r\n    </div>  \r\n</sq-game>"

/***/ }),

/***/ "../../../../../src/app/student/games/typing/typing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_game_game_component__ = __webpack_require__("../../../../../src/app/student/games/game/game/game.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TypingComponent = (function () {
    function TypingComponent(renderer) {
        this.renderer = renderer;
        this.vocabularyFull = [];
        this.vocabulary = [];
        this.vocabularyQueue = [];
        this.score = 0;
        this.strikes = 0;
        this.scoreText = "Score : 0";
        this.strikeIcons = [];
    }
    TypingComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // get the displayed strikes
        for (var i = 0; i < Object.keys(document.body.querySelectorAll('mat-icon')).length; ++i) {
            if (document.body.querySelectorAll('mat-icon')[i].innerHTML == "clear") {
                this.strikeIcons.push(document.body.querySelectorAll('mat-icon')[i]);
            }
        }
        this.gameController.getVocabulary().subscribe(function (vocab) {
            _this.vocabularyFull = vocab.vocab;
            _this.reload();
        });
    };
    TypingComponent.prototype.handleKeyboardEvent = function (event) {
        // stop the space bar from causing the page to scroll
        if (event.keyCode == 32) {
            event.preventDefault();
            if (this.displayedWord.length == 0) {
                this.score += 10;
                this.scoreText = 'Score : ' + this.score;
                // get the next displayed word
                this.displayedWord = __WEBPACK_IMPORTED_MODULE_1_lodash__["first"](this.vocabularyQueue);
                this.vocabularyQueue = __WEBPACK_IMPORTED_MODULE_1_lodash__["drop"](this.vocabularyQueue);
                // if there are no more vocabulary words to add to the queue, reset the vocabulary
                if (!this.vocabulary.length)
                    this.vocabulary = this.vocabularyFull.slice();
                // add another word to the queue
                this.vocabularyQueue.push(this.vocabulary.splice(Math.floor(Math.random() * this.vocabulary.length), 1)[0].word);
            }
        }
        else if (event.key == this.displayedWord.charAt(0)) {
            // remove the letter that was just pressed
            this.displayedWord = this.displayedWord.substring(1, this.displayedWord.length);
        }
        else if (this.strikes < 10) {
            // add a strike
            this.addStrike();
        }
    };
    TypingComponent.prototype.addStrike = function () {
        // change the strike color to red
        this.renderer.setElementStyle(this.strikeIcons[this.strikes], 'color', 'red');
        this.strikes++;
        // if the player has lost, open a dialog prompting the user to play again
        if (this.strikes == this.strikeIcons.length) {
            // TODO: end game
            this.gameController.openLoseGameDialog(this.score, '');
            this.gameController.updateCoins(this.score);
        }
    };
    /*
     * reload the gameboard;
     */
    TypingComponent.prototype.reload = function () {
        var _this = this;
        this.vocabulary = this.vocabularyFull.slice();
        this.vocabularyQueue = [];
        // get the first word
        this.displayedWord = this.vocabulary.splice(Math.floor(Math.random() * this.vocabulary.length), 1)[0].word;
        // get the words for the queue
        var queueSize = this.vocabulary.length < 4 ? this.vocabulary.length : 4;
        for (var i = 0; i < queueSize; i++) {
            this.vocabularyQueue.push(this.vocabulary.splice(Math.floor(Math.random() * this.vocabulary.length), 1)[0].word);
        }
        // update the score
        this.score = 0;
        this.scoreText = "Score: " + this.score.toString();
        // reset the strikes
        this.strikes = 0;
        this.strikeIcons.forEach(function (icon) { return _this.renderer.setElementStyle(icon, 'color', null); });
    };
    TypingComponent.prototype.changeGradeLevel = function (event) {
        this.vocabularyFull = event;
        this.reload();
    };
    return TypingComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('game'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__game_game_game_component__["a" /* GameComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__game_game_game_component__["a" /* GameComponent */]) === "function" && _a || Object)
], TypingComponent.prototype, "gameController", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* HostListener */])('document:keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TypingComponent.prototype, "handleKeyboardEvent", null);
TypingComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-typing',
        template: __webpack_require__("../../../../../src/app/student/games/typing/typing.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/typing/typing.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _b || Object])
], TypingComponent);

var _a, _b;
//# sourceMappingURL=typing.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/typing/typing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypingModule", function() { return TypingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__typing_component__ = __webpack_require__("../../../../../src/app/student/games/typing/typing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_game_module__ = __webpack_require__("../../../../../src/app/student/games/game/game.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__typing_component__["a" /* TypingComponent */] },
    { path: 'typing', component: __WEBPACK_IMPORTED_MODULE_5__typing_component__["a" /* TypingComponent */] }
];
var TypingModule = (function () {
    function TypingModule() {
    }
    return TypingModule;
}());
TypingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_6__game_game_module__["a" /* GameModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__typing_component__["a" /* TypingComponent */]
        ]
    })
], TypingModule);

//# sourceMappingURL=typing.module.js.map

/***/ })

});
//# sourceMappingURL=typing.module.chunk.js.map