webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./apple-drop/apple-drop.module": [
		"../../../../../src/app/student/games/apple-drop/apple-drop.module.ts",
		"common",
		"apple-drop.module"
	],
	"./auth/auth.module": [
		"../../../../../src/app/auth/auth.module.ts",
		"auth.module"
	],
	"./math-bingo/math-bingo.module": [
		"../../../../../src/app/student/games/math-bingo/math-bingo.module.ts",
		"common",
		"math-bingo.module"
	],
	"./math-clouds/math-clouds.module": [
		"../../../../../src/app/student/games/math-clouds/math-clouds.module.ts",
		"math-clouds.module"
	],
	"./pipes/pipes.module": [
		"../../../../../src/app/student/games/pipes/pipes.module.ts",
		"common",
		"pipes.module"
	],
	"./student/games/games.module": [
		"../../../../../src/app/student/games/games.module.ts",
		"games.module"
	],
	"./student/user-profile/user-profile.module": [
		"../../../../../src/app/student/user-profile/user-profile.module.ts",
		"user-profile.module"
	],
	"./typing/typing.module": [
		"../../../../../src/app/student/games/typing/typing.module.ts",
		"common",
		"typing.module"
	],
	"./vocab-match/vocab-match.module": [
		"../../../../../src/app/student/games/vocab-match/vocab-match.module.ts",
		"common",
		"vocab-match.module"
	],
	"./word-smith/word-smith.module": [
		"../../../../../src/app/student/games/word-smith/word-smith.module.ts",
		"common",
		"word-smith.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<ng2-toasty [position]=\"'top-center'\"></ng2-toasty>\r\n<sq-navbar #nav></sq-navbar>\r\n<router-outlet></router-outlet>\r\n<div (window:mousemove)=\"mouseMove($event)\"></div>\r\n<sq-cursor-follower [xPos]=\"xPos\" [yPos]=\"yPos\"></sq-cursor-follower>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cursor_cursor_service__ = __webpack_require__("../../../../../src/app/cursor/cursor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_utils_coins_service__ = __webpack_require__("../../../../../src/app/shared/utils/coins.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(cursorService, apiService, coinsService, cursorFollowerService, renderer) {
        var _this = this;
        this.cursorService = cursorService;
        this.apiService = apiService;
        this.coinsService = coinsService;
        this.cursorFollowerService = cursorFollowerService;
        this.renderer = renderer;
        this.xPos = 0;
        this.yPos = 0;
        this.cursorFollower = '0';
        this.test = false;
        this.cursorService.selectedCursor.subscribe(function (cursorIndex) {
            _this.setCursor(cursorIndex);
        });
        this.apiService.post('getStudent', {}).subscribe(function (student) {
            if (student.status != 'Success')
                return;
            _this.cursorFollowerService.selectedCursorFollower.next(student.cursorFollowerId);
            _this.setCursor(student.cursorId);
            _this.coinsService.coins.next(student.coins);
        });
    }
    AppComponent.prototype.mouseMove = function (event) {
        var xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        this.xPos = event.clientX + xOffset;
        this.yPos = event.clientY + yOffset;
    };
    /**
     * renderer cannot be used in a service, which is why this function is in this
     */
    AppComponent.prototype.setCursor = function (cursorIndex) {
        if (cursorIndex == 1)
            this.renderer.setElementStyle(document.body, 'cursor', null);
        else
            this.renderer.setElementStyle(document.body, 'cursor', "url(" + this.cursorService.getCursorByIndex(cursorIndex) + "), pointer");
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-app',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cursor_cursor_service__["a" /* CursorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cursor_cursor_service__["a" /* CursorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_utils_coins_service__["a" /* CoinsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_utils_coins_service__["a" /* CoinsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toasty__ = __webpack_require__("../../../../ng2-toasty/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_sq_toasty_sq_toasty_component__ = __webpack_require__("../../../../../src/app/shared/sq-toasty/sq-toasty.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__navbar_navbar_component__ = __webpack_require__("../../../../../src/app/navbar/navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_utils_array_service__ = __webpack_require__("../../../../../src/app/shared/utils/array.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_cookies_cookies_service__ = __webpack_require__("../../../../../src/app/shared/cookies/cookies.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_utils_coins_service__ = __webpack_require__("../../../../../src/app/shared/utils/coins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_user_user_service__ = __webpack_require__("../../../../../src/app/shared/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__cursor_follower_cursor_follower_cursor_follower_component__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower/cursor-follower.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__cursor_follower_eyes_eyes_component__ = __webpack_require__("../../../../../src/app/cursor-follower/eyes/eyes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__cursor_follower_cursor_follower_service__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__cursor_cursor_service__ = __webpack_require__("../../../../../src/app/cursor/cursor.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_12__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_13__navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_19__cursor_follower_cursor_follower_cursor_follower_component__["a" /* CursorFollowerListComponent */],
            __WEBPACK_IMPORTED_MODULE_20__cursor_follower_eyes_eyes_component__["a" /* EyesComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["q" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_toasty__["b" /* ToastyModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["d" /* RouterModule */].forRoot([
                { path: '', redirectTo: '/home', pathMatch: 'full' },
                { path: 'home', component: __WEBPACK_IMPORTED_MODULE_12__home_home_component__["a" /* HomeComponent */] },
                { path: 'games', loadChildren: './student/games/games.module#GamesModule' },
                { path: 'profile', loadChildren: './student/user-profile/user-profile.module#UserProfileModule' },
                { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
            ])
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_14__shared_utils_api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_15__shared_utils_array_service__["a" /* ArrayService */], __WEBPACK_IMPORTED_MODULE_16__shared_cookies_cookies_service__["a" /* CookiesService */], __WEBPACK_IMPORTED_MODULE_21__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */], __WEBPACK_IMPORTED_MODULE_22__cursor_cursor_service__["a" /* CursorService */], __WEBPACK_IMPORTED_MODULE_17__shared_utils_coins_service__["a" /* CoinsService */], __WEBPACK_IMPORTED_MODULE_11__shared_sq_toasty_sq_toasty_component__["a" /* Toasty */], __WEBPACK_IMPORTED_MODULE_18__shared_user_user_service__["a" /* UserService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/cursor-follower/cursor-follower.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursorFollowerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CursorFollowerService = (function () {
    function CursorFollowerService() {
        this.cursorFollower0 = { img: '../assets/clip-art/None.png', index: 1 };
        this.cursorFollower1 = { img: '../assets/cursor-followers/EyesFollower.jpg', index: 2 };
        this.cursorFollowers = [];
        this.selectedCursorFollower = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](1);
        //add the cursor followers to an array        
        this.cursorFollowers.push(this.cursorFollower0);
        this.cursorFollowers.push(this.cursorFollower1);
    }
    /*
     * return the cursor Followers
     */
    CursorFollowerService.prototype.getCursorFollowers = function () {
        return this.cursorFollowers;
    };
    return CursorFollowerService;
}());
CursorFollowerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], CursorFollowerService);

