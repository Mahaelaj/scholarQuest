webpackJsonp(["user-profile.module"],{

/***/ "../../../../../src/app/shared/card/button-grid-card/button-grid-card.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "img {\r\n    display: block;\r\n    width: 90px;\r\n    height: 90px;\r\n    margin: auto;  \r\n    background-color: white;\r\n}\r\n\r\nmat-grid-tile {\r\n    border: solid grey 2px;\r\n}\r\n\r\nh1 {\r\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n    font-weight: bold;\r\n    font-size: 25px;\r\n}\r\n\r\n.options {\r\n    padding: 4px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/card/button-grid-card/button-grid-card.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n    <h1>{{title}}</h1>\r\n    <div *ngIf=\"miniOptions\" class=\"options\">\r\n        <mat-grid-list #miniList [cols]=\"miniOptions.length\" rowHeight=\"20px\">\r\n            <mat-grid-tile *ngFor=\"let miniOption of miniOptions\"\r\n                [style.background-color]=\"(miniOption.index == selectedMini ? 'green' : '')\"\r\n                (click)=\"miniClicked(miniOption.index)\"\r\n                (mouseover)=\"onMouseOverMiniTile(miniOption.index)\"\r\n                (mouseleave)=\"onMouseLeaveMiniTile(miniOption.index)\">\r\n            <img [src]=miniOption.img/>\r\n            </mat-grid-tile>\r\n        </mat-grid-list>\r\n        <br>\r\n    </div>\r\n    <div class=\"options\">\r\n    <mat-grid-list #normList [cols]=columns rowHeight=\"100px\" class=\"normList\" class=\"options\">\r\n            <mat-grid-tile *ngFor=\"let option of options\"\r\n                [style.background-color]=\"(option.index == selectedNorm ? 'green' : '')\"\r\n                (click)=\"clicked(option.index)\"\r\n                (mouseover)=\"onMouseOverTile(option.index)\"\r\n                (mouseleave)=\"onMouseLeaveTile(option.index)\">\r\n            <img [src]=\"option.storeImg ? option.storeImg : option.img\"/>\r\n            </mat-grid-tile>\r\n        </mat-grid-list>\r\n    </div>\r\n    <br>\r\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/shared/card/button-grid-card/button-grid-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonGridCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ButtonGridCardComponent = (function () {
    function ButtonGridCardComponent(apiService, renderer) {
        this.apiService = apiService;
        this.renderer = renderer;
        this.hoverColor = 'blue';
        this.selectedColor = 'green';
        this.backgroundColor = 'grey';
        this.columns = 4;
        this.selectedNorm = 1;
        this.normButtonClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.miniButtonClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    ButtonGridCardComponent.prototype.ngAfterViewInit = function () {
        this.normTiles = this.normList._element.nativeElement.children[0].children;
        if (this.miniList)
            this.miniTiles = this.miniList._element.nativeElement.children[0].children;
    };
    /*
     * called when a button is clicked
     */
    ButtonGridCardComponent.prototype.clicked = function (index) {
        this.selectedNorm = index;
        var selection = { normIndex: this.selectedNorm };
        if (this.selectedMini)
            selection.miniIndex = this.selectedMini;
        this.normButtonClicked.emit(selection);
    };
    ButtonGridCardComponent.prototype.miniClicked = function (index) {
        this.selectedMini = index;
        for (var i = 0; i < this.options.length; i++) {
            if (this.miniOptions[i].index == index)
                this.renderer.setElementStyle(this.miniTiles[i], 'background-color', this.selectedColor);
            else
                this.renderer.setElementStyle(this.miniTiles[i], 'background-color', null);
        }
        this.miniButtonClicked.emit({ miniIndex: index, normIndex: this.selectedNorm });
    };
    ButtonGridCardComponent.prototype.onMouseOverTile = function (index) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].index == index) {
                if (this.normTiles[i].style['background-color'] != this.selectedColor)
                    this.renderer.setElementStyle(this.normTiles[i], 'background-color', this.hoverColor);
            }
        }
    };
    ButtonGridCardComponent.prototype.onMouseLeaveTile = function (index) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].index == index) {
                if (this.normTiles[i].style['background-color'] != this.selectedColor)
                    this.renderer.setElementStyle(this.normTiles[i], 'background-color', null);
            }
        }
    };
    ButtonGridCardComponent.prototype.onMouseOverMiniTile = function (index) {
        for (var i = 0; i < this.miniOptions.length; i++) {
            if (this.miniOptions[i].index == index) {
                if (this.miniTiles[i].style['background-color'] != this.selectedColor)
                    this.renderer.setElementStyle(this.miniTiles[i], 'background-color', this.hoverColor);
            }
        }
    };
    ButtonGridCardComponent.prototype.onMouseLeaveMiniTile = function (index) {
        for (var i = 0; i < this.miniOptions.length; i++) {
            if (this.miniOptions[i].index == index) {
                if (this.miniTiles[i].style['background-color'] != this.selectedColor)
                    this.renderer.setElementStyle(this.miniTiles[i], 'background-color', null);
            }
        }
    };
    return ButtonGridCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('hoverColor'),
    __metadata("design:type", String)
], ButtonGridCardComponent.prototype, "hoverColor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('selectedColor'),
    __metadata("design:type", String)
], ButtonGridCardComponent.prototype, "selectedColor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('backgroundColor'),
    __metadata("design:type", String)
], ButtonGridCardComponent.prototype, "backgroundColor", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('title'),
    __metadata("design:type", String)
], ButtonGridCardComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('columns'),
    __metadata("design:type", Number)
], ButtonGridCardComponent.prototype, "columns", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('options'),
    __metadata("design:type", Array)
], ButtonGridCardComponent.prototype, "options", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('miniOptions'),
    __metadata("design:type", Array)
], ButtonGridCardComponent.prototype, "miniOptions", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('patchValue'),
    __metadata("design:type", String)
], ButtonGridCardComponent.prototype, "patchValue", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('initApi'),
    __metadata("design:type", String)
], ButtonGridCardComponent.prototype, "initApi", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('selectedNorm'),
    __metadata("design:type", Object)
], ButtonGridCardComponent.prototype, "selectedNorm", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('selectedMini'),
    __metadata("design:type", Number)
], ButtonGridCardComponent.prototype, "selectedMini", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], ButtonGridCardComponent.prototype, "normButtonClicked", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], ButtonGridCardComponent.prototype, "miniButtonClicked", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('miniList'),
    __metadata("design:type", Object)
], ButtonGridCardComponent.prototype, "miniList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('normList'),
    __metadata("design:type", Object)
], ButtonGridCardComponent.prototype, "normList", void 0);
ButtonGridCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-button-grid-card',
        template: __webpack_require__("../../../../../src/app/shared/card/button-grid-card/button-grid-card.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/card/button-grid-card/button-grid-card.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__utils_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _b || Object])
], ButtonGridCardComponent);

