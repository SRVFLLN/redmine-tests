exports.VersionPage = class VersionPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.totalHours = page.locator(".total-hours .hours-int");
        this.totalMinutes = page.locator(".total-hours .hours-dec");
        this.statusSelect = page.locator("#status_by_select");
        this.closedIssuesLink = page.locator("#status_by a");
    }

    async getTotalHours() {
        return (await this.totalHours.textContent() + await this.totalMinutes.textContent());
    }

    async selectStatus() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.statusSelect.selectOption('status');
    }

    async clickOnIssuesLink() {
        await this.page.waitForLoadState();
        await this.closedIssuesLink.click();
    }
}