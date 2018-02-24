webpackJsonp(["store.module"],{

/***/ "../../../../../src/app/student/store/store-item/store-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".item {\r\n    width: 300px;\r\n}\r\n\r\n.store-item {\r\n    width: 300px;\r\n    margin: auto;\r\n    display: block;\r\n    background-color: Transparent;\r\n    border: none;\r\n    cursor: pointer;\r\n}\r\n\r\n.currency {\r\n    font-size: 30px;\r\n    display: inline-block;\r\n}\r\n\r\n.coin {\r\n    height: 40px;\r\n    display: inline-block;\r\n}\r\n\r\n.price {\r\n    margin-top: -30px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/store/store-item/store-item.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"store-item\">\r\n    <img [src]=\"storeItemPath\" class=\"item\">\r\n    <img src=\"../../assets/store/shelf.png\" class=\"item\">\r\n    <div class=\"price\">\r\n        <img src=\"../../assets/clip-art/GoldCoin.png\" class=\"coin\">\r\n        <p class=\"currency\">{{ item.price / 100 }}</p>\r\n    </div>\r\n</button>"

/***/ }),

/***/ "../../../../../src/app/student/store/store-item/store-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreItemComponent; });
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

var StoreItemComponent = (function () {
    function StoreItemComponent() {
        this.storeItemPath = '';
    }
    StoreItemComponent.prototype.ngOnInit = function () {
        this.storeItemPath = '../../assets/avatars/shirts/store/' + this.item.name + '.png';
    };
    return StoreItemComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Object)
], StoreItemComponent.prototype, "item", void 0);
StoreItemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'store-item',
        template: __webpack_require__("../../../../../src/app/student/store/store-item/store-item.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/store/store-item/store-item.component.css")],
    })
], StoreItemComponent);

//# sourceMappingURL=store-item.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/store/store-page/store-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "store-item {\r\n    margin: auto;\r\n    display: block;\r\n}\r\n\r\nh1 {\r\n    text-align: center;\r\n}\r\n\r\n.dialog-product {\r\n    width: 300px;\r\n}\r\n\r\n.coin {\r\n    height: 40px;\r\n    display: inline-block;\r\n}\r\n\r\n.currency {\r\n    font-size: 30px;\r\n    display: inline-block;\r\n}\r\n\r\n.dialog-content {\r\n    margin: auto;\r\n    display: block;\r\n    background-color: Transparent;\r\n    border: none;\r\n}\r\n\r\n.price {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n}\r\n.dialog-buttons {\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-align: center;\r\n        align-items: center;\r\n    -ms-flex-pack: center;\r\n        justify-content: center;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/student/store/store-page/store-page.component.html":
/***/ (function(module, exports) {

module.exports = "<br>\r\n<h1>Store</h1>\r\n<br>\r\n<p *ngIf=\"noProducts\">There are no products left</p>\r\n<div fxLayout=\"column\" fxLayout.lg=\"row\" fxLayout.xl=\"row\" *ngFor=\"let row of productRows; let r = index\">\r\n    <store-item *ngFor=\"let column of [null, null, null]; let c = index\" fxFlex=\"33\"[item]=\"products[(r*3) + c]\" (click)=\"openConfirmationDialog(products[(r*3) + c])\"></store-item>\r\n<div>\r\n\r\n<ng-template #confirmationDialog>\r\n    <mat-dialog-content>\r\n        <div class=\"dialog-content\">\r\n            <img [src]=\"dialogProductItem\" class=\"dialog-product\">\r\n            <div class=\"price\">\r\n                <img src=\"../../assets/clip-art/GoldCoin.png\" class=\"coin\">\r\n                <p class=\"currency\">{{ dialogProductPrice / 100}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"dialog-buttons\">\r\n            <button mat-button (click)=\"buy()\">Buy</button>\r\n            <button mat-button (click)=\"cancel()\">Cancel</button>\r\n        </div>\r\n    </mat-dialog-content>\r\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/student/store/store-page/store-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorePageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__ = __webpack_require__("../../../../../src/app/shared/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StorePageComponent = (function () {
    function StorePageComponent(apiService, dialog, snackBar, user) {
        var _this = this;
        this.apiService = apiService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.user = user;
        this.products = [];
        this.noProducts = false;
        this.productRows = [];
        this.apiService.post('getProducts', {}).subscribe(function (data) {
            if (!data.status || !data.products.length) {
                _this.noProducts = true;
                return;
            }
            _this.products = data.products;
            if (_this.products.length) {
                _this.productRows = Array(Math.ceil((_this.products.length) / 3));
            }
        }, function (error) {
            _this.noProducts = true;
        });
    }
    StorePageComponent.prototype.openConfirmationDialog = function (product) {
        this.dialogProductItem = '../../assets/avatars/shirts/store/' + product.name + '.png';
        this.dialogProductPrice = product.price;
        this.dialogProductId = product.product_id;
        this.dialogRef = this.dialog.open(this.confirmationDialog);
    };
    StorePageComponent.prototype.buy = function () {
        var _this = this;
        if (!this.user.isLoggedIn()) {
            this.snackBar.open('You must be logged in to buy this item', 'close');
            return;
        }
        this.apiService.post('buyProduct', { product_id: this.dialogProductId }).subscribe(function (data) {
            if (data.status == 'Error') {
                _this.snackBar.open(data.error_message, 'close');
                return;
            }
            _this.dialogRef.close();
        }, function (error) {
            _this.snackBar.open('An unknown error has occured', 'close');
        });
    };
    StorePageComponent.prototype.cancel = function () {
        this.dialogRef.close();
    };
    return StorePageComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('confirmationDialog'),
    __metadata("design:type", Object)
], StorePageComponent.prototype, "confirmationDialog", void 0);
StorePageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/student/store/store-page/store-page.component.html"),
        styles: [__webpack_require__("../../../../../src/app/student/store/store-page/store-page.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatDialog */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatSnackBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */]) === "function" && _d || Object])
], StorePageComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=store-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/student/store/store.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreModule", function() { return StoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_page_store_page_component__ = __webpack_require__("../../../../../src/app/student/store/store-page/store-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_item_store_item_component__ = __webpack_require__("../../../../../src/app/student/store/store-item/store-item.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__store_page_store_page_component__["a" /* StorePageComponent */] },
    { path: 'store', component: __WEBPACK_IMPORTED_MODULE_5__store_page_store_page_component__["a" /* StorePageComponent */] },
];
var StoreModule = (function () {
    function StoreModule() {
    }
    return StoreModule;
}());
StoreModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["d" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_3__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["f" /* MatDialogModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_material__["o" /* MatSnackBarModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__store_page_store_page_component__["a" /* StorePageComponent */],
            __WEBPACK_IMPORTED_MODULE_6__store_item_store_item_component__["a" /* StoreItemComponent */]
        ],
    })
], StoreModule);

//# sourceMappingURL=store.module.js.map

/***/ })

});
//# sourceMappingURL=store.module.chunk.js.map