var _a, _b;
//# sourceMappingURL=button-grid-card.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/card/card.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__button_grid_card_button_grid_card_component__ = __webpack_require__("../../../../../src/app/shared/card/button-grid-card/button-grid-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var CardModule = (function () {
    function CardModule() {
    }
    return CardModule;
}());
CardModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_material__["i" /* MatGridListModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__button_grid_card_button_grid_card_component__["a" /* ButtonGridCardComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_3__button_grid_card_button_grid_card_component__["a" /* ButtonGridCardComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__utils_api_service__["a" /* ApiService */]]
    })
], CardModule);

//# sourceMappingURL=card.module.js.map

/***/ }),

/***/ "../../../../../src/app/student/user-profile/avatar-service/avatar.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvatarService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AvatarService = (function () {
    function AvatarService() {
        this.faces = [
            { img: '../../../assets/avatars/face/face1.png', index: 1 },
            { img: '../../../assets/avatars/face/face2.png', index: 2 },
            { img: '../../../assets/avatars/face/face3.png', index: 3 },
            { img: '../../../assets/avatars/face/face4.png', index: 4 },
            { img: '../../../assets/avatars/face/face5.png', index: 5 },
            { img: '../../../assets/avatars/face/face6.png', index: 6 }
        ];
        this.eyes = [
            { img: '../../../assets/avatars/eyes/eyes1/eyes1-amber.png', index: 1, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes1_amber_store.png' },
            { img: '../../../assets/avatars/eyes/eyes1/eyes1-blue.png', index: 1, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes1_blue_store.png' },
            { img: '../../../assets/avatars/eyes/eyes1/eyes1-brown.png', index: 1, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes1_brown_store.png' },
            { img: '../../../assets/avatars/eyes/eyes1/eyes1-green.png', index: 1, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes1_green_store.png' },
            { img: '../../../assets/avatars/eyes/eyes1/eyes1-grey.png', index: 1, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes1_grey_store.png' },
            { img: '../../../assets/avatars/eyes/eyes1/eyes1-hazel.png', index: 1, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes1_hazel_store.png' },
            { img: '../../../assets/avatars/eyes/eyes2/eyes2-amber.png', index: 2, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes2_amber_store.png' },
            { img: '../../../assets/avatars/eyes/eyes2/eyes2-blue.png', index: 2, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes2_blue_store.png' },
            { img: '../../../assets/avatars/eyes/eyes2/eyes2-brown.png', index: 2, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes2_brown_store.png' },
            { img: '../../../assets/avatars/eyes/eyes2/eyes2-green.png', index: 2, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes2_green_store.png' },
            { img: '../../../assets/avatars/eyes/eyes2/eyes2-grey.png', index: 2, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes2_grey_store.png' },
            { img: '../../../assets/avatars/eyes/eyes2/eyes2-hazel.png', index: 2, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes2_hazel_store.png' },
            { img: '../../../assets/avatars/eyes/eyes3/eyes3-amber.png', index: 3, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes3_amber_store.png' },
            { img: '../../../assets/avatars/eyes/eyes3/eyes3-blue.png', index: 3, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes3_blue_store.png' },
            { img: '../../../assets/avatars/eyes/eyes3/eyes3-brown.png', index: 3, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes3_brown_store.png' },
            { img: '../../../assets/avatars/eyes/eyes3/eyes3-green.png', index: 3, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes3_green_store.png' },
            { img: '../../../assets/avatars/eyes/eyes3/eyes3-grey.png', index: 3, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes3_grey_store.png' },
            { img: '../../../assets/avatars/eyes/eyes3/eyes3-hazel.png', index: 3, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes3_hazel_store.png' },
            { img: '../../../assets/avatars/eyes/eyes4/eyes4-amber.png', index: 4, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes4_amber_store.png' },
            { img: '../../../assets/avatars/eyes/eyes4/eyes4-blue.png', index: 4, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes4_blue_store.png' },
            { img: '../../../assets/avatars/eyes/eyes4/eyes4-brown.png', index: 4, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes4_brown_store.png' },
            { img: '../../../assets/avatars/eyes/eyes4/eyes4-green.png', index: 4, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes4_green_store.png' },
            { img: '../../../assets/avatars/eyes/eyes4/eyes4-grey.png', index: 4, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes4_grey_store.png' },
            { img: '../../../assets/avatars/eyes/eyes4/eyes4-hazel.png', index: 4, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes4_hazel_store.png' },
            { img: '../../../assets/avatars/eyes/eyes5/eyes5-amber.png', index: 5, color: 1, storeImg: '../../../assets/avatars/eyes/store/eyes5_amber_store.png' },
            { img: '../../../assets/avatars/eyes/eyes5/eyes5-blue.png', index: 5, color: 2, storeImg: '../../../assets/avatars/eyes/store/eyes5_blue_store.png' },
            { img: '../../../assets/avatars/eyes/eyes5/eyes5-brown.png', index: 5, color: 3, storeImg: '../../../assets/avatars/eyes/store/eyes5_brown_store.png' },
            { img: '../../../assets/avatars/eyes/eyes5/eyes5-green.png', index: 5, color: 4, storeImg: '../../../assets/avatars/eyes/store/eyes5_green_store.png' },
            { img: '../../../assets/avatars/eyes/eyes5/eyes5-grey.png', index: 5, color: 5, storeImg: '../../../assets/avatars/eyes/store/eyes5_grey_store.png' },
            { img: '../../../assets/avatars/eyes/eyes5/eyes5-hazel.png', index: 5, color: 6, storeImg: '../../../assets/avatars/eyes/store/eyes5_hazel_store.png' },
            { img: '../../../assets/avatars/eyes/eyes6/eyes6.png', index: 6, storeImg: '../../../assets/avatars/eyes/store/eyes6_store.png' }
        ];
        this.eyeColors = [
            { img: '../../../assets/avatars/eyes-color/eyes-amber.png', index: 1 },
            { img: '../../../assets/avatars/eyes-color/eyes-blue.png', index: 2 },
            { img: '../../../assets/avatars/eyes-color/eyes-brown.png', index: 3 },
            { img: '../../../assets/avatars/eyes-color/eyes-green.png', index: 4 },
            { img: '../../../assets/avatars/eyes-color/eyes-grey.png', index: 5 },
            { img: '../../../assets/avatars/eyes-color/eyes-hazel.png', index: 6 }
        ];
        this.noses = [
            { img: '../../../assets/avatars/nose/nose1.png', index: 1, storeImg: '../../../assets/avatars/nose/store/nose1_store.png' },
            { img: '../../../assets/avatars/nose/nose2.png', index: 2, storeImg: '../../../assets/avatars/nose/store/nose2_store.png' },
            { img: '../../../assets/avatars/nose/nose3.png', index: 3, storeImg: '../../../assets/avatars/nose/store/nose3_store.png' },
            { img: '../../../assets/avatars/nose/nose4.png', index: 4, storeImg: '../../../assets/avatars/nose/store/nose4_store.png' },
            { img: '../../../assets/avatars/nose/nose5.png', index: 5, storeImg: '../../../assets/avatars/nose/store/nose5_store.png' },
            { img: '../../../assets/avatars/nose/nose6.png', index: 6, storeImg: '../../../assets/avatars/nose/store/nose6_store.png' }
        ];
        this.mouths = [
            { img: '../../../assets/avatars/mouth/mouth1.png', index: 1, storeImg: '../../../assets/avatars/mouth/store/mouth1_store.png' },
            { img: '../../../assets/avatars/mouth/mouth2.png', index: 2, storeImg: '../../../assets/avatars/mouth/store/mouth2_store.png' },
            { img: '../../../assets/avatars/mouth/mouth3.png', index: 3, storeImg: '../../../assets/avatars/mouth/store/mouth3_store.png' },
        ];
        this.hair = [
            { img: '../../../assets/avatars/hair/hair1_cl1.png', index: 1, color: 1, storeImg: '../../../assets/avatars/hair/store/hair1_cl1_store.png' },
            { img: '../../../assets/avatars/hair/hair1_cl2.png', index: 1, color: 2, storeImg: '../../../assets/avatars/hair/store/hair1_cl2_store.png' },
            { img: '../../../assets/avatars/hair/hair1_cl3.png', index: 1, color: 3, storeImg: '../../../assets/avatars/hair/store/hair1_cl3_store.png' },
            { img: '../../../assets/avatars/hair/hair1_cl4.png', index: 1, color: 4, storeImg: '../../../assets/avatars/hair/store/hair1_cl4_store.png' },
            { img: '../../../assets/avatars/hair/hair1_cl5.png', index: 1, color: 5, storeImg: '../../../assets/avatars/hair/store/hair1_cl5_store.png' },
            { img: '../../../assets/avatars/hair/hair1_cl6.png', index: 1, color: 6, storeImg: '../../../assets/avatars/hair/store/hair1_cl6_store.png' },
            { img: '../../../assets/avatars/hair/hair2_cl1.png', index: 2, color: 1, storeImg: '../../../assets/avatars/hair/store/hair2_cl1_store.png' },
            { img: '../../../assets/avatars/hair/hair2_cl2.png', index: 2, color: 2, storeImg: '../../../assets/avatars/hair/store/hair2_cl2_store.png' },
            { img: '../../../assets/avatars/hair/hair2_cl3.png', index: 2, color: 3, storeImg: '../../../assets/avatars/hair/store/hair2_cl3_store.png' },
            { img: '../../../assets/avatars/hair/hair2_cl4.png', index: 2, color: 4, storeImg: '../../../assets/avatars/hair/store/hair2_cl4_store.png' },
            { img: '../../../assets/avatars/hair/hair2_cl5.png', index: 2, color: 5, storeImg: '../../../assets/avatars/hair/store/hair2_cl5_store.png' },
            { img: '../../../assets/avatars/hair/hair2_cl6.png', index: 2, color: 6, storeImg: '../../../assets/avatars/hair/store/hair2_cl6_store.png' },
            { img: '../../../assets/avatars/hair/hair3_cl1.png', index: 3, color: 1, storeImg: '../../../assets/avatars/hair/store/hair3_cl1_store.png' },
            { img: '../../../assets/avatars/hair/hair3_cl2.png', index: 3, color: 2, storeImg: '../../../assets/avatars/hair/store/hair3_cl2_store.png' },
            { img: '../../../assets/avatars/hair/hair3_cl3.png', index: 3, color: 3, storeImg: '../../../assets/avatars/hair/store/hair3_cl3_store.png' },
            { img: '../../../assets/avatars/hair/hair3_cl4.png', index: 3, color: 4, storeImg: '../../../assets/avatars/hair/store/hair3_cl4_store.png' },
            { img: '../../../assets/avatars/hair/hair3_cl5.png', index: 3, color: 5, storeImg: '../../../assets/avatars/hair/store/hair3_cl5_store.png' },
            { img: '../../../assets/avatars/hair/hair3_cl6.png', index: 3, color: 6, storeImg: '../../../assets/avatars/hair/store/hair3_cl6_store.png' }
        ];
        this.hairColors = [
            { img: '../../../assets/avatars/hair/hair-cl/hair_cl1.jpg', index: 1 },
            { img: '../../../assets/avatars/hair/hair-cl/hair_cl2.jpg', index: 2 },
            { img: '../../../assets/avatars/hair/hair-cl/hair_cl3.jpg', index: 3 },
            { img: '../../../assets/avatars/hair/hair-cl/hair_cl4.jpg', index: 4 },
            { img: '../../../assets/avatars/hair/hair-cl/hair_cl5.jpg', index: 5 },
            { img: '../../../assets/avatars/hair/hair-cl/hair_cl6.jpg', index: 6 }
        ];
        this.necks = [
            { img: '../../../assets/avatars/neck/neck-cl1.png', index: 1 },
            { img: '../../../assets/avatars/neck/neck-cl2.png', index: 2 },
            { img: '../../../assets/avatars/neck/neck-cl3.png', index: 3 },
            { img: '../../../assets/avatars/neck/neck-cl4.png', index: 4 },
            { img: '../../../assets/avatars/neck/neck-cl5.png', index: 5 },
            { img: '../../../assets/avatars/neck/neck-cl6.png', index: 6 }
        ];
        this.shirts = [
            { img: '../../../assets/avatars/shirts/shirt_yellow.png', index: 1, storeImg: '../../../assets/avatars/shirts/store/shirt_yellow_store.png' },
            { img: '../../../assets/avatars/shirts/shirt_red.png', index: 2, storeImg: '../../../assets/avatars/shirts/store/shirt_red_store.png' },
            { img: '../../../assets/avatars/shirts/shirt_blue.png', index: 3, storeImg: '../../../assets/avatars/shirts/store/shirt_blue_store.png' }
        ];
        this.arms = [
            { img: '../../../assets/avatars/arms/arms_cl1.png', index: 1 },
            { img: '../../../assets/avatars/arms/arms_cl2.png', index: 2 },
            { img: '../../../assets/avatars/arms/arms_cl3.png', index: 3 },
            { img: '../../../assets/avatars/arms/arms_cl4.png', index: 4 },
            { img: '../../../assets/avatars/arms/arms_cl5.png', index: 5 },
            { img: '../../../assets/avatars/arms/arms_cl6.png', index: 6 }
        ];
        this.pants = [
            { img: '../../../assets/avatars/pants/pants_blue.png', index: 1 },
            { img: '../../../assets/avatars/pants/pants_dark_blue.png', index: 2 },
            { img: '../../../assets/avatars/pants/pants_brown.png', index: 3 }
        ];
        this.shoes = [
            { img: '../../../assets/avatars/shoes/shoes_grey.png', index: 1, storeImg: '../../../assets/avatars/shoes/store/shoes_grey_store.png' },
            { img: '../../../assets/avatars/shoes/shoes_white.png', index: 2, storeImg: '../../../assets/avatars/shoes/store/shoes_white_store.png' },
            { img: '../../../assets/avatars/shoes/shoes_blue.png', index: 3, storeImg: '../../../assets/avatars/shoes/store/shoes_blue_store.png' }
        ];
    }
    AvatarService.prototype.getEyesByColor = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["filter"](this.eyes, { color: index });
    };
    AvatarService.prototype.getHairByColor = function (color) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["filter"](this.hair, { color: color });
    };
    AvatarService.prototype.getShirts = function () {
        return this.shirts;
    };
    AvatarService.prototype.getPants = function () {
        return this.pants;
    };
    AvatarService.prototype.getFaceByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.faces, { index: index }).img;
    };
    AvatarService.prototype.getEyesByIndex = function (eyes) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.eyes, { index: eyes.normIndex, color: eyes.miniIndex }).img;
    };
    AvatarService.prototype.getNoseByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.noses, { index: index }).img;
    };
    AvatarService.prototype.getMouthByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.mouths, { index: index }).img;
    };
    AvatarService.prototype.getHairByIndex = function (hair) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.hair, { index: hair.normIndex, color: hair.miniIndex }).img;
    };
    AvatarService.prototype.getNeckByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.necks, { index: index }).img;
    };
    AvatarService.prototype.getShirtByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.shirts, { index: index }).img;
    };
    AvatarService.prototype.getArmsByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.arms, { index: index }).img;
    };
    AvatarService.prototype.getPantsByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.pants, { index: index }).img;
    };
    AvatarService.prototype.getShoesByIndex = function (index) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["find"](this.shoes, { index: index }).img;
    };
    return AvatarService;
}());
AvatarService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
], AvatarService);

