import "babel-polyfill";

import GitHubSearchPage from './pages/search/github-search-page';
import GitHubReleasePage from './pages/release/github-release-page';

export default class GitHubCrawler {
    /**
     * Gets all information about GitHub repositories for a specific topic
     * @return {Object} json
     */
    async getDataByTopic(topicName) {
        const data = [];

        const gitHubSearchPages = await GitHubSearchPage.requestAll(`?q=topic:${topicName}`);
        gitHubSearchPages.forEach(gitHubSearchPage => {

            const repositories = gitHubSearchPage.getRepositories();
            repositories.forEach(async repository => {
                const title = repository.getTitle();
                const gitHubReleasePage = await GitHubReleasePage.request(title);
                const gitHubReleases = gitHubReleasePage.getReleases();
                const releases = gitHubReleases.map(gitHubRelease => {
                    return {
                        "archives": gitHubRelease.getArchives(),
                        "tag": gitHubRelease.getTag(),
                        "title": gitHubRelease.getTitle()
                    };
                });

                data.push({
                    "title": title,
                    "releases": releases
                });
            });
        })

        return data;
    }
}