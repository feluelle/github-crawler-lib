"use strict";

var _jsdom = require("jsdom");

var _githubDocument = require("../../lib/pages/github-document");

var _githubDocument2 = _interopRequireDefault(_githubDocument);

var _githubCrawler = require("../../lib/github-crawler");

var _githubCrawler2 = _interopRequireDefault(_githubCrawler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe("test", function () {
    // HACK to use jsdom node module instead of DOMParser for testing
    _githubDocument2.default.prototype._textToHtml = function (text) {
        return new _jsdom.JSDOM(text).window.document;
    };

    var githubCrawler = new _githubCrawler2.default();

    var originalTimeout = void 0;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("should work", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return githubCrawler.getDataByTopic("pathofexile");

                    case 2:
                        data = _context.sent;


                        expect(data).toBeUndefined();

                    case 4:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    })));
});