//# sourceMappingURL=avatar.service.js.map

/***/ }),

/***/ "../../../../../src/app/student/user-profile/avatar/avatar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#avatarWrapper {\r\n    position: relative;\r\n    width:500px;\r\n    height:1000px;\r\n    border: solid black; \r\n    margin: auto;\r\n}\r\n\r\nimg {\r\n    display: inline-block;\r\n    position: absolute;\r\n}\r\n\r\n.editMenu{\r\n    display: inline-block;\r\n    vertical-align: top;\r\n}\r\n\r\nbutton {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n#face, #eyes, #nose, #mouth, #neck {\r\n    width: 200px;\r\n    right: 150px;\r\n}\r\n\r\n#face, #eyes, #nose, #mouth {\r\n    top: 50px;\r\n}\r\n\r\n#hair {\r\n    top:1;\r\n    width: 200px;\r\n    right: 149px;\r\n}\r\n\r\n#neck {\r\n    top: 170px;\r\n}\r\n\r\n#shirt {\r\n    top: 180px;\r\n    width: 500px;\r\n    right: 0px;\r\n}\r\n\r\n#arms {\r\n    top: 325px;\r\n    right: 50px; \r\n    width: 400px;\r\n}\r\n\r\n#pants {\r\n    top: 475px;\r\n    right: 85px;\r\n    width: 330px;\r\n}\r\n\r\n#shoes {\r\n    top: 815px;\r\n    width: 370px;\r\n    right: 38px;\r\n}\r\n\r\n #hair {\r\n     top: 30px;\r\n }\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/user-profile/avatar/avatar.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"avatarWrapper\">\r\n   <img id=\"neck\" [src]=\"neckImg\">\r\n    <img id=\"face\" [src]=\"faceImg\">\r\n    <img id=\"eyes\"[src]=\"eyesImg\">\r\n    <img id=\"nose\"[src]=\"noseImg\">\r\n    <img id=\"mouth\"[src]=\"mouthImg\">\r\n    <img id=\"shoes\" [src]=\"shoesImg\">\r\n    <img id=\"pants\" [src]=\"pantsImg\">\r\n    <img id=\"arms\" [src]=\"armsImg\">\r\n    <img id=\"shirt\" [src]=\"shirtImg\"> \r\n    <img id=\"hair\" [src]=\"hairImg\"> \r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/student/user-profile/avatar/avatar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvatarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__avatar_service_avatar_service__ = __webpack_require__("../../../../../src/app/student/user-profile/avatar-service/avatar.service.ts");
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