//# sourceMappingURL=cursor-follower.service.js.map

/***/ }),

/***/ "../../../../../src/app/cursor-follower/cursor-follower/cursor-follower.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cursor-follower/cursor-follower/cursor-follower.component.html":
/***/ (function(module, exports) {

module.exports = "<div #cursorFollower></div>\r\n<div [ngSwitch]=\"cursorFollowerService.selectedCursorFollower.value\" [@show]=\"show\" >\r\n    <div *ngSwitchCase=\"2\">\r\n        <sq-eyes [xPos]=\"xPos\" [yPos]=\"yPos\"></sq-eyes>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/cursor-follower/cursor-follower/cursor-follower.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursorFollowerListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cursor_follower_service__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CursorFollowerListComponent = (function () {
    function CursorFollowerListComponent(viewContainerRef, componentFactoryResolver, cursorFollowerService, elementRef) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cursorFollowerService = cursorFollowerService;
        this.elementRef = elementRef;
        this.cursorFollowerIndex = 1;
        this.cursorFollowerReady = false;
        this.show = 'invisible';
    }
    CursorFollowerListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.cursorFollowerService.selectedCursorFollower.subscribe(function (value) {
            if (value != 1) {
                _this.show = 'visible';
            }
            else {
                _this.show = 'invisible';
            }
        });
    };
    return CursorFollowerListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('cursorFollower', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */] }),
    __metadata("design:type", Object)
], CursorFollowerListComponent.prototype, "cursorFollower", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], CursorFollowerListComponent.prototype, "xPos", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], CursorFollowerListComponent.prototype, "yPos", void 0);
CursorFollowerListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-cursor-follower',
        template: __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower/cursor-follower.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cursor-follower/cursor-follower/cursor-follower.component.css")],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_37" /* trigger */])('show', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('invisible', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ 'opacity': 0 })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('visible', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ 'opacity': 1 })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('invisible => visible', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])(2000)),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('visible => invisible', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])(1000))
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* ViewContainerRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ComponentFactoryResolver */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__cursor_follower_service__["a" /* CursorFollowerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cursor_follower_service__["a" /* CursorFollowerService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _d || Object])
], CursorFollowerListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=cursor-follower.component.js.map

/***/ }),

