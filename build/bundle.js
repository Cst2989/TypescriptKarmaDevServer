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


	/*
	 * Here we select de refresh button, and the close buttons for each recomandation
	 */
	let refreshButton = document.querySelector('.refresh');
	let closeButton1 = document.querySelector('.close1');
	let closeButton2 = document.querySelector('.close2');
	let closeButton3 = document.querySelector('.close3');


	/*
	 * Here we create streams from each button click
	 */
	let refreshClickStream = Observable.fromEvent(refreshButton, 'click');
	let close1Clicks = Observable.fromEvent(closeButton1, 'click');
	let close2Clicks = Observable.fromEvent(closeButton2, 'click');
	let close3Clicks = Observable.fromEvent(closeButton3, 'click');


	/*
	 * refreshOnClick - we map each click to the API link + a random number
	 */
	let refreshOnClick = refreshClickStream.map(ev => {
	    let randomNumber = Math.floor(Math.random() * 500);
	    return 'https://api.github.com/users?since=' + randomNumber;
	});


	//This is the starting url
	let startRequestStream = Observable.of('https://api.github.com/users');


	/*
	 * responseStream -  we merge the refreshClick stream with the start stream and flatMap over it.
	 * It will fetch a response which will be made into an Observable.
	 * Multiple subscribes to the same stream will use the same response.
	 *
	*/
	let responseStream = refreshOnClick.merge(startRequestStream).flatMap(response => {
	    return Observable.fromPromise(fetch(response).then(r => r.json()));
	}).publishReplay(1).refCount()


	//getRandomUser -  we return a random user from an array of users
	function getRandomUser(listUser) {
	    return listUser[Math.floor(Math.random() * listUser.length)]
	}


	/*
	 * createSuggestionStream - from the responseStream we get a random user
	 * Prepends the null value to the stream.
	 * Merges with the refresh click stream with every value maped to null
	 * Merges with the closeClickStream which uses the last responseStream
	 */
	function createSuggestionStream(responseStream, closeClickStream) {
	    return responseStream.map(listUser => getRandomUser(listUser))
	    .startWith(null)
	    .merge(refreshClickStream.map(ev => null))
	    .merge(
	      closeClickStream.withLatestFrom(responseStream,
	                                  (x, R) => getRandomUser(R))
	    );
	}

	//Here we create the streams for each row. The second and third row filters the values before them.
	let suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
	let suggestion2Stream = createSuggestionStream(responseStream.filter(r => r != suggestion1Stream), close2Clicks);
	let suggestion3Stream = createSuggestionStream(responseStream.filter(r => r != suggestion2Stream), close3Clicks);

	// Rendering ---------------------------------------------------
	function renderSuggestion(suggestedUser, selector) {
	    let suggestionEl = document.querySelector(selector);
	    if (suggestedUser === null) {
	        suggestionEl.style.visibility = 'hidden';
	    } else {
	        suggestionEl.style.visibility = 'visible';
	        let usernameEl = suggestionEl.querySelector('.username');
	        usernameEl.href = suggestedUser.html_url;
	        usernameEl.textContent = suggestedUser.login;
	        let imgEl = suggestionEl.querySelector('img');
	        imgEl.src = "";
	        imgEl.src = suggestedUser.avatar_url;
	    }
	}


	//The stream subscriptions.
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