var AvatarComponent = (function () {
    function AvatarComponent(avatarService, apiService) {
        this.avatarService = avatarService;
        this.apiService = apiService;
        this.avatar = {};
        // when a menu is selected, tell the parent component so that it can update the menu displayed
        this.menuClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        this.avatarDataRetrieved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    AvatarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.apiService.post('getAvatar', {})
            .subscribe(function (avatar) {
            if (!avatar.avatar) {
                _this.setDummyVariables();
                return;
            }
            _this.avatar = avatar.avatar;
            _this.avatarDataRetrieved.emit(avatar.avatar);
            _this.hairImg = _this.avatarService.getHairByIndex({ normIndex: avatar.avatar.hairShapeId, miniIndex: avatar.avatar.hairColorId });
            _this.faceImg = _this.avatarService.getFaceByIndex(avatar.avatar.skinId);
            _this.eyesImg = _this.avatarService.getEyesByIndex({ normIndex: avatar.avatar.eyesShapeId, miniIndex: avatar.avatar.eyesColorId });
            _this.noseImg = _this.avatarService.getNoseByIndex(avatar.avatar.noseId);
            _this.mouthImg = _this.avatarService.getMouthByIndex(avatar.avatar.mouthId);
            _this.neckImg = _this.avatarService.getNeckByIndex(avatar.avatar.skinId);
            _this.shirtImg = _this.avatarService.getShirtByIndex(avatar.avatar.shirtId);
            _this.armsImg = _this.avatarService.getArmsByIndex(avatar.avatar.skinId);
            _this.pantsImg = _this.avatarService.getPantsByIndex(avatar.avatar.pantsId);
            _this.shoesImg = _this.avatarService.getShoesByIndex(avatar.avatar.shoesId);
        }, function (error) {
            _this.setDummyVariables();
        });
    };
    AvatarComponent.prototype.setDummyVariables = function () {
        this.avatar = {
            hairColorId: 3,
            hairShapeId: 3,
            skinId: 3,
            noseId: 3,
            eyesShapeId: 3,
            eyesColorId: 3,
            shoesId: 3,
            mouthId: 3,
            shirtId: 3,
            pantsId: 3
        };
        this.hairShapeId = 3;
        this.hairImg = this.avatarService.getHairByIndex({ normIndex: 3, miniIndex: 3 });
        this.faceImg = this.avatarService.getFaceByIndex(3);
        this.eyesImg = this.avatarService.getEyesByIndex({ normIndex: 3, miniIndex: 3 });
        this.noseImg = this.avatarService.getNoseByIndex(3);
        this.mouthImg = this.avatarService.getMouthByIndex(3);
        this.neckImg = this.avatarService.getNeckByIndex(3);
        this.shirtImg = this.avatarService.getShirtByIndex(3);
        this.armsImg = this.avatarService.getArmsByIndex(3);
        this.pantsImg = this.avatarService.getPantsByIndex(3);
        this.shoesImg = this.avatarService.getShoesByIndex(3);
        this.avatarDataRetrieved.emit(this.avatar);
    };
    return AvatarComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], AvatarComponent.prototype, "menuClicked", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], AvatarComponent.prototype, "avatarDataRetrieved", void 0);
AvatarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-avatar',
        template: __webpack_require__("../../../../../src/app/student/user-profile/avatar/avatar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/user-profile/avatar/avatar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__avatar_service_avatar_service__["a" /* AvatarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__avatar_service_avatar_service__["a" /* AvatarService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */]) === "function" && _b || Object])
], AvatarComponent);

var _a, _b;
//# sourceMappingURL=avatar.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/user-profile/edit-avatar-page/edit-avatar-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "mat-card {\r\n    width: 550px;\r\n    margin: auto;\r\n}\r\n\r\nmat-tab-group {\r\n    padding-bottom: 15px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/user-profile/edit-avatar-page/edit-avatar-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" fxLayout=\"row\" fxFlex=\"100\" fxLayout.xs=\"column\" fxLayout.sm=\"column\" fxLayout.md=\"column\" fxLayoutGap=\"25px\" fxFlexAlign=\"center\">\r\n  <div fxFlex=\"50\" class=\"avatar-container\">\r\n    <mat-card>\r\n      <sq-avatar #avatar (menuClicked)=\"changeMenu($event)\" (avatarDataRetrieved)=\"avatarDataRetrieved($event)\"></sq-avatar>\r\n    </mat-card>\r\n  </div>\r\n  <div fxFlex=\"50\" fxLayout=\"column\">\r\n    <mat-tab-group dynamicHeight>\r\n      <mat-tab label=\"Hair\">\r\n        <sq-button-grid-card\r\n          title=\"Hair\"\r\n          [selectedNorm]=\"avatar.avatar.hairShapeId\" \r\n          [selectedMini]=\"avatar.avatar.hairColorId\"\r\n          [options]=\"hairOptions\"\r\n          [miniOptions]=\"avatarService.hairColors\"\r\n          (normButtonClicked)=\"updateHairShape($event)\"\r\n          (miniButtonClicked)=\"updateHairColor($event)\">\r\n        </sq-button-grid-card> \r\n      </mat-tab>\r\n    </mat-tab-group>\r\n    <mat-tab-group dynamicHeight>\r\n      <mat-tab label=\"Face\">\r\n        <sq-button-grid-card\r\n            title=\"Face\"\r\n            [selectedNorm]=\"avatar.avatar.skinId\" \r\n            [options]=\"avatarService.faces\"\r\n            (normButtonClicked)=\"updateFace($event)\"\r\n          >\r\n          </sq-button-grid-card>\r\n      </mat-tab>\r\n      <mat-tab label=\"Eyes\">\r\n        <sq-button-grid-card\r\n            title=\"Eyes\" \r\n            [selectedMini]=\"avatar.avatar.eyesColorId\"\r\n            [selectedNorm]=\"avatar.avatar.eyesShapeId\" \r\n            [options]=\"eyesOptions\"\r\n            [miniOptions]=\"avatarService.eyeColors\"\r\n            (normButtonClicked)=\"updateEyesShape($event)\"\r\n            (miniButtonClicked)=\"updateEyesColor($event)\">\r\n          </sq-button-grid-card>\r\n      </mat-tab>\r\n      <mat-tab label=\"Nose\">\r\n        <sq-button-grid-card\r\n            title=\"Nose\" \r\n            [selectedNorm]=\"avatar.avatar.noseId\" \r\n            [options]=\"avatarService.noses\"\r\n            (normButtonClicked)=\"updateNose($event)\">\r\n          </sq-button-grid-card>\r\n    </mat-tab>\r\n    <mat-tab label=\"Mouth\" >\r\n      <sq-button-grid-card\r\n          title=\"Mouth\" \r\n          [selectedNorm]=\"avatar.avatar.mouthId\" \r\n          [options]=\"avatarService.mouths\"\r\n          (normButtonClicked)=\"updateMouth($event)\">\r\n        </sq-button-grid-card>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n\r\n     <mat-tab-group dynamicHeight=\"true\">\r\n      <mat-tab label=\"Shirt\">\r\n        <sq-button-grid-card\r\n            title=\"Shirt\"\r\n            [selectedNorm]=\"avatar.avatar.shirtId\" \r\n            [options]=\"avatarService.shirts\"\r\n            (normButtonClicked)=\"updateShirt($event)\">\r\n          </sq-button-grid-card> \r\n      </mat-tab>\r\n        <mat-tab label=\"Pants\">\r\n          <sq-button-grid-card\r\n            [selectedNorm]=\"avatar.avatar.pantsId\" \r\n            title=\"Pants\" \r\n            [options]=\"avatarService.pants\"\r\n            (normButtonClicked)=\"updatePants($event)\">\r\n          </sq-button-grid-card> \r\n        </mat-tab>\r\n        <mat-tab label=\"shoes\">\r\n          <sq-button-grid-card\r\n            [selectedNorm]=\"avatar.avatar.shoesId\" \r\n            title=\"Shoes\" \r\n            [options]=\"avatarService.shoes\"\r\n            (normButtonClicked)=\"updateShoes($event)\">\r\n          </sq-button-grid-card> \r\n        </mat-tab>\r\n     </mat-tab-group>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/student/user-profile/edit-avatar-page/edit-avatar-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditAvatarPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__avatar_service_avatar_service__ = __webpack_require__("../../../../../src/app/student/user-profile/avatar-service/avatar.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__avatar_avatar_component__ = __webpack_require__("../../../../../src/app/student/user-profile/avatar/avatar.component.ts");
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




