class GitHubRelease {
    /**
     * Defines some important html elements to access its information
     * @param {HTMLElement} releaseElement
     */
    constructor(releaseElement) {
        this.metaElement = releaseElement.querySelector('.release-meta');
        this.bodyElement = releaseElement.querySelector('.release-body');
    }

    /**
     * Gets the release title of the GitHub release
     * @return {String} title
     */
    getTitle() {
        return this.bodyElement
            .querySelector('.release-header')
            .querySelector('.release-title')
            .querySelector('a')
            .innerText;
    }

    /**
     * Gets the release archives of the GitHub release
     * @return {Array} archives
     */
    getArchives() {
        return Array.from(this.bodyElement
            .querySelector('.release-downloads')
            .querySelectorAll('a'))
            .map(link => link.getAttribute('href'));
    }

    /**
     * Gets the release tag of the GitHub release
     * @return {String} tag
     */
    getTag() {
        return this.metaElement
            .querySelector('.tag-references')
            .querySelector('.css-truncate-target')
            .innerText;
    }

}

export { GitHubRelease };