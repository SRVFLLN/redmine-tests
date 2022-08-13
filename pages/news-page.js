exports.NewsPage = class NewsPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.author = page.locator(".author .user.active");
        this.externalLink = page.locator("//a[text()='Semantic Versioning']");
    }

    async getAuthor() {
        return await this.author.textContent();
    }

    async clickOnExternalLink()
    {
        await this.externalLink.click();
    }
}