'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _githubDocument = require('../../pages/github-document');

var _githubDocument2 = _interopRequireDefault(_githubDocument);

var _githubRepository = require('../../pages/repository/github-repository');

var _githubRepository2 = _interopRequireDefault(_githubRepository);

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
                return new _githubRepository2.default(repositoryElement);
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
}(_githubDocument2.default);

exports.default = GitHubSearchPage;