webpackJsonp(["math-clouds.module"],{

/***/ "../../../../../src/app/student/games/math-clouds/math-clouds.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".frame {\r\n    width: 800px;\r\n    min-width: 800px;\r\n    height: 600px;\r\n    min-height: 600px;\r\n    border: solid black;\r\n    margin: auto;\r\n}\r\n\r\n.pipe {\r\n    height: 125px;\r\n    width: 200px;\r\n    border: solid black;\r\n    text-align: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.pipe-text {\r\n    margin-top: 40px;\r\n\r\n}\r\n\r\n.box {\r\n    height: 75px;\r\n    width: 200px;\r\n    border: solid black;\r\n}\r\n\r\n.wall {\r\n    border: solid black;\r\n    z-index: 2;\r\n    background-color: white;\r\n}\r\n\r\n.solution {\r\n    position: relative;\r\n    border: solid black;\r\n    width: 95px;\r\n    height: 95px;\r\n    left: -120px;\r\n    text-align: center;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n}\r\n\r\n.solution-text {\r\n    margin-top: 40px;\r\n}\r\n\r\n.title{\r\n    text-align: center;\r\n}\r\n\r\n.score{\r\n    float: right;\r\n    margin-right: 10%;\r\n\r\n}\r\n\r\n.errors{\r\n    margin-left: 10%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/games/math-clouds/math-clouds.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <sq-grade-sidenav (buttonClicked)=\"changeGradeLevel($event)\">\r\n\r\n    <div class=\"title\">Title</div>\r\n    <div class=\"score\">{{scoreText}}</div>\r\n    <div class=\"errors\">\r\n        <div>\r\n            <mat-icon>clear</mat-icon>\r\n            <mat-icon>clear</mat-icon>\r\n            <mat-icon>clear</mat-icon>\r\n            <mat-icon>clear</mat-icon>\r\n            <mat-icon>clear</mat-icon>\r\n        </div>\r\n    </div>\r\n    <div class=\"frame\">\r\n        <div fxLayout=\"row\" fxFlex=\"100\" fxLayout.xs=\"column\" fxLayoutGap=\"25px\" fxLayoutAlign=\"center\">\r\n            <div class=\"wall\" fxFlex=\"15\"></div>\r\n            <div fxLayout=\"column\" fxFlex=\"71\">\r\n                <div fxLayout=\"row\" fxFlex=\"100\" fxLayout.xs=\"column\" fxLayoutGap=\"25px\" fxLayoutAlign=\"center\">\r\n                    <div class=\"pipe\" #pipe1 (click)=\"checkCorrect(0)\">\r\n                        <div class=\"pipe-text\">{{displayedProblems[0]}}</div>\r\n                    </div>\r\n                    <div class=\"pipe\" #pipe2 (click)=\"checkCorrect(1)\">\r\n                        <div class=\"pipe-text\">{{displayedProblems[1]}}</div>\r\n                    </div>\r\n                    <div class=\"pipe\" #pipe3 (click)=\"checkCorrect(2)\">\r\n                        <div class=\"pipe-text\">{{displayedProblems[2]}}</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"solution\" #box>\r\n                    <div class=\"solution-text\">{{displayedMathSolution.solution}}</div>\r\n                </div>\r\n\r\n                <div class=\"box-container\" fxLayout=\"row\" fxFlex=\"100\" fxLayout.xs=\"column\" fxLayoutGap=\"25px\" fxLayoutAlign=\"center\">\r\n                    <div class=\"box\" #box1></div>\r\n                    <div class=\"box\" #box2></div>\r\n                    <div class=\"box\" #box3></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"wall\" fxFlex=\"15\"></div>\r\n        </div>\r\n    </div>\r\n</sq-grade-sidenav>\r\n<sq-end-game-dialog (playAgainSelect)=\"replay()\" #endGameDialog></sq-end-game-dialog> -->"

/***/ }),

/***/ "../../../../../src/app/student/games/math-clouds/math-clouds.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MathCloudsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_utils_array_service__ = __webpack_require__("../../../../../src/app/shared/utils/array.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MathCloudsComponent = (function () {
    //  @ViewChild('endGameDialog') endGameDialog: EndGameDialogComponent;
    function MathCloudsComponent(renderer, arrayService, apiService) {
        this.renderer = renderer;
        this.arrayService = arrayService;
        this.apiService = apiService;
        this.state = 'moving';
        this.mathProblemsFull = [];
        this.mathProblemsRemaining = [];
        this.score = 0;
        this.strikes = 0;
        this.scoreText = "Score : 0";
        this.displayedProblems = [];
        this.boxMoveRightDistance = -120;
        this.strikeIcons = [];
        this.startSpeed = .1;
        // this.mathProblemsFull = this.mathProblemsService.getFirstGradeMathEquations();
        // this.mathProblemsRemaining = this.mathProblemsService.getFirstGradeMathEquations(); 
        this.getProblems();
    }
    /**
     * get the game ready
     */
    MathCloudsComponent.prototype.ngAfterViewInit = function () {
        // get the displayed strikes
        for (var i = 0; i < Object.keys(document.body.querySelectorAll('md-icon')).length; ++i) {
            if (document.body.querySelectorAll('md-icon')[i].innerHTML == "clear") {
                this.strikeIcons.push(document.body.querySelectorAll('md-icon')[i]);
            }
        }
        this.loadGameBoard();
    };
    /**
     * get the problems that will be displayed
     */
    MathCloudsComponent.prototype.getProblems = function () {
        if (this.mathProblemsRemaining.length == 0)
            this.mathProblemsRemaining = this.mathProblemsFull.slice();
        this.displayedProblems = [];
        // get the solution that will be displayed
        this.displayedMathSolution = this.mathProblemsRemaining.splice(Math.floor(Math.random() * this.mathProblemsRemaining.length), 1)[0];
        this.displayedProblems.push(this.arrayService.selectRandom(this.displayedMathSolution.problems, 1));
        // find and remove the solution from the tempMathProblems array so that it doesnt repeat in the displayedProblems
        var tempMathProblems = this.mathProblemsFull.slice();
        for (var i = 0; i < tempMathProblems.length; i++) {
            if (tempMathProblems[i].solution == this.displayedMathSolution.solution) {
                tempMathProblems.splice(i, 1);
            }
        }
        // add the remaining problems to be displayed    
        for (var j = 0; j < 2; j++) {
            var equation = tempMathProblems.splice(Math.floor(Math.random() * tempMathProblems.length), 1)[0];
            this.displayedProblems.push(equation.problems[Math.floor(Math.random() * equation.problems.length)]);
        }
        // shuffle the displayed problems
        this.displayedProblems = this.arrayService.shuffle(this.displayedProblems);
    };
    /**
     * check to see if the correct answer was selected
     * @param position
     */
    MathCloudsComponent.prototype.checkCorrect = function (position) {
        var _this = this;
        var isCorrect = false;
        this.displayedMathSolution.problems.forEach(function (p) {
            if (p == _this.displayedProblems[position]) {
                isCorrect = true;
                _this.score += 10;
                _this.scoreText = "Score : " + _this.score;
                _this.getProblems();
                _this.boxMoveRightDistance = -120;
                _this.boxSpeed += .03;
            }
        });
        if (!isCorrect) {
            this.addStrike();
        }
    };
    /**
     * add a strike to the player
     */
    MathCloudsComponent.prototype.addStrike = function () {
        // change the strike color to red
        if (this.strikes < this.strikeIcons.length) {
            this.renderer.setElementStyle(this.strikeIcons[this.strikes], 'color', 'red');
            this.strikes++;
            // if the player has lost, open a dialog prompting the user to play again
            if (this.strikes == this.strikeIcons.length) {
                //  this.endGameDialog.openLoseDialog();
                this.apiService.addCoins(this.score);
                // stop the clock
                clearInterval(this.boxMovingInterval);
            }
            else {
                this.getProblems();
                this.boxMoveRightDistance = -120;
            }
        }
    };
    /*
    * change the vocabulary when a new word is selected
    */
    //  changeGradeLevel(event){
    //    switch(event) { 
    //        case 2: { 
    //            this.mathProblemsFull = this.mathProblemsService.getSecondGradeMathEquations();
    //            break; 
    //        }
    //        case 3: { 
    //            this.mathProblemsFull = this.mathProblemsService.getThirdGradeMathEquations();
    //            break; 
    //        }
    //        case 4: { 
    //            this.mathProblemsFull = this.mathProblemsService.getFourthGradeMathEquations();            
    //            break; 
    //        }
    //        case 5: { 
    //            this.mathProblemsFull = this.mathProblemsService.getFifthGradeMathEquations();                         
    //            break; 
    //        }
    //        case 6: { 
    //            this.mathProblemsFull  = this.mathProblemsService.getSixthGradeMathEquations();
    //            break; 
    //        } 
    //        default: { 
    //            this.mathProblemsFull = this.mathProblemsService.getFirstGradeMathEquations();
    //            break; 
    //        }
    //    }
    //    this.mathProblemsRemaining = this.mathProblemsFull.slice();
    //    this.replay(); 
    //  }
    /*
    * reload the gameboard;
    */
    MathCloudsComponent.prototype.loadGameBoard = function () {
        var _this = this;
        this.boxSpeed = this.startSpeed;
        // decrement the clock every second
        this.boxMovingInterval = setInterval(function (x) {
            if (_this.boxMoveRightDistance < 580) {
                _this.boxMoveRightDistance += _this.boxSpeed;
                _this.renderer.setElementStyle(_this.box.nativeElement, 'left', _this.boxMoveRightDistance + 'px');
            }
            else {
                _this.addStrike();
            }
        }, 1);
    };
    /**
     * play again
     */
    MathCloudsComponent.prototype.replay = function () {
        var _this = this;
        this.getProblems();
        clearInterval(this.boxMovingInterval);
        this.boxMoveRightDistance = -120;
        this.strikeIcons.forEach(function (icon) {
            _this.renderer.setElementStyle(icon, 'color', null);
        });
        this.strikes = 0;
        this.loadGameBoard();
    };
    return MathCloudsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('box'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], MathCloudsComponent.prototype, "box", void 0);
MathCloudsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-math-clouds',
        template: __webpack_require__("../../../../../src/app/student/games/math-clouds/math-clouds.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/games/math-clouds/math-clouds.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__shared_utils_array_service__["a" /* ArrayService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_utils_array_service__["a" /* ArrayService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */]) === "function" && _d || Object])
], MathCloudsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=math-clouds.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/games/math-clouds/math-clouds.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MathCloudsModule", function() { return MathCloudsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__math_clouds_component__ = __webpack_require__("../../../../../src/app/student/games/math-clouds/math-clouds.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__math_clouds_component__["a" /* MathCloudsComponent */] },
    { path: 'math-clouds', component: __WEBPACK_IMPORTED_MODULE_5__math_clouds_component__["a" /* MathCloudsComponent */] }
];
var MathCloudsModule = (function () {
    function MathCloudsModule() {
    }
    return MathCloudsModule;
}());
MathCloudsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* RouterModule */].forChild(routes),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__math_clouds_component__["a" /* MathCloudsComponent */]
        ]
    })
], MathCloudsModule);

//# sourceMappingURL=math-clouds.module.js.map

/***/ })

});
//# sourceMappingURL=math-clouds.module.chunk.js.map