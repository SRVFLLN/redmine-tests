exports.SearchPage = class SearchPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.checkboxes = page.$$("//input[@type='checkbox']");
        this.newsCheckbox = page.locator("#news");
        this.titlesCheckbox = page.locator("#titles_only");
        this.sumbitButton = page.locator("//input[@type='submit']");
        this.searchResultsOnPage = page.locator("//dt");
        this.searchResult = page.locator("//dt//span[text()='1.0.0']");
    }

    async checkboxCheck() {
        await this.page.waitForLoadState('domcontentloaded');
        (await this.checkboxes).forEach(async(element) => {
            if(await element.isChecked()) element.click();
        });
        await this.newsCheckbox.click();
        await this.titlesCheckbox.click();
        await this.sumbitButton.click();
        await this.page.waitForLoadState();
    }

    async clickOnResultLink() {
        await this.searchResult.click();
    }

    async getCountOfResults() {
        return await this.searchResultsOnPage.count();
    }
}