import { GitHubSearchPage } from './pages/search/github-search-page';
import { GitHubReleasePage } from './pages/release/github-release-page';

class GitHubCrawler {
    /**
     * Gets all information needed to receive all PoE information about GitHub repositories
     * @return {Object} json
     */
    async getDataByTopic(topicName) {
        const result = [];

        const gitHubSearchPage = await GitHubSearchPage.request(`?q=topic:${topicName}`);
        const repositories = gitHubSearchPage.getRepositories();

        repositories.forEach(async (repository) => {
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

            result.push({
                "title": title,
                "releases": releases
            });
        });

        return result;
    }
}

export { GitHubCrawler };