exports.RusGuidePage = class RusGuidePage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.pageHeader = page.locator(".wiki h1");
        this.linkToGantt = page.locator("//a[contains(@href,'Gantt')]");
    }

    async getPageHeader() {
        return await this.pageHeader.innerText();
    }

    async clickOnGantt() {
        await this.linkToGantt.click();
    }
}