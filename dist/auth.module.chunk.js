webpackJsonp(["auth.module"],{

/***/ "../../../../../src/app/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__welcome_email_sent_welcome_email_sent_component__ = __webpack_require__("../../../../../src/app/auth/welcome-email-sent/welcome-email-sent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__ = __webpack_require__("../../../../../src/app/auth/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login_component__ = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__email_verified_email_verified_component__ = __webpack_require__("../../../../../src/app/auth/email-verified/email-verified.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_form_sq_form_module__ = __webpack_require__("../../../../../src/app/shared/form/sq-form.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__["a" /* SignupComponent */] },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__["a" /* SignupComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */] },
    { path: 'welcome', component: __WEBPACK_IMPORTED_MODULE_6__welcome_email_sent_welcome_email_sent_component__["a" /* WelcomeEmailSentComponent */] },
    { path: 'verified/:id', component: __WEBPACK_IMPORTED_MODULE_9__email_verified_email_verified_component__["a" /* EmailVerifiedComponent */] }
];
var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_flex_layout__["a" /* FlexLayoutModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["d" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_10__shared_form_sq_form_module__["a" /* SqFormModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__signup_signup_component__["a" /* SignupComponent */],
            __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_6__welcome_email_sent_welcome_email_sent_component__["a" /* WelcomeEmailSentComponent */],
            __WEBPACK_IMPORTED_MODULE_9__email_verified_email_verified_component__["a" /* EmailVerifiedComponent */]
        ]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map

/***/ }),

/***/ "../../../../../src/app/auth/email-verified/email-verified.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div {\r\n    text-align: center;\r\n    margin-top: 100px;\r\n    min-width: 300px;\r\n}\r\n\r\n#backdrop{\r\n    margin-top: 100px;\r\n    background-color: cornsilk;\r\n    padding-top: 50px;\r\n    padding-bottom: 50px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/email-verified/email-verified.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxFlex=\"100\" fxLayoutAlign=\"center\">\r\n    <mat-card *ngIf=\"emailVerified\"> Your account has been activated. Have Fun!\r\n        <div>\r\n            <button mat-button color=\"primary\" [routerLink]=\"['/profile']\">Make My Avatar</button>    \r\n            <button mat-button color=\"primary\" [routerLink]=\"['/games']\">Play Games</button>    \r\n        </div>\r\n     </mat-card>\r\n    <mat-card *ngIf=\"!emailVerified\"> We could not activate your account at this time. Create an account.\r\n        <div>\r\n            <button mat-button color=\"primary\" [routerLink]=\"['/auth/signup']\">Create Account</button>    \r\n        </div>\r\n    </mat-card>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/auth/email-verified/email-verified.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailVerifiedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
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




var EmailVerifiedComponent = (function () {
    function EmailVerifiedComponent(route, apiService, userService) {
        var _this = this;
        this.route = route;
        this.apiService = apiService;
        this.userService = userService;
        this.emailVerified = false;
        this.apiService.post('verifyEmail', { id: this.route.snapshot.params['id'] }).subscribe(function (session) {
            _this.userService.logIn(session.sessionToken);
            _this.emailVerified = true;
        }, function (error) {
            _this.emailVerified = false;
        });
    }
    return EmailVerifiedComponent;
}());
EmailVerifiedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/auth/email-verified/email-verified.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/email-verified/email-verified.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_utils_api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_user_user_service__["a" /* UserService */]) === "function" && _c || Object])
], EmailVerifiedComponent);

