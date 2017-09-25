import axios from 'axios';

import { GitHubDocument } from './pages/github-document';
import { GitHubRelease } from './pages/release/github-release';

class GitHubReleasePage extends GitHubDocument {
    /**
     * Creates a document out of the passed html string by calling the GitHubDocument's constructor
     */
    constructor(htmlString) {
        super(htmlString);
    }

    /**
     * Requests the html site of /releases and creates a GitHubReleasePage out of it
     * @param {String} repositoryLink
     * @return {GitHubReleasePage} gitHubReleasePage
     */
    static async request(repositoryLink) {
        const response = await axios.get(`https://github.com${repositoryLink}/releases`);

        return new GitHubReleasePage(response.data);
    }

    /**
     * Gets the releases of the GitHubRelease Page
     * @return {Array} releases
     */
    getReleases() {
        const releaseTimeLine = this.doc.querySelector('.release-timeline');

        return releaseTimeLine !== null ?
            Array.from(releaseTimeLine.querySelectorAll('.release'))
                .map(releaseElement => new GitHubRelease(releaseElement)) : [];
    }
}

export { GitHubReleasePage };