exports.ActivityPage = class ActivityPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.dateRange = page.locator("#content > .subtitle");
        this.previousLink = page.locator("//div[@id='content']/div[@style='float:left;']/a");
        this.patchLink = page.locator("//h3[text()='2022-08-02']/parent::div//a[contains(@href,'107521')]");
    }

    async getCurrentDateRange() {
        return await this.dateRange.textContent();
    }

    async gotoPatch()
    {
        let counter = 0;
        while(1)
        {
            counter++;
            await this.page.waitForLoadState('domcontentloaded');
            await this.previousLink.click();
            if(await this.patchLink.isVisible()) break;
            else if(counter >= 30) break;
        }
        await this.patchLink.click();
    }
}