var _a, _b, _c;
//# sourceMappingURL=email-verified.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#wrapper{\r\n    height: 500px;\r\n    width: 510px;\r\n    margin: auto;\r\n}\r\n#bwrapper{\r\n    text-align: center;\r\n}\r\n\r\ninput{\r\n    width: 505px;\r\n}\r\n\r\n.error{\r\n    color: orangered;\r\n    text-align: center;\r\n}\r\n\r\nh1{\r\n   text-align: center;\r\n}\r\n\r\n.container{\r\n    background-color:cornsilk;\r\n    height: 500px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxFlex=\"100\" fxLayoutAlign=\"center\">\r\n    <sq-form title=\"Login\" submit-api=\"login\" scroll (formSubmitted)=\"loginFormSubmitted($event)\">\r\n        <text-field name=\"email\" label=\"Email\" required></text-field>\r\n        <text-field name=\"password\" label=\"Password\" required is-password></text-field>\r\n    </sq-form>\r\n</div>\r\n    "

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__ = __webpack_require__("../../../../../src/app/shared/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    LoginComponent.prototype.loginFormSubmitted = function (user) {
        this.userService.logIn(user);
        this.router.navigateByUrl('/profile');
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/auth/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/login/login.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_user_user_service__["a" /* UserService */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/signup/signup.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.container{\r\n    background-repeat: no-repeat;\r\n    background-image: url(/js/app/8221e90f9c2da2b1a58149ce8c942254.png);\r\n    background-position: center;\r\n    background-size: 1000px 790px;\r\n    width: 1000px;\r\n    height: 790px;\r\n    cursor: url('/js/app/308281ede951b237bb229366f85dc6ad.png'), pointer;\r\n}\r\n\r\n.wrapper{\r\n    padding-top: 100px;\r\n    padding-left: 50px;\r\n    width: 600px;\r\n    margin: auto;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxFlex=\"100\" fxLayoutAlign=\"center\">\r\n    <sq-form title=\"Create your Account\" submit-api=\"signup\" complete-route=\"../welcome\" scroll>\r\n        <text-field name=\"firstName\" label=\"First Name\" required></text-field>\r\n        <text-field name=\"lastName\" label=\"Last Name\" required></text-field>\r\n        <text-field name=\"email\" label=\"Email\" required validate-email></text-field>\r\n        <text-field #pwd name=\"password\" label=\"Password\" required is-password validate-password=\"confirmPassword\"></text-field>\r\n        <text-field name=\"confirmPassword\" label=\"Confirm Your Password\" required is-password validate-identical=\"password\"></text-field>\r\n        <select-field name=\"grade\" placeholder=\"Grade\" required [options]=\"gradeOptions\"></select-field>\r\n    </sq-form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/auth/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SignupComponent = (function () {
    function SignupComponent() {
        this.gradeOptions = [{ value: '1st', key: 1 }, { value: '2nd', key: 2 }, { value: '3rd', key: 3 }, { value: '4th', key: 4 }, { value: '5th', key: 5 }, { value: '6th', key: 6 }];
    }
    return SignupComponent;
}());
SignupComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/auth/signup/signup.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/signup/signup.component.css")]
    })
], SignupComponent);

//# sourceMappingURL=signup.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/welcome-email-sent/welcome-email-sent.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "div {\r\n    margin:auto;\r\n    width: 250px;\r\n    margin-top: 250px;\r\n    text-align: center;\r\n}\r\n\r\n#backdrop{\r\n    margin-top: 100px;\r\n    background-color: cornsilk;\r\n    padding-top: 50px;\r\n    padding-bottom: 50px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/welcome-email-sent/welcome-email-sent.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxFlex=\"60\" fxLayout.xs=\"column\" fxLayoutGap=\"25px\" fxLayoutAlign=\"center\">\r\n    <mat-card> \r\n        <p>Thank you for making an account!</p>\r\n        <p>Check your email for instructions on how to verify your account. </p>\r\n        <p> Once you've done that you can make your avatar and start earning points! </p>\r\n    </mat-card>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/auth/welcome-email-sent/welcome-email-sent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeEmailSentComponent; });
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

var WelcomeEmailSentComponent = (function () {
    function WelcomeEmailSentComponent() {
    }
    return WelcomeEmailSentComponent;
}());
WelcomeEmailSentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/auth/welcome-email-sent/welcome-email-sent.component.html"),
        styles: [__webpack_require__("../../../../../src/app/auth/welcome-email-sent/welcome-email-sent.component.css")],
    }),
    __metadata("design:paramtypes", [])
], WelcomeEmailSentComponent);

//# sourceMappingURL=welcome-email-sent.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/email-validator/email.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * email validator directive
 */
var EmailValidator = (function () {
    function EmailValidator() {
    }
    /*
     * validation function
     */
    EmailValidator.validate = function (c) {
        // empty value is valid - just because we're doing email validation does not mean it's required
        if (!c.value)
            return null;
        // email validation regular expression
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        // split the control value by commas and check every email - if any one of them does not match, error out
        for (var _i = 0, _a = c.value.split(','); _i < _a.length; _i++) {
            var email = _a[_i];
            if (!EMAIL_REGEXP.test(email.trim()))
                return { invalid: true };
        }
        // seems to be valid email - return null
        return null;
    };
    return EmailValidator;
}());
EmailValidator = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({
        selector: '[validateEmail][ngControl],[validateEmail][ngModel],[validateEmail][ngFormControl]'
    })
], EmailValidator);

