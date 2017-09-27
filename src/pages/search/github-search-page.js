import axios from 'axios';

import GitHubDocument from '../../pages/github-document';
import GitHubRepository from '../../pages/repository/github-repository';

export default class GitHubSearchPage extends GitHubDocument {
    /**
     * Creates a document out of the passed html string by calling the GitHubDocument's constructor
     */
    constructor(htmlString) {
        super(htmlString);
    }

    /**
     * Requests all pages of the search request
     * @param {String} searchParams
     * @return {Array<GitHubSearchPage>} gitHubSearchPages
     */
    static async requestAll(searchParams) {
        let gitHubSearchPages = [];

        const firstSearchPage = await GitHubSearchPage.request(searchParams);
        gitHubSearchPages.push(firstSearchPage);

        const totalNumberOfPages = firstSearchPage.getTotalNumberOfPages();

        for (let pageNr = 2; pageNr <= totalNumberOfPages; pageNr++) {
            const currentSearchPage = await GitHubSearchPage.request(`${searchParams}&p=${pageNr}`);
            gitHubSearchPages.push(currentSearchPage);
        }

        return gitHubSearchPages;
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

    /**
     * Gets the total number of repositories that were found for the current search
     * @return {Integer} totalNumberOfRepositories
     */
    getTotalNumberOfRepositories() {
        const totalNumberOfRepositoriesElement = this.doc.querySelector('.d-flex.flex-justify-between.border-bottom.pb-3 h3');
        const totalNumberOfRepositories = totalNumberOfRepositoriesElement.innerHTML.split(' ')[0];

        return totalNumberOfRepositories;
    }

    /**
     * Gets the number of pages that were found for the current search
     * @return {Integer} totalNumberOfPages
     */
    getTotalNumberOfPages() {
        const totalNumberOfRepositories = this.getTotalNumberOfRepositories();
        const totalNumberOfPages = totalNumberOfRepositories / 10;

        return totalNumberOfRepositories > 100 ? 100 : totalNumberOfPages;
    }
}