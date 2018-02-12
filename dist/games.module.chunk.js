webpackJsonp(["games.module"],{

/***/ "../../../../../src/app/student/games/games-list/games-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "img{\r\n    width: 200px;\r\n    height: 200px;\r\n    margin: auto;\r\n    display: block;\r\n}\r\n\r\nh1{\r\n    text-align: center;\r\n}\r\n\r\n.gameWrapper{\r\n    margin: auto;\r\n    text-align: center;\r\n}\r\n\r\n.gameName{\r\n    font-size: 25px;\r\n    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\r\n    text-align: center;\r\n    color: green;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/games-list/games-list.component.html":
/***/ (function(module, exports) {

module.exports = "<br />\r\n<h1>Games</h1>\r\n<br />\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\">\r\n    <div fxFlex=\"33\">\r\n        <a [routerLink]=\"['math-bingo']\">\r\n            <img src=\"../../../assets/games/mathBingo/displayImage.png\" />\r\n            <p class=\"gameName\">Math Bingo</p>\r\n        </a>\r\n    </div>\r\n    <div fxFlex=\"33\">\r\n        <a [routerLink]=\"['pipes', 'math']\">\r\n            <img src=\"../../../assets/games/thumbnails/vocabulary_pipes_thumbnail.jpg\" />\r\n            <p class=\"gameName\">Vocabulary Pipes</p>\r\n        </a>\r\n    </div>\r\n    <div fxFlex=\"33\">\r\n        <a [routerLink]=\"['word-smith']\">\r\n            <img src=\"../../../assets/games/wordSmith/displayImg.png\" />\r\n            <p class=\"gameName\">Word Smith</p>\r\n        </a>\r\n    </div>\r\n</div>\r\n<div fxLayout=\"row\" fxLayout.xs=\"column\">\r\n   <div fxFlex=\"33\">\r\n        <a [routerLink]=\"['apple-drop']\">\r\n            <img src=\"../../../assets/games/thumbnails/apple_drop_thumbnail.png\" />\r\n            <p class=\"gameName\">Apple Drop</p>\r\n        </a>\r\n    </div>\r\n</div>\r\n <!-- <div fxFlex=\"33\">\r\n        <a [routerLink]=\"['typing']\">\r\n            <img src=\"../../../assets/games/Typing.jpg\" />\r\n            <p class=\"gameName\">Typing</p>\r\n        </a>\r\n    </div>\r\n    <div fxFlex=\"33\">\r\n        <a [routerLink]=\"['vocab-match']\">\r\n            <img src=\"../../../assets/games/VocabMatch.jpg\" />\r\n            <p class=\"gameName\">Vocab Match</p>\r\n        </a>\r\n    </div> -->\r\n<div class=\"test\"></div>\r\n"

/***/ }),

/***/ "../../../../../src/app/student/games/games-list/games-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamesListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GamesListComponent = (function () {
    function GamesListComponent() {
    }
    return GamesListComponent;
}());
GamesListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-games-list',
        template: __webpack_require__("../../../../../src/app/student/games/games-list/games-list.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/games-list/games-list.component.css")]
    })
], GamesListComponent);

//# sourceMappingURL=games-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/games.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesModule", function() { return GamesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__games_list_games_list_component__ = __webpack_require__("../../../../../src/app/student/games/games-list/games-list.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__games_list_games_list_component__["a" /* GamesListComponent */] },
    { path: 'games', component: __WEBPACK_IMPORTED_MODULE_5__games_list_games_list_component__["a" /* GamesListComponent */] },
    { path: 'math-bingo', loadChildren: './math-bingo/math-bingo.module#MathBingoModule' },
    { path: 'vocab-match', loadChildren: './vocab-match/vocab-match.module#VocabMatchModule' },
    { path: 'typing', loadChildren: './typing/typing.module#TypingModule' },
    { path: 'math-clouds', loadChildren: './math-clouds/math-clouds.module#MathCloudsModule' },
    { path: 'pipes', loadChildren: './pipes/pipes.module#PipesModule' },
    { path: 'apple-drop', loadChildren: './apple-drop/apple-drop.module#AppleDropModule' },
    { path: 'word-smith', loadChildren: './word-smith/word-smith.module#WordSmithModule' },
];
var GamesModule = (function () {
    function GamesModule() {
    }
    return GamesModule;
}());
GamesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__games_list_games_list_component__["a" /* GamesListComponent */]
        ]
    })
], GamesModule);

//# sourceMappingURL=games.module.js.map

/***/ })

});
//# sourceMappingURL=games.module.chunk.js.map