//# sourceMappingURL=email.validator.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/form-field/form-field.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormField; });
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

/*
 * form field base class
 */
var FormField = (function () {
    function FormField() {
    }
    /*
     * returns the value promises upon form submission - return the value from the control by default
     * the reason we do not return the value directly without a promise is because it may include reading files when it's a file input (or other type of input that would require async operation)
     */
    FormField.prototype.getValuePromise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { resolve({ field_name: _this.name, field_value: _this.form.value[_this.name] }); });
    };
    /*
     * this call is used when the value changes after a certain period of time, usually from the API - sometimes due to the components used the form value updates may not take effect in the UI (or may be partial)
     * this is a work around for those cases - there is probably a better way of handling this but for now it works - this logic is to be implemented by the child when necessary
     */
    FormField.prototype.setValue = function (value) { };
    return FormField;
}());

__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('name'),
    __metadata("design:type", String)
], FormField.prototype, "name", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('label'),
    __metadata("design:type", String)
], FormField.prototype, "label", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('required'),
    __metadata("design:type", Boolean)
], FormField.prototype, "required", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('default-value'),
    __metadata("design:type", Object)
], FormField.prototype, "defaultValue", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('inline'),
    __metadata("design:type", Boolean)
], FormField.prototype, "inline", void 0);
//# sourceMappingURL=form-field.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/identical-validator/identical.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdenticalValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * identical validator directive - used for password confirmation - if a field is identical to another field, it becomes valid
 */
var IdenticalValidator = (function () {
    function IdenticalValidator() {
    }
    /*
     * validation generating function based on the identical inputs
     */
    IdenticalValidator.validator = function (formComponent, identicalInput) {
        // returns the function that will do the actual validation
        return function (control) {
            if (!formComponent.form || !control.value)
                return;
            // console.log(control.value);
            // console.log(formComponent.form.controls[identicalInput].value);
            // if the value of the control we have is not identical to the control that should be the same, return different
            if (formComponent.form && control.value && formComponent.form.controls[identicalInput].value && control.value != formComponent.form.controls[identicalInput].value) {
                return { different: true };
            }
            // inputs seem to be identical - return null
            return null;
        };
    };
    return IdenticalValidator;
}());
IdenticalValidator = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({
        selector: '[validateIdentical][ngControl],[validateIdentical][ngModel],[validateIdentical][ngFormControl]'
    })
], IdenticalValidator);

//# sourceMappingURL=identical.validator.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/password-validator/password.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * password validator directive
 */
var PasswordValidator = (function () {
    function PasswordValidator() {
    }
    /*
     * validation function
     */
    PasswordValidator.validator = function (formComponent, identicalInput) {
        // returns the function that will do the actual validation
        return function (control) {
            if (!formComponent.form || !formComponent.form.controls[identicalInput])
                return null;
            formComponent.form.controls[identicalInput].setValue('');
            formComponent.form.controls[identicalInput].markAsUntouched();
            // empty value is valid - just because we're doing email validation does not mean it's required
            if (!control.value)
                return null;
            // password has to be at least 8 characters long
            if (control.value.length < 6)
                return { weak: true };
            // seems to be a valid password - return null
            return null;
        };
    };
    return PasswordValidator;
}());
PasswordValidator = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Directive */])({
        selector: '[validatePassword][ngControl],[validatePassword][ngModel],[validatePassword][ngFormControl]'
    })
], PasswordValidator);

//# sourceMappingURL=password.validator.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/select-field/select-field.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mat-input-container {\r\n    width: 100%;\r\n    font-size: 150%;\r\n    font-family:\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/form/select-field/select-field.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-form-field [formGroup]=\"form\">\r\n    <mat-select [placeholder]=\"placeholder\" [formControlName]=\"name\" [required]=\"required\">\r\n        <mat-option *ngFor=\"let option of options\" [value]=\"option.key\">{{ option.value }}</mat-option>\r\n    </mat-select>\r\n</mat-form-field>"

/***/ }),

/***/ "../../../../../src/app/shared/form/select-field/select-field.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_field_form_field__ = __webpack_require__("../../../../../src/app/shared/form/form-field/form-field.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
 * select field component
 */