var EditAvatarPageComponent = (function () {
    function EditAvatarPageComponent(avatarService, apiService) {
        this.avatarService = avatarService;
        this.apiService = apiService;
        this.menuDisplayed = 'face';
    }
    EditAvatarPageComponent.prototype.avatarDataRetrieved = function (avatar) {
        this.hairOptions = this.avatarService.getHairByColor(avatar.hairColorId);
        this.eyesOptions = this.avatarService.getEyesByColor(avatar.eyesColorId);
    };
    EditAvatarPageComponent.prototype.updateHairColor = function (event) {
        this.avatar.hairImg = this.avatarService.getHairByIndex(event);
        this.hairOptions = this.avatarService.getHairByColor(event.miniIndex);
        this.updateDatabase({ hairColorId: event.miniIndex });
    };
    /*
     * change the eyes that are displayed when a new eye color is chosen
     */
    EditAvatarPageComponent.prototype.changeEyesList = function (event) {
        this.eyesOptions = this.avatarService.getEyesByColor(event);
    };
    /*
     * change the displayed face when a face is selected
     */
    EditAvatarPageComponent.prototype.updateFace = function (event) {
        this.avatar.faceImg = this.avatarService.getFaceByIndex(event.normIndex);
        this.avatar.neckImg = this.avatarService.getNeckByIndex(event.normIndex);
        this.avatar.armsImg = this.avatarService.getArmsByIndex(event.normIndex);
        this.updateDatabase({ 'skinId': event.normIndex });
    };
    EditAvatarPageComponent.prototype.updateEyesColor = function (event) {
        this.eyesOptions = this.avatarService.getEyesByColor(event.miniIndex);
        this.avatar.eyesImg = this.avatarService.getEyesByIndex(event);
        this.updateDatabase({ 'eyesColorId': event.miniIndex });
    };
    /*
     * change the displayed eyes when eyes are selected
     */
    EditAvatarPageComponent.prototype.updateEyesShape = function (event) {
        this.avatar.eyesImg = this.avatarService.getEyesByIndex(event);
        this.updateDatabase({ 'eyesShapeId': event.normIndex });
    };
    /*
     * change the displayed nose when a nose is selected
     */
    EditAvatarPageComponent.prototype.updateNose = function (event) {
        this.avatar.noseImg = this.avatarService.getNoseByIndex(event.normIndex);
        this.updateDatabase({ 'noseId': event.normIndex });
    };
    /*
     * change the displayed lips when lips are is selected
     */
    EditAvatarPageComponent.prototype.updateMouth = function (event) {
        this.avatar.mouthImg = this.avatarService.getMouthByIndex(event.normIndex);
        this.updateDatabase({ 'mouthId': event.normIndex });
    };
    EditAvatarPageComponent.prototype.changeMenu = function (event) {
        this.menuDisplayed = event;
    };
    EditAvatarPageComponent.prototype.updateHairShape = function (event) {
        this.avatar.hairImg = this.avatarService.getHairByIndex(event);
        this.updateDatabase({ hairShapeId: event.normIndex });
    };
    EditAvatarPageComponent.prototype.updatePants = function (event) {
        this.avatar.pantsImg = this.avatarService.getPantsByIndex(event.normIndex);
        this.updateDatabase({ 'pantsId': event.normIndex });
    };
    EditAvatarPageComponent.prototype.updateShirt = function (event) {
        this.avatar.shirtImg = this.avatarService.getShirtByIndex(event.normIndex);
        this.updateDatabase({ 'shirtId': event.normIndex });
    };
    EditAvatarPageComponent.prototype.updateShoes = function (event) {
        this.avatar.shoesImg = this.avatarService.getShoesByIndex(event.normIndex);
        this.updateDatabase({ 'shoesId': event.normIndex });
    };
    EditAvatarPageComponent.prototype.updateDatabase = function (params) {
        this.apiService.post('updateAvatar', params)
            .subscribe();
    };
    return EditAvatarPageComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('avatar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__avatar_avatar_component__["a" /* AvatarComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__avatar_avatar_component__["a" /* AvatarComponent */]) === "function" && _a || Object)
], EditAvatarPageComponent.prototype, "avatar", void 0);
EditAvatarPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/student/user-profile/edit-avatar-page/edit-avatar-page.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/user-profile/edit-avatar-page/edit-avatar-page.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__avatar_service_avatar_service__["a" /* AvatarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__avatar_service_avatar_service__["a" /* AvatarService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */]) === "function" && _c || Object])
], EditAvatarPageComponent);

