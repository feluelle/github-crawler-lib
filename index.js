'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GitHubCrawler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _githubSearchPage = require('./pages/search/github-search-page');

var _githubReleasePage = require('./pages/release/github-release-page');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubCrawler = function () {
    function GitHubCrawler() {
        _classCallCheck(this, GitHubCrawler);
    }

    _createClass(GitHubCrawler, [{
        key: 'getDataByTopic',

        /**
         * Gets all information needed to receive all PoE information about GitHub repositories
         * @return {Object} json
         */
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(topicName) {
                var _this = this;

                var result, gitHubSearchPage, repositories;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                result = [];
                                _context2.next = 3;
                                return _githubSearchPage.GitHubSearchPage.request('?q=topic:' + topicName);

                            case 3:
                                gitHubSearchPage = _context2.sent;
                                repositories = gitHubSearchPage.getRepositories();


                                repositories.forEach(function () {
                                    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(repository) {
                                        var title, gitHubReleasePage, gitHubReleases, releases;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        title = repository.getTitle();
                                                        _context.next = 3;
                                                        return _githubReleasePage.GitHubReleasePage.request(title);

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


                                                        result.push({
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

                                return _context2.abrupt('return', result);

                            case 7:
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

exports.GitHubCrawler = GitHubCrawler;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubDocument = function () {
    /**
     * Defines a general GitHub document by passing the html string of the site
     * @param {String} htmlString
     */
    function GitHubDocument(htmlString) {
        _classCallCheck(this, GitHubDocument);

        this.doc = this._textToHtml(htmlString);
    }

    _createClass(GitHubDocument, [{
        key: '_textToHtml',
        value: function _textToHtml(text) {
            var doc = new DOMParser().parseFromString(text, 'text/html');

            return doc;
        }
    }]);

    return GitHubDocument;
}();

exports.GitHubDocument = GitHubDocument;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GitHubReleasePage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _githubDocument = require('./pages/github-document');

var _githubRelease = require('./pages/release/github-release');

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
                return new _githubRelease.GitHubRelease(releaseElement);
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
}(_githubDocument.GitHubDocument);

exports.GitHubReleasePage = GitHubReleasePage;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubRelease = function () {
    /**
     * Defines some important html elements to access its information
     * @param {HTMLElement} releaseElement
     */
    function GitHubRelease(releaseElement) {
        _classCallCheck(this, GitHubRelease);

        this.metaElement = releaseElement.querySelector('.release-meta');
        this.bodyElement = releaseElement.querySelector('.release-body');
    }

    /**
     * Gets the release title of the GitHub release
     * @return {String} title
     */


    _createClass(GitHubRelease, [{
        key: 'getTitle',
        value: function getTitle() {
            return this.bodyElement.querySelector('.release-header').querySelector('.release-title').querySelector('a').innerText;
        }

        /**
         * Gets the release archives of the GitHub release
         * @return {Array} archives
         */

    }, {
        key: 'getArchives',
        value: function getArchives() {
            return Array.from(this.bodyElement.querySelector('.release-downloads').querySelectorAll('a')).map(function (link) {
                return link.getAttribute('href');
            });
        }

        /**
         * Gets the release tag of the GitHub release
         * @return {String} tag
         */

    }, {
        key: 'getTag',
        value: function getTag() {
            return this.metaElement.querySelector('.tag-references').querySelector('.css-truncate-target').innerText;
        }
    }]);

    return GitHubRelease;
}();

exports.GitHubRelease = GitHubRelease;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubRepository = function () {
    /**
     * Defines some important html elements to access its information
     * @param {HTMLElement} repositoryElement
     */
    function GitHubRepository(repositoryElement) {
        _classCallCheck(this, GitHubRepository);

        this.repositoryElement = repositoryElement;
    }

    /**
     * Gets the repository title of the GitHub repository
     * @return {String} tag
     */


    _createClass(GitHubRepository, [{
        key: 'getTitle',
        value: function getTitle() {
            return this.repositoryElement.querySelector('a').getAttribute('href');
        }
    }]);

    return GitHubRepository;
}();

exports.GitHubRepository = GitHubRepository;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GitHubSearchPage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _githubDocument = require('./pages/github-document');

var _githubRepository = require('./pages/repository/github-repository');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GitHubSearchPage = function (_GitHubDocument) {
    _inherits(GitHubSearchPage, _GitHubDocument);

    /**
     * Creates a document out of the passed html string by calling the GitHubDocument's constructor
     */
    function GitHubSearchPage(htmlString) {
        _classCallCheck(this, GitHubSearchPage);

        return _possibleConstructorReturn(this, (GitHubSearchPage.__proto__ || Object.getPrototypeOf(GitHubSearchPage)).call(this, htmlString));
    }

    /**
     * Requests the html site of /search and creates a GitHubSearchPage out of it
     * @param {String} searchParams
     * @return {GitHubSearchPage} gitHubSearchPage
     */


    _createClass(GitHubSearchPage, [{
        key: 'getRepositories',


        /**
         * Gets the repositories of the GitHubSearchPage
         * @return {Array} repositories
         */
        value: function getRepositories() {
            var repoList = this.doc.querySelector('.repo-list');
            var repoListItems = repoList.querySelectorAll('.repo-list-item');

            return Array.from(repoListItems).map(function (repositoryElement) {
                return new _githubRepository.GitHubRepository(repositoryElement);
            });
        }
    }], [{
        key: 'request',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(searchParams) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _axios2.default.get('https://github.com/search' + searchParams);

                            case 2:
                                response = _context.sent;
                                return _context.abrupt('return', new GitHubSearchPage(response.data));

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

    return GitHubSearchPage;
}(_githubDocument.GitHubDocument);

exports.GitHubSearchPage = GitHubSearchPage;
