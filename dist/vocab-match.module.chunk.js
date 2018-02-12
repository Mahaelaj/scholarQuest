webpackJsonp(["vocab-match.module"],{

/***/ "../../../../../src/app/student/games/vocab-match/vocab-match.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n    height: 50px;\r\n    margin: auto;\r\n}\r\n\r\n.words {\r\n    width: 200px;\r\n    margin-bottom: 3px;\r\n    text-align:center;\r\n    border: solid black;\r\n}\r\n\r\n.drop {\r\n    display: inline-block;\r\n    width: 200px;\r\n    border: dotted black;\r\n}\r\n\r\n.defs {\r\n    vertical-align: top;\r\n    display: inline-block;\r\n    width: 300px;      \r\n    margin-right: 3px; \r\n    border: solid black;\r\n}\r\n\r\n.wrapper {\r\n    text-align:center;\r\n    min-width: 550px;\r\n    margin-bottom: 3px;\r\n}\r\n\r\nh1 {\r\n    font-family: Georgia, \"Times New Roman\";\r\n    text-align: center;\r\n    font-size: 28px;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/vocab-match/vocab-match.component.html":
/***/ (function(module, exports) {

module.exports = "<sq-game #game (playAgainEvent)=\"reload()\" (changeGradeLevelEvent)=\"changeGradeLevel($event)\" type=\"vocab\" height=\"800px\">\r\n\r\n    <h1>Vocabulary Match</h1>\r\n    <h1 #score class=\"score\">Score: 0</h1>\r\n    <div style=\"min-width: 900px\"> \r\n        <div fxLayout=\"row\" fxFlex=\"100\" >\r\n            <div  fxFlex=\"50\" >\r\n            <ul class=\"wrapper\" *ngFor=\"let row of vocabDefs\">\r\n                <li class=\"container defs\">\r\n                    {{row}}\r\n                <li class=\"container drop\" (dragover)=\"dragover($event)\" (drop)=\"onDrop($event, row)\">\r\n                        &nbsp;\r\n            </ul>\r\n            </div>\r\n            <div  fxFlex=\"50\">\r\n                <div class=\"container words\" *ngFor=\"let row of vocabWords\" draggable=\"true\" (dragstart)=\"dragStart(row)\">\r\n                {{row}}\r\n            </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</sq-game>\r\n    "

/***/ }),

/***/ "../../../../../src/app/student/games/vocab-match/vocab-match.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VocabMatchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
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




var VocabMatchComponent = (function () {
    function VocabMatchComponent(renderer, apiService) {
        this.renderer = renderer;
        this.apiService = apiService;
        this.vocab = [];
        this.vocabFullList = [];
        this.vocabWords = [];
        this.vocabDefs = [];
        this.vocabNum = 10;
        this.score = 0;
    }
    VocabMatchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.gameController.getVocabulary().subscribe(function (vocab) {
            _this.vocabFullList = vocab.vocab;
            _this.initGameBoard();
        });
    };
    VocabMatchComponent.prototype.initGameBoard = function () {
        // we want the displayed vocabulary to be under a cetain size so its easier to move in
        this.vocab = __WEBPACK_IMPORTED_MODULE_1_lodash__(this.vocabFullList).shuffle().take(10).value();
        this.vocabWords = __WEBPACK_IMPORTED_MODULE_1_lodash__(this.vocab).map(function (vocab) { return vocab.word; }).shuffle().value();
        this.vocabDefs = __WEBPACK_IMPORTED_MODULE_1_lodash__(this.vocab).map(function (vocab) { return vocab.definition; }).shuffle().value();
    };
    /*
     * allow drag and drop
     */
    VocabMatchComponent.prototype.dragover = function (event) {
        event.preventDefault();
    };
    /*
     * called when the vocab word is dropped in the drop container
     */
    VocabMatchComponent.prototype.onDrop = function (ev, row) {
        var _this = this;
        this.vocab.forEach(function (v) {
            // if the vocab word matches the definition ...
            if (v.word == _this.selectedWord && v.definition == row) {
                // set the word in the drop container to be the vocab word
                ev.target.textContent = _this.selectedWord;
                // change the border to solid green 
                _this.renderer.setElementStyle(ev.target, "border", "solid green");
                // remove the vocab word fromm the list so can't be used again
                for (var i = 0; i < _this.vocabWords.length; i++) {
                    if (_this.vocabWords[i] == v.word) {
                        _this.vocabWords.splice(i, 1);
                        // add to the score
                        _this.score += 10;
                        _this.scoreTxt.nativeElement.textContent = "Score: " + _this.score;
                        // if the game is over, open the dialog that will prompt the user to play again
                        if (_this.vocabWords.length == 0) {
                            _this.gameController.openWinGameDialog();
                            _this.gameController.updateCoins(_this.score);
                        }
                    }
                }
            }
        });
    };
    /*
     * get the word that is being dragged
     */
    VocabMatchComponent.prototype.dragStart = function (row) {
        this.selectedWord = row;
    };
    /*
     * start a new game
     */
    VocabMatchComponent.prototype.reload = function () {
        this.vocab = [];
        this.vocabWords = [];
        this.vocabDefs = [];
        this.score = 0;
        this.scoreTxt.nativeElement.textContent = "Score: " + this.score;
        // reset the drop containers
        for (var i = 0; i < document.getElementsByClassName('drop').length; i++) {
            // reset the text content
            document.getElementsByClassName('drop')[i].textContent = '';
            // reset the border
            this.renderer.setElementStyle(document.getElementsByClassName('drop')[i], "border", "dotted black;");
            this.initGameBoard();
        }
    };
    VocabMatchComponent.prototype.changeGradeLevel = function (event) {
        this.vocabFullList = event;
        this.reload();
    };
    return VocabMatchComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('score'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], VocabMatchComponent.prototype, "scoreTxt", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('game'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__["a" /* GameComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__game_game_game_component__["a" /* GameComponent */]) === "function" && _b || Object)
], VocabMatchComponent.prototype, "gameController", void 0);
VocabMatchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-vocab-match',
        template: __webpack_require__("../../../../../src/app/student/games/vocab-match/vocab-match.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/vocab-match/vocab-match.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */]) === "function" && _d || Object])
], VocabMatchComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=vocab-match.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/vocab-match/vocab-match.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VocabMatchModule", function() { return VocabMatchModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vocab_match_component__ = __webpack_require__("../../../../../src/app/student/games/vocab-match/vocab-match.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__game_game_module__ = __webpack_require__("../../../../../src/app/student/games/game/game.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__vocab_match_component__["a" /* VocabMatchComponent */] },
    { path: 'vocab-match', component: __WEBPACK_IMPORTED_MODULE_4__vocab_match_component__["a" /* VocabMatchComponent */] }
];
var VocabMatchModule = (function () {
    function VocabMatchModule() {
    }
    return VocabMatchModule;
}());
VocabMatchModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_5__game_game_module__["a" /* GameModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__vocab_match_component__["a" /* VocabMatchComponent */],
        ]
    })
], VocabMatchModule);

//# sourceMappingURL=vocab-match.module.js.map

/***/ })

});
//# sourceMappingURL=vocab-match.module.chunk.js.map