var _a, _b, _c;
//# sourceMappingURL=edit-avatar-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/user-profile/user-profile-page/user-profile-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".block {\r\n    display: inline-block;\r\n}\r\n\r\n.icon {\r\n    width: 40px;\r\n    height: 40px\r\n}\r\n\r\nbutton {\r\n    display: block;\r\n    width: 55px;\r\n    height: 55px;\r\n    margin: auto;\r\n}\r\n\r\nmat-card {\r\n    width: 550px;\r\n    margin: auto;\r\n}\r\n\r\n.cursor-card {\r\n    margin-bottom: 20px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/user-profile/user-profile-page/user-profile-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" fxLayout=\"row\" fxFlex=\"100\" fxLayout.xs=\"column\" fxLayout.sm=\"column\" fxLayout.md=\"column\" fxLayoutGap=\"25px\" fxFlexAlign=\"center\">\r\n  <div fxFlex=\"50\" class=\"avatar-container\">\r\n      <mat-card>\r\n        <sq-avatar></sq-avatar>\r\n        <button  mat-icon-button [routerLink]=\"['edit-avatar']\">\r\n          <img class=\"icon\" src=\"../../../assets/icons/ShirtIcon.png\" />\r\n        </button>\r\n      </mat-card>\r\n  </div>\r\n  <div fxFlex=\"50\">\r\n    <sq-button-grid-card\r\n      class=\"cursor-card\"\r\n      [selectedNorm]=\"studentData.cursorId\"\r\n      title=\"Cursor\"\r\n      patchValue=\"cursor\"\r\n      [options]=\"cursorService.getCursors()\" \r\n      (normButtonClicked)=\"changeCursor($event)\" \r\n      #cursorList>\r\n      </sq-button-grid-card>\r\n    <sq-button-grid-card\r\n    [selectedNorm]=\"studentData.cursorFollowerId\"\r\n     title=\"Cursor Follower\"\r\n     patchValue=\"cursorFollower\" \r\n     [options]=\"cursorFollowerService.getCursorFollowers()\" \r\n     (normButtonClicked)=\"changeCursorFollower($event)\" \r\n     #cursorFollowerList>\r\n     </sq-button-grid-card>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/student/user-profile/user-profile-page/user-profile-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cursor_cursor_service__ = __webpack_require__("../../../../../src/app/cursor/cursor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__ = __webpack_require__("../../../../../src/app/cursor-follower/cursor-follower.service.ts");
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