/***/ "../../../../../src/app/cursor-follower/eyes/eyes.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".outerEye{\r\n\tborder: solid black;\r\n\tborder-radius: 50px;\r\n    display: inline-block;\r\n    position: absolute;   \r\n}\r\n\r\n.innerEye{\r\n    width: 1px;\r\n    height: 1px;\r\n    border: solid black;\r\n    border-radius: 50px;\r\n    background: black;\r\n    position:absolute;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cursor-follower/eyes/eyes.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <div class=\"outerEye\" id=\"lOEye\" #lOEye [@move]=\"moveState\" (@move.done)=\"onDone($event)\" >    \r\n        <div class=\"innerEye\" id=\"lIEye\" #lIEye ></div></div>\r\n    <div class=\"outerEye\" id=\"rOEye\" #rOEye >\r\n        <div class=\"innerEye\" id=\"rIEye\" #rIEye ></div></div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/cursor-follower/eyes/eyes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EyesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EyesComponent = (function () {
    function EyesComponent(renderer) {
        this.renderer = renderer;
        this.moveState = "state1";
        this.eyesCenterX = 0;
        this.eyesCenterY = 0;
        this.xDormant = true;
        this.lerpSpeed = 0.05;
        this.eyeSize = 30;
        this.eyeballSize = 8;
        this.eyeballCen = 0;
        this.xPos = 900;
        this.yPos = 200;
    }
    EyesComponent.prototype.ngAfterViewInit = function () {
        //set the size of the outer eye
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'height', this.eyeSize + 'px');
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'width', this.eyeSize + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'height', this.eyeSize + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'width', this.eyeSize + 'px');
        //set the size of the eyeballs
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'height', this.eyeballSize + 'px');
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'width', this.eyeballSize + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'height', this.eyeballSize + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'width', this.eyeballSize + 'px');
        //begining position of the eyes
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'left', this.xPos + 'px');
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'top', this.yPos + 400 + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'left', this.xPos + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'top', this.yPos + 400 + 'px');
        //begining positions of the eyeblls
        this.eyeballCen = this.eyeSize / 2 - this.eyeballSize + 1;
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'left', this.eyeballCen + 'px');
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'top', this.eyeballCen + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'left', this.eyeballCen + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'top', this.eyeballCen + 'px');
    };
    EyesComponent.prototype.onDone = function ($event) {
        this.moveEyes();
    };
    EyesComponent.prototype.moveEyes = function () {
        var leftEyeLeftDist = parseFloat(this.leftEye.nativeElement.style.left);
        var leftEyeTopDist = parseFloat(this.leftEye.nativeElement.style.top);
        var leftOffset = -(this.eyeSize + this.eyeSize / 2);
        var topBottom = this.yPos - leftEyeTopDist;
        if (topBottom < 0) {
            topBottom = 50;
        }
        else {
            topBottom = -80;
        }
        var distance = Math.sqrt(Math.pow(this.xPos + leftOffset - leftEyeLeftDist, 2) + Math.pow(this.yPos + topBottom - leftEyeTopDist, 2));
        var xNorm = (this.xPos + leftOffset - leftEyeLeftDist) / distance;
        var yNorm = (this.yPos + topBottom - leftEyeTopDist) / distance;
        var xSpeed = Math.abs(xNorm);
        var ySpeed = Math.abs(yNorm);
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'left', leftEyeLeftDist + (xSpeed * this.lerpSpeed * (this.xPos + leftOffset - leftEyeLeftDist)) + 'px');
        this.renderer.setElementStyle(this.leftEye.nativeElement, 'top', leftEyeTopDist + (ySpeed * this.lerpSpeed * (this.yPos + topBottom - leftEyeTopDist)) + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'left', parseFloat(this.leftEye.nativeElement.style.left) + 2 * this.eyeSize + 'px');
        this.renderer.setElementStyle(this.rightEye.nativeElement, 'top', leftEyeTopDist + (ySpeed * this.lerpSpeed * (this.yPos + topBottom - leftEyeTopDist)) + 'px');
        this.moveEyeballs(leftOffset, leftEyeLeftDist, leftEyeTopDist);
        this.moveState == 'state1' ? this.moveState = 'state2' : this.moveState = 'state1';
    };
    EyesComponent.prototype.moveEyeballs = function (leftOffset, leftEyeLeftDist, leftEyeTopDist) {
        var eyeballDist = Math.sqrt(Math.pow(this.xPos + leftOffset - leftEyeLeftDist, 2) + Math.pow(this.yPos - leftEyeTopDist, 2));
        var xEBNorm = (this.xPos + leftOffset - leftEyeLeftDist) / eyeballDist;
        var yEBNorm = (this.yPos - leftEyeTopDist) / eyeballDist;
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'left', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * xEBNorm + 'px');
        this.renderer.setElementStyle(this.leftEyeball.nativeElement, 'top', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * yEBNorm + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'left', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * xEBNorm + 'px');
        this.renderer.setElementStyle(this.rightEyeball.nativeElement, 'top', this.eyeballCen + (this.eyeSize / 2 - this.eyeballSize / 2) * yEBNorm + 'px');
    };
    return EyesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('lOEye'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], EyesComponent.prototype, "leftEye", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('lIEye'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _b || Object)
], EyesComponent.prototype, "leftEyeball", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('rOEye'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _c || Object)
], EyesComponent.prototype, "rightEye", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('rIEye'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _d || Object)
], EyesComponent.prototype, "rightEyeball", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], EyesComponent.prototype, "xPos", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], EyesComponent.prototype, "yPos", void 0);
EyesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-eyes',
        template: __webpack_require__("../../../../../src/app/cursor-follower/eyes/eyes.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cursor-follower/eyes/eyes.component.css")],
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_37" /* trigger */])('move', [
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('void', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ 'opacity': 0 })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('state1', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ 'opacity': 1 })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_34" /* state */])('state2', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_35" /* style */])({ 'opacity': 1 })),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('state1 <=> state2', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])(1)),
                Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_36" /* transition */])('void => state1', Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_22" /* animate */])(1))
            ])
        ]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _e || Object])
], EyesComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=eyes.component.js.map