var SelectFieldComponent = (function (_super) {
    __extends(SelectFieldComponent, _super);
    function SelectFieldComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeholder = '';
        return _this;
    }
    return SelectFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__form_field_form_field__["a" /* FormField */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('name'),
    __metadata("design:type", String)
], SelectFieldComponent.prototype, "name", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('required'),
    __metadata("design:type", Boolean)
], SelectFieldComponent.prototype, "required", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('options'),
    __metadata("design:type", Array)
], SelectFieldComponent.prototype, "options", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('placeholder'),
    __metadata("design:type", String)
], SelectFieldComponent.prototype, "placeholder", void 0);
SelectFieldComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'select-field',
        template: __webpack_require__("../../../../../src/app/shared/form/select-field/select-field.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/form/select-field/select-field.component.css")]
    })
], SelectFieldComponent);

//# sourceMappingURL=select-field.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/sq-form.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqFormModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sq_form_sq_form_component__ = __webpack_require__("../../../../../src/app/shared/form/sq-form/sq-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__text_field_text_field_component__ = __webpack_require__("../../../../../src/app/shared/form/text-field/text-field.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__select_field_select_field_component__ = __webpack_require__("../../../../../src/app/shared/form/select-field/select-field.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__email_validator_email_validator__ = __webpack_require__("../../../../../src/app/shared/form/email-validator/email.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__identical_validator_identical_validator__ = __webpack_require__("../../../../../src/app/shared/form/identical-validator/identical.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__password_validator_password_validator__ = __webpack_require__("../../../../../src/app/shared/form/password-validator/password.validator.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var SqFormModule = (function () {
    function SqFormModule() {
    }
    return SqFormModule;
}());
SqFormModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["k" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["h" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["l" /* MatSelectModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__sq_form_sq_form_component__["a" /* SqFormComponent */],
            __WEBPACK_IMPORTED_MODULE_5__text_field_text_field_component__["a" /* TextFieldComponent */],
            __WEBPACK_IMPORTED_MODULE_7__email_validator_email_validator__["a" /* EmailValidator */],
            __WEBPACK_IMPORTED_MODULE_8__identical_validator_identical_validator__["a" /* IdenticalValidator */],
            __WEBPACK_IMPORTED_MODULE_9__password_validator_password_validator__["a" /* PasswordValidator */],
            __WEBPACK_IMPORTED_MODULE_6__select_field_select_field_component__["a" /* SelectFieldComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__sq_form_sq_form_component__["a" /* SqFormComponent */],
            __WEBPACK_IMPORTED_MODULE_5__text_field_text_field_component__["a" /* TextFieldComponent */],
            __WEBPACK_IMPORTED_MODULE_7__email_validator_email_validator__["a" /* EmailValidator */],
            __WEBPACK_IMPORTED_MODULE_8__identical_validator_identical_validator__["a" /* IdenticalValidator */],
            __WEBPACK_IMPORTED_MODULE_9__password_validator_password_validator__["a" /* PasswordValidator */],
            __WEBPACK_IMPORTED_MODULE_6__select_field_select_field_component__["a" /* SelectFieldComponent */]
        ],
    })
], SqFormModule);

//# sourceMappingURL=sq-form.module.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/sq-form/sq-form.component.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("../../../../css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1 {\r\n    text-align: center;\r\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n    font-weight: bold;\r\n}\r\n\r\nbutton {\r\n    background-color: Transparent;\r\n    background-image: url(" + escape(__webpack_require__("../../../../../src/assets/form/scroll_button_border.png")) + ");\r\n    background-position: center;\r\n    background-size: 100px 75px;\r\n    width: 100px;\r\n    height: 75px;\r\n    font-family: \"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n    font-size: 150%;\r\n    margin-top: 10px;\r\n    cursor: url(" + escape(__webpack_require__("../../../../../src/assets/form/quill.png")) + "), pointer !important;\r\n}\r\n\r\nbutton:hover {\r\n    cursor: url(" + escape(__webpack_require__("../../../../../src/assets/form/quill.png")) + "), pointer !important;\r\n}\r\n\r\n.buttonWrapper {\r\n    text-align: center;\r\n    cursor: url(" + escape(__webpack_require__("../../../../../src/assets/form/quill.png")) + "), pointer !important;\r\n}\r\n\r\n.buttonWrapper:hover {\r\n    cursor: url(" + escape(__webpack_require__("../../../../../src/assets/form/quill.png")) + "), pointer !important;\r\n} \r\n\r\n.scroll {\r\n    background-repeat: no-repeat;\r\n    background-image: url(" + escape(__webpack_require__("../../../../../src/assets/form/scroll.png")) + ");\r\n    background-position: center;\r\n    background-size: 1000px 900px;\r\n    width: 1000px;\r\n    height: 900px;\r\n    cursor: url(" + escape(__webpack_require__("../../../../../src/assets/form/quill.png")) + "), pointer;\r\n}\r\n\r\n.scrollWrapper {\r\n    padding-top: 100px;\r\n    padding-left: 50px;\r\n    width: 600px;\r\n    margin: auto;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/form/sq-form/sq-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"scroll\" class=\"scroll\">\r\n    <div class=\"scrollWrapper\">\r\n        <h1>{{title}}</h1>\r\n        <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\r\n            <ng-content select=\"text-field,select-field\"></ng-content>\r\n            <div class=\"buttonWrapper\">\r\n                <button mat-button type=\"submit\" [disabled]=\"!form.valid\">Submit</button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/form/sq-form/sq-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__text_field_text_field_component__ = __webpack_require__("../../../../../src/app/shared/form/text-field/text-field.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__select_field_select_field_component__ = __webpack_require__("../../../../../src/app/shared/form/select-field/select-field.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__email_validator_email_validator__ = __webpack_require__("../../../../../src/app/shared/form/email-validator/email.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__identical_validator_identical_validator__ = __webpack_require__("../../../../../src/app/shared/form/identical-validator/identical.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__password_validator_password_validator__ = __webpack_require__("../../../../../src/app/shared/form/password-validator/password.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_api_service__ = __webpack_require__("../../../../../src/app/shared/utils/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sq_toasty_sq_toasty_component__ = __webpack_require__("../../../../../src/app/shared/sq-toasty/sq-toasty.component.ts");
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










