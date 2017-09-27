'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _githubSearchPage = require('./pages/search/github-search-page');

var _githubSearchPage2 = _interopRequireDefault(_githubSearchPage);

var _githubReleasePage = require('./pages/release/github-release-page');

var _githubReleasePage2 = _interopRequireDefault(_githubReleasePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubCrawler = function () {
    function GitHubCrawler() {
        _classCallCheck(this, GitHubCrawler);
    }

    _createClass(GitHubCrawler, [{
        key: 'getDataByTopic',

        /**
         * Gets all information about GitHub repositories for a specific topic
         * @return {Object} json
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(topicName) {
                var _this = this;

                var data, gitHubSearchPages;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                data = [];
                                _context2.next = 3;
                                return _githubSearchPage2.default.requestAll('?q=topic:' + topicName);

                            case 3:
                                gitHubSearchPages = _context2.sent;

                                gitHubSearchPages.forEach(function (gitHubSearchPage) {

                                    var repositories = gitHubSearchPage.getRepositories();
                                    repositories.forEach(function () {
                                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(repository) {
                                            var title, gitHubReleasePage, gitHubReleases, releases;
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            title = repository.getTitle();
                                                            _context.next = 3;
                                                            return _githubReleasePage2.default.request(title);

                                                        case 3:
                                                            gitHubReleasePage = _context.sent;
                                                            gitHubReleases = gitHubReleasePage.getReleases();
                                                            releases = gitHubReleases.map(function (gitHubRelease) {
                                                                return {
                                                                    "archives": gitHubRelease.getArchives(),
                                                                    "tag": gitHubRelease.getTag(),
                                                                    "title": gitHubRelease.getTitle()
                                                                };
                                                            });


                                                            data.push({
                                                                "title": title,
                                                                "releases": releases
                                                            });

                                                        case 7:
                                                        case 'end':
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, _this);
                                        }));

                                        return function (_x2) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    }());
                                });

                                return _context2.abrupt('return', data);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getDataByTopic(_x) {
                return _ref.apply(this, arguments);
            }

            return getDataByTopic;
        }()
    }]);

    return GitHubCrawler;
}();

exports.default = GitHubCrawler;