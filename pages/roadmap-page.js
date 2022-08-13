exports.RoadmapPage = class RoadmapPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.sideCheckboxes = page.$$("//div[@id='sidebar']//input[@type='checkbox']");
        this.defectCheckbox = page.locator("//input[@value=1 and contains(@name,'tracker')]");
        this.featureCheckbox = page.locator("//input[@value=2 and contains(@name,'tracker')]");
        this.patchCheckbox = page.locator("//input[@value=3 and contains(@name,'tracker')]");
        this.completedCheckbox = page.locator("#completed");
        this.subprojectsCheckbox = page.locator("#with_subprojects");
        this.submitButton = page.locator("//input[@type='submit']");
        this.firstVersion = page.locator("//a[contains(@href,'versions')]").first();
        this.closedIssues = page.locator("//a[contains(@href,'status_id=c')]").first();
        this.zeroSevenOneLink = page.locator("//a[@name='0.7.1']");
    }

    async isCheckboxesChecked() {
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.defectCheckbox.isChecked() && await this.featureCheckbox.isChecked() && await this.patchCheckbox.isChecked());
    }

    async chooseCheckboxes() {
        await this.page.waitForLoadState('domcontentloaded');
        (await this.sideCheckboxes).forEach(async(element) =>{
            if(await element.isChecked()) await element.click();
        });
        await this.completedCheckbox.click();
        await this.defectCheckbox.click();
        await this.submitButton.click();
        await this.page.waitForLoadState();
    }

    async getFirstLinkText() {
        return await this.firstVersion.getAttribute('name');
    }

    async getClosedIssues() {
        return await this.closedIssues.textContent();
    }

    async clickOn071Link() {
        return await this.zeroSevenOneLink.click();
    }
}