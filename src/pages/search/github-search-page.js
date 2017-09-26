import axios from 'axios';

import { GitHubDocument } from '../../pages/github-document';
import { GitHubRepository } from '../../pages/repository/github-repository';

class GitHubSearchPage extends GitHubDocument {
    /**
     * Creates a document out of the passed html string by calling the GitHubDocument's constructor
     */
    constructor(htmlString) {
        super(htmlString);
    }

    /**
     * Requests the html site of /search and creates a GitHubSearchPage out of it
     * @param {String} searchParams
     * @return {GitHubSearchPage} gitHubSearchPage
     */
    static async request(searchParams) {
        const response = await axios.get(`https://github.com/search${searchParams}`);

        return new GitHubSearchPage(response.data);
    }

    /**
     * Gets the repositories of the GitHubSearchPage
     * @return {Array} repositories
     */
    getRepositories() {
        const repoList = this.doc.querySelector('.repo-list');
        const repoListItems = repoList.querySelectorAll('.repo-list-item');

        return Array.from(repoListItems)
            .map(repositoryElement => new GitHubRepository(repositoryElement));
    }
}

export { GitHubSearchPage };