/***/ }),

/***/ "../../../../../src/app/cursor/cursor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CursorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CursorService = (function () {
    function CursorService() {
        this.selectedCursor = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
        this.cursors = [
            { img: '../assets/clip-art/None.png', index: 1 },
            { img: '../assets/cursors/cursor_green.png', storeImg: '../assets/cursors/cursor_green_store.png', index: 2 },
            { img: '../assets/cursors/cursor_red.png', storeImg: '../assets/cursors/cursor_red_store.png', index: 3 },
            { img: '../assets/cursors/cursor_yellow.png', storeImg: '../assets/cursors/cursor_yellow_store.png', index: 4 },
            { img: '../assets/cursors/cursor_blue.png', storeImg: '../assets/cursors/cursor_blue_store.png', index: 5 }
        ];
    }
    CursorService.prototype.getCursors = function () {
        return this.cursors;
    };
    CursorService.prototype.getCursorByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["find"](this.cursors, { index: index }).img;
    };
    return CursorService;
}());
CursorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], CursorService);

//# sourceMappingURL=cursor.service.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".logo {\r\n    margin: auto;\r\n    display: block;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<img src=\"../assets/clip-art/SQ.png\" class=\"logo\">"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".coin {\r\n    width: 20px;\r\n    height: 20px;\r\n    display: inline-block;\r\n}\r\n\r\n#coinWrapper {\r\n    width: 150px;\r\n}\r\n\r\na {\r\n    padding-right: 4%;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n}\r\n\r\nbutton:focus {\r\n    outline:0;\r\n}\r\n\r\nbutton {\r\n    width: 100px;\r\n    height: 50px;\r\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n}\r\n\r\n.menu-toolbar {\r\n    min-width: 700px;\r\n\tbackground-color: lightskyblue;\r\n\tcolor: white;\r\n\tmin-height: 60px;\r\n\t-ms-flex-align: center;\r\n\t    align-items: center;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n    margin-bottom: 25px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar class=\"menu-toolbar\" fxFlex md-scroll-shrink>\r\n    <div class=\"container max-width\" fxFlex=\"95\" fxFlex.gt-md=\"1164px\" fxLayout=\"row\" fxLayoutAlign=\"center center\" fxLayoutGap=\"25px\">\r\n        <button mat-button color=\"primary\" [routerLink]=\"['/']\" class=\"navbar-brand\">SQ</button>\r\n        <button mat-button color=\"primary\" [routerLink]=\"['/profile']\">Home</button>\r\n        <button mat-button color=\"primary\" [routerLink]=\"['/games']\" >Games</button>\r\n        <span flex></span>\r\n        <a id=\"coinWrapper\" *ngIf=\"userService.isLoggedIn()\">\r\n            <img src=\"../assets/clip-art/GoldCoin.png\" class=\"coin\">{{goldCoins | number:'2.0-0'}}\r\n            <img src=\"../assets/clip-art/SilverCoin.png\" class=\"coin\"/>{{silverCoins | number:'2.0-0'}}\r\n        </a>\r\n        <span flex></span>\r\n        <button mat-button color=\"primary\" *ngIf=\"!userService.isLoggedIn()\" [routerLink]=\"['/auth/signup']\">Sign Up</button>\r\n        <button mat-button color=\"primary\" *ngIf=\"!userService.isLoggedIn()\" [routerLink]=\"['/auth/login']\">Login</button>\r\n        <button mat-button color=\"primary\" *ngIf=\"userService.isLoggedIn()\" (click)=\"logout()\">Logout</button>\r\n    </div>\r\n</mat-toolbar>"

