class GitHubDocument {
    /**
     * Defines a general GitHub document by passing the html string of the site
     * @param {String} htmlString
     */
    constructor(htmlString) {
        this.doc = this._textToHtml(htmlString);
    }

    _textToHtml(text) {
        const doc = new DOMParser().parseFromString(text, 'text/html');

        return doc;
    }
}

export { GitHubDocument };