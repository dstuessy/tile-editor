/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function State() {
  _classCallCheck(this, State);
};

exports.default = State;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _TileEditor = __webpack_require__(2);

var _TileEditor2 = _interopRequireDefault(_TileEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editor = new _TileEditor2.default(window, document.getElementById('game')); /* eslint-disable */


editor.load('1-1.tile');

function update() {
    editor.clear();
    editor.draw();
    editor.update();
    requestAnimationFrame(update);
}

update();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _StateMachine = __webpack_require__(4);

var _StateMachine2 = _interopRequireDefault(_StateMachine);

var _NormalState = __webpack_require__(6);

var _NormalState2 = _interopRequireDefault(_NormalState);

var _Key = __webpack_require__(7);

var _Key2 = _interopRequireDefault(_Key);

var _Tile = __webpack_require__(8);

var _Tile2 = _interopRequireDefault(_Tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global HTMLCanvasElement */
var TileEditor = function () {
    function TileEditor(window, canvas) {
        var _this = this;

        _classCallCheck(this, TileEditor);

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw TypeError('TileEditor(): argument needs to be an HTMLCanvasElement');
        }

        this.window = window;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellWidth = 32;
        this.pallete = [];
        this.key = new _Key2.default();
        this.sm = new _StateMachine2.default(new _NormalState2.default());

        this.maximise();

        window.addEventListener('resize', function () {
            _this.maximise();
        });
    }

    _createClass(TileEditor, [{
        key: 'load',
        value: function load() {
            var _this2 = this;

            var levelPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            if (!levelPath) {
                throw TypeError("TileEditor.load(levelPath): 'levelPath' cannot be falsy.");
            }
            var filePath = './level/' + levelPath;

            _fs2.default.readFile(filePath, function (err, content) {
                if (err) {
                    throw err;
                }
                var level = JSON.parse(content);
                var tiles = level.pallete || [];

                _this2.pallete = Object.keys(tiles).map(function (type) {
                    var tile = tiles[type];
                    return new _Tile2.default(type, tile.positions, tile.color);
                });
            });
        }
    }, {
        key: 'save',
        value: function save() {}
    }, {
        key: 'maximise',
        value: function maximise() {
            this.canvas.width = this.window.innerWidth;
            this.canvas.height = this.window.innerHeight;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.canvas.width = this.canvas.width;
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.sm.state.draw(this);
        }
    }, {
        key: 'update',
        value: function update() {
            this.sm.change(this.sm.state.update(this));
        }
    }, {
        key: 'fillCell',
        value: function fillCell(pos, color) {
            if (!(pos || color)) {
                throw TypeError('TileEditor.fillCell(): pos and color must not be falsy');
            }

            this.ctx.fillStyle = color;
            this.ctx.fillRect(pos[0] * this.cellWidth, pos[1] * this.cellWidth, pos[0] + this.cellWidth, pos[1] + this.cellWidth);
        }
    }]);

    return TileEditor;
}();

exports.default = TileEditor;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State = __webpack_require__(0);

var _State2 = _interopRequireDefault(_State);

var _decorate = __webpack_require__(5);

var _decorate2 = _interopRequireDefault(_decorate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateMachine = function () {
    function StateMachine(original) {
        _classCallCheck(this, StateMachine);

        this.original = original;
        this.state = original;
    }

    _createClass(StateMachine, [{
        key: 'change',
        value: function change(s) {
            if (!(s instanceof _State2.default)) {
                throw TypeError('StateMachine.change(): first argument should be an instance of State.');
            }

            if (s !== this.state) {
                this.state = (0, _decorate2.default)(this.original, s);
            }

            return this.state;
        }
    }]);

    return StateMachine;
}();

exports.default = StateMachine;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (target, decoration) {
    return new Proxy(target, {
        get: function get(target, prop, receiver) {
            return prop in decoration ? decoration[prop] : target[prop];
        }
    });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = __webpack_require__(0);

var _State3 = _interopRequireDefault(_State2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NormalState = function (_State) {
    _inherits(NormalState, _State);

    function NormalState() {
        _classCallCheck(this, NormalState);

        return _possibleConstructorReturn(this, (NormalState.__proto__ || Object.getPrototypeOf(NormalState)).apply(this, arguments));
    }

    _createClass(NormalState, [{
        key: 'draw',
        value: function draw(editor) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = editor.pallete[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var tile = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = tile.positions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var pos = _step2.value;

                            editor.fillCell(pos, tile.color);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'update',
        value: function update(editor) {
            return this;
        }
    }]);

    return NormalState;
}(_State3.default);

exports.default = NormalState;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
    function Key() {
        var _this = this;

        _classCallCheck(this, Key);

        this.pressed = new Set();

        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.pressed.add(e.key);
        });

        window.addEventListener('keyup', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.pressed.delete(e.key);
        });
    }

    _createClass(Key, [{
        key: 'isDown',
        value: function isDown(keyName) {
            return this.pressed.has(keyName);
        }
    }]);

    return Key;
}();

exports.default = Key;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    _classCallCheck(this, Tile);

    if (!type || !color) {
        throw TypeError("new Tile(type, pos, color): 'type' and 'color' cannot be falsy");
    }
    this.type = type;
    this.positions = pos;
    this.color = color;
};

exports.default = Tile;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map