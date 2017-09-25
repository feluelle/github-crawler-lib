class GitHubRepository {
    /**
     * Defines some important html elements to access its information
     * @param {HTMLElement} repositoryElement
     */
    constructor(repositoryElement) {
        this.repositoryElement = repositoryElement;
    }

    /**
     * Gets the repository title of the GitHub repository
     * @return {String} tag
     */
    getTitle() {
        return this.repositoryElement
            .querySelector('a')
            .getAttribute('href');
    }
}

export { GitHubRepository };