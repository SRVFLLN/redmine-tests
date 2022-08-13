exports.GuidePage = class GuidePage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.russGuideLink = page.locator("//a[contains(@href,'Rus')]")
    }

    async clickOnRusLink() {
        await this.russGuideLink.click();
    }
}