/***/ }),

/***/ "../../../../../src/app/navbar/navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cursor_cursor_service__ = __webpack_require__("../../../../../src/app/cursor/cursor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cursor_follower_cursor_follower_service__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_utils_coins_service__ = __webpack_require__("../../../../../src/app/shared/utils/coins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_user_user_service__ = __webpack_require__("../../../../../src/app/shared/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavbarComponent = (function () {
    function NavbarComponent(router, userService, coinsService, cursorService, cursorFollowerService) {
        this.router = router;
        this.userService = userService;
        this.coinsService = coinsService;
        this.cursorService = cursorService;
        this.cursorFollowerService = cursorFollowerService;
        this.silverCoins = 0;
        this.goldCoins = 0;
    }
    NavbarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.coinsService.coins.subscribe(function (coins) {
            _this.silverCoins = coins % 100;
            _this.goldCoins = Math.floor(coins / 100);
        });
    };
    NavbarComponent.prototype.logout = function () {
        this.userService.logout();
        this.router.navigateByUrl('/home');
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-navbar',
        template: __webpack_require__("../../../../../src/app/navbar/navbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/navbar/navbar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_user_user_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_utils_coins_service__["a" /* CoinsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_utils_coins_service__["a" /* CoinsService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__cursor_cursor_service__["a" /* CursorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__cursor_cursor_service__["a" /* CursorService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */]) === "function" && _e || Object])
], NavbarComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/cookies/cookies.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookiesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CookiesService = (function () {
    function CookiesService() {
    }
    /*
     * get the value of a cookie
     */
    CookiesService.prototype.getCookie = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    CookiesService.prototype.addCookie = function (cookieKey, cookieValue) {
        document.cookie = cookieKey + '=' + cookieValue + '; Path=/;';
    };
    CookiesService.prototype.removeCookie = function (cname) {
        document.cookie = cname + '=; Path=/;';
    };
    return CookiesService;
}());
CookiesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], CookiesService);

//# sourceMappingURL=cookies.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sq-toasty/sq-toasty.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toasty; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_toasty__ = __webpack_require__("../../../../ng2-toasty/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Toasty = (function () {
    function Toasty(toastyConfig, toastyService) {
        this.toastyConfig = toastyConfig;
        this.toastyService = toastyService;
        this.toastyConfig.theme = 'default';
    }
    /*
     * set the options here - the theme ( bootstrap or material) - title and message are required
     */
    Toasty.prototype.setToastConf = function (title, message) {
        return this.toastOptions = {
            title: title,
            msg: message,
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: function (toast) { },
            onRemove: function (toast) { }
        };
    };
    Toasty.prototype.error = function (message) {
        this.toastyService.error(this.setToastConf('Error', message));
    };
    return Toasty;
}());
Toasty = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_toasty__["a" /* ToastyConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_toasty__["a" /* ToastyConfig */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_toasty__["c" /* ToastyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_toasty__["c" /* ToastyService */]) === "function" && _b || Object])
], Toasty);