var SqFormComponent = (function () {
    function SqFormComponent(fb, apiService, router, route, toasty) {
        this.fb = fb;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.toasty = toasty;
        this.title = '';
        this.submitApi = '';
        // if the parent wants to do its own submit processing, this is the event for it - when this is set, we will not submit to the API and refer to the parent instead
        this.formSubmitted = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
        // form field components sent to us from the template
        this.fields = [];
    }
    SqFormComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // get all form fields in a single array
        this.textFields.forEach(function (field) { _this.fields.push(field); });
        this.selectFields.forEach(function (field) { _this.fields.push(field); });
        if (this.scroll != undefined)
            this.scroll = true;
        // build the form group initialization data
        var group = {};
        this.fields.forEach(function (field) {
            var fieldValidators = [];
            if (field.required != undefined)
                fieldValidators.push(__WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required);
            if (field.validateEmail != undefined)
                fieldValidators.push(__WEBPACK_IMPORTED_MODULE_5__email_validator_email_validator__["a" /* EmailValidator */].validate);
            if (field.validatePassword != undefined)
                fieldValidators.push(__WEBPACK_IMPORTED_MODULE_7__password_validator_password_validator__["a" /* PasswordValidator */].validator(_this, field.validatePassword));
            if (field.validateIdentical != undefined)
                fieldValidators.push(__WEBPACK_IMPORTED_MODULE_6__identical_validator_identical_validator__["a" /* IdenticalValidator */].validator(_this, field.validateIdentical));
            // prepare the field control data - we may use default values when applicable
            var fieldControl = [field.defaultValue || '', fieldValidators];
            // add the field control to the main control group
            group[field.name] = fieldControl;
        });
        // build the form group main control group
        this.form = this.fb.group(group);
        // set the field form component reference
        this.fields.forEach(function (field) { field.form = _this.form; });
    };
    SqFormComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.apiService.post(this.submitApi, this.form.value).subscribe(function (data) {
                    if (data.status != "Success") {
                        _this.toasty.error(data.error);
                        return;
                    }
                    _this.formSubmitted.emit(data);
                    // if completion route is given, proceed to the new screen
                    if (_this.completeRoute) {
                        // get the parameters required coming from router parameter - get it from the configured parameter
                        var params = {};
                        // now proceed to the completion screen
                        _this.router.navigate([_this.completeRoute, params], { relativeTo: _this.route });
                    }
                }, function (error) {
                    _this.toasty.error(error.error);
                });
                return [2 /*return*/];
            });
        });
    };
    return SqFormComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('title'),
    __metadata("design:type", String)
], SqFormComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('submit-api'),
    __metadata("design:type", String)
], SqFormComponent.prototype, "submitApi", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('complete-route'),
    __metadata("design:type", String)
], SqFormComponent.prototype, "completeRoute", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('scroll'),
    __metadata("design:type", Boolean)
], SqFormComponent.prototype, "scroll", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", Object)
], SqFormComponent.prototype, "formSubmitted", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_3__text_field_text_field_component__["a" /* TextFieldComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* QueryList */]) === "function" && _a || Object)
], SqFormComponent.prototype, "textFields", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ContentChildren */])(__WEBPACK_IMPORTED_MODULE_4__select_field_select_field_component__["a" /* SelectFieldComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* QueryList */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* QueryList */]) === "function" && _b || Object)
], SqFormComponent.prototype, "selectFields", void 0);
SqFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'sq-form',
        template: __webpack_require__("../../../../../src/app/shared/form/sq-form/sq-form.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/form/sq-form/sq-form.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8__utils_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__utils_api_service__["a" /* ApiService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_9__sq_toasty_sq_toasty_component__["a" /* Toasty */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__sq_toasty_sq_toasty_component__["a" /* Toasty */]) === "function" && _g || Object])
], SqFormComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=sq-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/form/text-field/text-field.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mat-input-container {\r\n    width: 100%;\r\n    font-size: 150%;\r\n    font-family:\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/form/text-field/text-field.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-form-field class=\"select-wrapper\" [formGroup]=\"form\">\r\n    <input matInput [placeholder]=\"label\" [formControlName]=\"name\" [required]=\"required\" #textInput [type]=\"isPassword ? 'password' : ''\" (blur)=\"focused=false\" (focus)=\"focused=true\"/>\r\n    <mat-error *ngIf=\"showErrorMessage('invalid')\">{{ label }} is invalid.</mat-error>\r\n    <mat-error *ngIf=\"showErrorMessage('different')\">These passwords don't match.</mat-error>\r\n    <mat-error *ngIf=\"showErrorMessage('weak')\">{{ label }} should contain 6 characters or more.</mat-error>\r\n</mat-form-field>"

/***/ }),

