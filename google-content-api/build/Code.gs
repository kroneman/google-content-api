function doGet(e) {
}
function testPermissions() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var google_doc_content_1 = __webpack_require__(/*! ./google-doc-content */ "./src/google-doc-content.ts");
global.doGet = function (e) {
    var htmlData = google_doc_content_1.getGoogleDocContent();
    var json = JSON.stringify({
        html: htmlData
    });
    return ContentService.createTextOutput(json)
        .setMimeType(ContentService.MimeType.JSON);
};
// since doGet is run on a request permissions should be tested via this function in the online editor
global.testPermissions = function () {
    var htmlData = google_doc_content_1.getGoogleDocContent();
    var json = JSON.stringify({
        html: htmlData
    });
    var jsonString = ContentService.createTextOutput(json)
        .setMimeType(ContentService.MimeType.JSON);
    return jsonString;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/google-doc-content.ts":
/*!***********************************!*\
  !*** ./src/google-doc-content.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var searchForFileByTitle = function (fileName) {
    var files = DriveApp.searchFiles("title = \"" + fileName + "\"");
    while (files.hasNext()) {
        var file = files.next();
        Logger.log(file.getName());
        Logger.log(file.getId());
        return file;
    }
};
function getGoogleDocAsHtml(file) {
    var htmlExportLink = "https://docs.google.com/feeds/download/documents/export/Export?id=" + file.getId() + "&exportFormat=html";
    if (!htmlExportLink) {
        throw "File cannot be converted to HTML.";
    }
    var oAuthToken = ScriptApp.getOAuthToken();
    var response = UrlFetchApp.fetch(htmlExportLink, {
        headers: {
            Authorization: "Bearer " + oAuthToken,
        },
        muteHttpExceptions: true,
    });
    if (response.getResponseCode() !== 200) {
        throw "Error converting to HTML: " + response.getContentText();
    }
    return response.getContentText();
}
/**
 * Source: https://stackoverflow.com/questions/14663852/get-google-document-as-html
 */
function sanitizeHtml(html) {
    var sanitizedHtml = html;
    var htmlToRemove = [
        // nuke the whole head section, including the stylesheet and meta tag
        /<head>.*<\/head>/,
        // remove almost all html attributes
        / (id|class|style|start|colspan|rowspan)="[^"]*"/g,
        // remove all of the spans, as well as the outer html and body
        /<(span|\/span|body|\/body|html|\/html)>/g,
    ];
    htmlToRemove.forEach(function (regEx) {
        sanitizedHtml = sanitizedHtml.replace(regEx, '');
    });
    // clearly the superior way of denoting line breaks
    sanitizedHtml = sanitizedHtml.replace(/<br>/g, '<br />');
    return sanitizedHtml;
}
function getGoogleDocContent() {
    var googleDoc = searchForFileByTitle("web-content-document");
    var html = getGoogleDocAsHtml(googleDoc);
    var sanitizedHtml = sanitizeHtml(html);
    Logger.log(sanitizedHtml);
    return sanitizedHtml;
}
exports.getGoogleDocContent = getGoogleDocContent;


/***/ })

/******/ });