var _a, _b;
//# sourceMappingURL=sq-toasty.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/user/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cookies_cookies_service__ = __webpack_require__("../../../../../src/app/shared/cookies/cookies.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cursor_cursor_service__ = __webpack_require__("../../../../../src/app/cursor/cursor.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(cookiesService, cursorFollowerService, cursorService) {
        this.cookiesService = cookiesService;
        this.cursorFollowerService = cursorFollowerService;
        this.cursorService = cursorService;
        this.grade = 0;
    }
    UserService.prototype.logIn = function (user) {
        this.cookiesService.addCookie('sessionToken', user.sessionToken);
        this.cursorService.selectedCursor.next(user.cursorId);
        this.cursorFollowerService.selectedCursorFollower.next(user.cursorFollowerId);
        this.grade = user.grade;
    };
    UserService.prototype.isLoggedIn = function () {
        return !!this.cookiesService.getCookie('sessionToken');
    };
    UserService.prototype.logout = function () {
        // if we are not logged in, nothing to do - just return ok
        if (!this.isLoggedIn())
            return;
        this.cursorService.selectedCursor.next(1);
        this.cursorFollowerService.selectedCursorFollower.next(1);
        this.grade = 0;
        // destroy the current session
        this.cookiesService.removeCookie('sessionToken');
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cookies_cookies_service__["a" /* CookiesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cookies_cookies_service__["a" /* CookiesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__cursor_cursor_service__["a" /* CursorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__cursor_cursor_service__["a" /* CursorService */]) === "function" && _c || Object])
], UserService);

var _a, _b, _c;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/utils/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cookies_cookies_service__ = __webpack_require__("../../../../../src/app/shared/cookies/cookies.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__coins_service__ = __webpack_require__("../../../../../src/app/shared/utils/coins.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ApiService = (function () {
    function ApiService(http, cookieService, coinsService) {
        this.http = http;
        this.cookieService = cookieService;
        this.coinsService = coinsService;
    }
    /*
     * patch request
     */
    ApiService.prototype.patch = function (path, params) {
        var token = this.cookieService.getCookie('token');
        if (token)
            params['token'] = token;
        return this.http.patch('https://scholarquest.herokuapp.com/api/' + path, params)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error.json()); });
    };
    /*
     * post request
     */
    ApiService.prototype.post = function (path, params) {
        var sessionToken = this.cookieService.getCookie('sessionToken');
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        if (sessionToken)
            params.sessionToken = sessionToken;
        // always do post calls - no need to differentiate between get/post/put/patch, etc.
        // the caller model should subscribe to this observable and handle errors
        var resp = this.http.post('https://scholarquest.herokuapp.com/api/' + path, JSON.stringify(params), options);
        return resp.map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error); });
    };
    /*
     * add to the users score
     */
    ApiService.prototype.addCoins = function (coins) {
        var _this = this;
        this.post('getStudent', { 'token': this.cookieService.getCookie('token') }).subscribe(function (response) {
            _this.coinsService.coins.next(response.coins + coins);
            _this.patch('student/patchStudent', { 'token': _this.cookieService.getCookie('token'), 'coins': response.coins + coins }).subscribe(function (r) {
            });
        });
    };
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__cookies_cookies_service__["a" /* CookiesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__cookies_cookies_service__["a" /* CookiesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__coins_service__["a" /* CoinsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__coins_service__["a" /* CoinsService */]) === "function" && _c || Object])
], ApiService);

var _a, _b, _c;
//http://Sample-env.d2apiyj8p6.us-west-2.elasticbeanstalk.com/ 
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/utils/array.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArrayService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ArrayService = (function () {
    function ArrayService() {
    }
    /*
     * shuffle an array
     */
    ArrayService.prototype.shuffle = function (arr) {
        var returnArr = arr.slice();
        for (var i = returnArr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = returnArr[i];
            returnArr[i] = returnArr[j];
            returnArr[j] = temp;
        }
        return returnArr;
    };
    /*
     * select a random elements from an array
     */
    ArrayService.prototype.selectRandom = function (arr, num) {
        var tempArr = arr.slice();
        var returnArr = [];
        for (var i = 0; i < num; i++) {
            returnArr.push(tempArr.splice(Math.floor(Math.random() * tempArr.length), 1)[0]);
        }
        return returnArr;
    };
    return ArrayService;
}());
ArrayService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ArrayService);

//# sourceMappingURL=array.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/utils/coins.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoinsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CoinsService = (function () {
    function CoinsService() {
        this.coins = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"]();
    }
    return CoinsService;
}());
CoinsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], CoinsService);

//# sourceMappingURL=coins.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map