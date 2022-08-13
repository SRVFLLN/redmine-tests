exports.PatchPage = class PatchPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.patchHeader = page.locator(".subject h3");
        this.addedByLink = page.locator(".issue .author > .user.active");
        this.downloadLink = page.locator("//div[@class='attachments']//a[contains(text(),'3.9.1')]");
    }

    async getHeader() {
        return await this.patchHeader.textContent();
    }

    async getAdderName() {
        return await this.addedByLink.textContent();
    }

    async clickOnDownloadLink() {
        await this.downloadLink.click();
    }
}