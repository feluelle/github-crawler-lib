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

exports.default = GitHubRelease;