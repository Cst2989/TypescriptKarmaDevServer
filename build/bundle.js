/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	import { Observable } from 'rxjs';

	var refreshButton = document.querySelector('.refresh');

	var refreshClick = Observable.fromEvent(refreshButton, 'click');

	var requestStream = Observable.of('https://api.github.com/users');

	var responseStream = requestStream.flatMap(response => {
	    return Observable.fromPromise(fetch(response).then(r => r.json()));
	})

	function createSuggestionStream(responseStream) {
	  return responseStream.map(listUser =>
	    listUser[Math.floor(Math.random()*listUser.length)]
	  );
	}

	var suggestion1Stream = createSuggestionStream(responseStream);
	var suggestion2Stream = createSuggestionStream(responseStream.filter(r => r != suggestion1Stream));
	var suggestion3Stream = createSuggestionStream(responseStream.filter(r => r != suggestion2Stream));

	// Rendering ---------------------------------------------------
	function renderSuggestion(suggestedUser, selector) {
	  var suggestionEl = document.querySelector(selector);
	  if (suggestedUser === null) {
	    suggestionEl.style.visibility = 'hidden';
	  } else {
	    suggestionEl.style.visibility = 'visible';
	    var usernameEl = suggestionEl.querySelector('.username');
	    usernameEl.href = suggestedUser.html_url;
	    usernameEl.textContent = suggestedUser.login;
	    var imgEl = suggestionEl.querySelector('img');
	    imgEl.src = "";
	    imgEl.src = suggestedUser.avatar_url;
	  }
	}

	suggestion1Stream.subscribe(user => {
	  renderSuggestion(user, '.suggestion1');
	});

	suggestion2Stream.subscribe(user => {
	  renderSuggestion(user, '.suggestion2');
	});

	suggestion3Stream.subscribe(user => {
	  renderSuggestion(user, '.suggestion3');
	});


/***/ }
/******/ ]);