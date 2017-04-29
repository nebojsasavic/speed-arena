(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    p: 'p'.charCodeAt(0) // 'p' = Pause
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    MAIN_MENU: 0,
    PLAYING: 1,
    PAUSED: 2
};

},{}],3:[function(require,module,exports){
'use strict';

var _gameStates = require('./game_state/game-states');

var _gameStates2 = _interopRequireDefault(_gameStates);

var _formatTime = require('./utilities/format-time');

var _formatTime2 = _interopRequireDefault(_formatTime);

var _charCodes = require('./config/char-codes');

var _charCodes2 = _interopRequireDefault(_charCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CANVAS = document.getElementById('canvas');
var CONTEXT = CANVAS.getContext('2d');

var currentGameState = _gameStates2.default.PLAYING;
var gameStart = +new Date();
var timeDelta = 0;
var gameTimeElapsed = 0;

setupEventListeners();

/* The main render function. */
var render = function render() {

    switch (currentGameState) {
        case _gameStates2.default.MAIN_MENU:
            drawMainMenu(CONTEXT);
            break;
        case _gameStates2.default.PLAYING:
            CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

            CONTEXT.fillStyle = 'black';
            CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

            CONTEXT.font = '40px Arial';
            CONTEXT.fillStyle = 'red';
            CONTEXT.textAlign = 'center';

            // Calculate time.
            // timeDelta += (+(new Date) - gameStart) / 1000
            // if (timeDelta > 1) {
            //     gameTimeElapsed += parseInt(timeDelta, 10)
            //     timeDelta %= 1
            // }

            CONTEXT.fillText((0, _formatTime2.default)(gameTimeElapsed), CANVAS.width / 2, CANVAS.height / 2);

            window.requestAnimationFrame(render);
            break;
        case _gameStates2.default.PAUSED:
            CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

            CONTEXT.fillStyle = 'red';
            CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
            break;
    }
};

function drawMainMenu(CONTEXT) {
    // Draw background.
    CONTEXT.fillStyle = 'black';
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

    // Draw menu buttons.
    CONTEXT.font = '40px Arial';
    CONTEXT.fillStyle = 'red';
    CONTEXT.textAlign = 'center';
    CONTEXT.fillText('PLAY', CANVAS.width / 2, CANVAS.height / 2);
}

var initializeCanvas = function initializeCanvas(CANVAS) {

    var resizeCanvas = function resizeCanvas() {
        CANVAS.width = window.innerWidth;
        CANVAS.height = window.innerHeight;
        render();
    };

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas(CANVAS);
};
initializeCanvas(CANVAS);

function setupEventListeners() {
    window.addEventListener('keypress', function (event) {
        switch (event.charCode) {
            case _charCodes2.default.p:
                if (currentGameState === _gameStates2.default.PAUSED) {
                    currentGameState = _gameStates2.default.PLAYING;
                    window.requestAnimationFrame(render);
                } else {
                    currentGameState = _gameStates2.default.PAUSED;
                }
                break;
        }
        console.log(currentGameState);
    });
}

},{"./config/char-codes":1,"./game_state/game-states":2,"./utilities/format-time":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (timeDifferenceInMillis) {
    return formatTime(parseInt(timeDifferenceInMillis, 10));
};

var PAD = '0';

function formatTime(seconds) {

    // Seconds.

    seconds = seconds % 60;

    if (seconds < 10) {
        seconds = PAD + seconds;
    }

    // Minutes.

    var minutes = parseInt(seconds / 60, 10);

    if (minutes < 10) {
        minutes = PAD + minutes;
    }

    return minutes + ':' + seconds;
}

},{}]},{},[3]);
