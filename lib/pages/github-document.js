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

exports.default = GitHubDocument;