'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _githubDocument = require('../../pages/github-document');

var _githubDocument2 = _interopRequireDefault(_githubDocument);

var _githubRelease = require('../../pages/release/github-release');

var _githubRelease2 = _interopRequireDefault(_githubRelease);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GitHubReleasePage = function (_GitHubDocument) {
    _inherits(GitHubReleasePage, _GitHubDocument);

    /**
     * Creates a document out of the passed html string by calling the GitHubDocument's constructor
     */
    function GitHubReleasePage(htmlString) {
        _classCallCheck(this, GitHubReleasePage);

        return _possibleConstructorReturn(this, (GitHubReleasePage.__proto__ || Object.getPrototypeOf(GitHubReleasePage)).call(this, htmlString));
    }

    /**
     * Requests the html site of /releases and creates a GitHubReleasePage out of it
     * @param {String} repositoryLink
     * @return {GitHubReleasePage} gitHubReleasePage
     */


    _createClass(GitHubReleasePage, [{
        key: 'getReleases',


        /**
         * Gets the releases of the GitHubRelease Page
         * @return {Array} releases
         */
        value: function getReleases() {
            var releaseTimeLine = this.doc.querySelector('.release-timeline');

            return releaseTimeLine !== null ? Array.from(releaseTimeLine.querySelectorAll('.release')).map(function (releaseElement) {
                return new _githubRelease2.default(releaseElement);
            }) : [];
        }
    }], [{
        key: 'request',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(repositoryLink) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _axios2.default.get('https://github.com' + repositoryLink + '/releases');

                            case 2:
                                response = _context.sent;
                                return _context.abrupt('return', new GitHubReleasePage(response.data));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function request(_x) {
                return _ref.apply(this, arguments);
            }

            return request;
        }()
    }]);

    return GitHubReleasePage;
}(_githubDocument2.default);

exports.default = GitHubReleasePage;