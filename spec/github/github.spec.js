import { JSDOM } from "jsdom";

import GitHubDocument from "../../lib/pages/github-document";
import GitHubCrawler from "../../lib/github-crawler";

describe("test", function () {
    // HACK to use jsdom node module instead of DOMParser for testing
    GitHubDocument.prototype._textToHtml = function (text) {
        return new JSDOM(text).window.document;
    };

    const githubCrawler = new GitHubCrawler();

    let originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("should work", async function () {
        const data = await githubCrawler.getDataByTopic("pathofexile");

        expect(data).toBeUndefined();
    });
});