var UserProfilePageComponent = (function () {
    function UserProfilePageComponent(cursorService, cursorFollowerService, apiService, renderer) {
        this.cursorService = cursorService;
        this.cursorFollowerService = cursorFollowerService;
        this.apiService = apiService;
        this.renderer = renderer;
        this.studentData = { cursorId: 1, cursorFollowerId: 1 };
    }
    UserProfilePageComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.apiService.post('getStudent', {}).subscribe(function (student) {
            if (student.status != 'Success')
                return;
            _this.studentData = student;
        });
    };
    UserProfilePageComponent.prototype.changeCursor = function (event) {
        this.apiService.post('updateCursor', { 'cursorId': event.normIndex }).subscribe();
        this.cursorService.selectedCursor.next(event.normIndex);
    };
    UserProfilePageComponent.prototype.changeCursorFollower = function (event) {
        this.apiService.post('updateCursorFollower', { 'cursorFollowerId': event.normIndex }).subscribe(function (data) { console.log(data); }, function (error) { console.log(error); });
        this.cursorFollowerService.selectedCursorFollower.next(event.normIndex);
    };
    return UserProfilePageComponent;
}());
UserProfilePageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/student/user-profile/user-profile-page/user-profile-page.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/user-profile/user-profile-page/user-profile-page.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__cursor_cursor_service__["a" /* CursorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__cursor_cursor_service__["a" /* CursorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__cursor_follower_cursor_follower_service__["a" /* CursorFollowerService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_utils_api_service__["a" /* ApiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Renderer */]) === "function" && _d || Object])
], UserProfilePageComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=user-profile-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/user-profile/user-profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileModule", function() { return UserProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__avatar_avatar_component__ = __webpack_require__("../../../../../src/app/student/user-profile/avatar/avatar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_profile_page_user_profile_page_component__ = __webpack_require__("../../../../../src/app/student/user-profile/user-profile-page/user-profile-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__edit_avatar_page_edit_avatar_page_component__ = __webpack_require__("../../../../../src/app/student/user-profile/edit-avatar-page/edit-avatar-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_card_card_module__ = __webpack_require__("../../../../../src/app/shared/card/card.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__avatar_service_avatar_service__ = __webpack_require__("../../../../../src/app/student/user-profile/avatar-service/avatar.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__user_profile_page_user_profile_page_component__["a" /* UserProfilePageComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_6__user_profile_page_user_profile_page_component__["a" /* UserProfilePageComponent */] },
    { path: 'edit-avatar', component: __WEBPACK_IMPORTED_MODULE_7__edit_avatar_page_edit_avatar_page_component__["a" /* EditAvatarPageComponent */] }
];
var UserProfileModule = (function () {
    function UserProfileModule() {
    }
    return UserProfileModule;
}());
UserProfileModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_8__shared_card_card_module__["a" /* CardModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["p" /* MatTabsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes)
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__user_profile_page_user_profile_page_component__["a" /* UserProfilePageComponent */],
            __WEBPACK_IMPORTED_MODULE_5__avatar_avatar_component__["a" /* AvatarComponent */],
            __WEBPACK_IMPORTED_MODULE_7__edit_avatar_page_edit_avatar_page_component__["a" /* EditAvatarPageComponent */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_9__avatar_service_avatar_service__["a" /* AvatarService */]]
    })
], UserProfileModule);

//# sourceMappingURL=user-profile.module.js.map

/***/ })

});
//# sourceMappingURL=user-profile.module.chunk.js.map