/***/ "../../../../../src/app/shared/form/text-field/text-field.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__form_field_form_field__ = __webpack_require__("../../../../../src/app/shared/form/form-field/form-field.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
 * text input form field component
 */
var TextFieldComponent = (function (_super) {
    __extends(TextFieldComponent, _super);
    function TextFieldComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focused = false;
        return _this;
    }
    TextFieldComponent.prototype.ngAfterContentInit = function () {
        if (this.isPassword != undefined)
            this.isPassword = true;
    };
    TextFieldComponent.prototype.showErrorMessage = function (error) {
        if (!this.form || !this.form.controls[this.name] || !this.form.controls[this.name].errors)
            return false;
        return (this.form.controls[this.name].errors[error] && this.form.controls[this.name].dirty && !this.form.controls[this.name].valid && !this.focused);
    };
    return TextFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__form_field_form_field__["a" /* FormField */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('name'),
    __metadata("design:type", String)
], TextFieldComponent.prototype, "name", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('label'),
    __metadata("design:type", String)
], TextFieldComponent.prototype, "label", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('required'),
    __metadata("design:type", Boolean)
], TextFieldComponent.prototype, "required", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('is-password'),
    __metadata("design:type", Boolean)
], TextFieldComponent.prototype, "isPassword", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('validate-email'),
    __metadata("design:type", Boolean)
], TextFieldComponent.prototype, "validateEmail", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('validate-password'),
    __metadata("design:type", Boolean)
], TextFieldComponent.prototype, "validatePassword", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('validate-identical'),
    __metadata("design:type", Boolean)
], TextFieldComponent.prototype, "validateIdentical", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])('readonly'),
    __metadata("design:type", Boolean)
], TextFieldComponent.prototype, "readonly", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('textInput'),
    __metadata("design:type", Object)
], TextFieldComponent.prototype, "textInput", void 0);
TextFieldComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'text-field',
        template: __webpack_require__("../../../../../src/app/shared/form/text-field/text-field.component.html"),
        styles: [__webpack_require__("../../../../../src/app/shared/form/text-field/text-field.component.css")]
    })
], TextFieldComponent);

//# sourceMappingURL=text-field.component.js.map

/***/ }),

/***/ "../../../../../src/assets/form/quill.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "quill.308281ede951b237bb22.png";

/***/ }),

/***/ "../../../../../src/assets/form/scroll.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "scroll.8221e90f9c2da2b1a581.png";

/***/ }),

/***/ "../../../../../src/assets/form/scroll_button_border.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "scroll_button_border.c2e94a057befb9c332d4.png";

/***/ }),

/***/ "../../../../css-loader/lib/url/escape.js":
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ })

});
//# sourceMappingURL=auth.module.chunk.js.map