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

exports.default = GitHubRepository;