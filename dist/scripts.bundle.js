webpackJsonp(["scripts"],{

/***/ "../../../../raw-loader/index.js!../../../../phaser-ce/build/phaser.js":
/***/ (function(module, exports) {


/***/ }),

/***/ "../../../../script-loader/addScript.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),

/***/ "../../../../script-loader/index.js!../../../../phaser-ce/build/phaser.js":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../../script-loader/addScript.js")(__webpack_require__("../../../../raw-loader/index.js!../../../../phaser-ce/build/phaser.js"))

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../script-loader/index.js!../../../../phaser-ce/build/phaser.js");


/***/ })

},[2]);
//# sourceMappingURL=scripts.bundle.js.map