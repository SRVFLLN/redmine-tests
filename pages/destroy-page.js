exports.DestroyPage = class DestroyPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.confirmCheckbox = page.locator("#confirm");
        this.commitButton = page.locator("//input[@name='commit']");
    }

    async confirmDelete() {
        await this.confirmCheckbox.click();
        await this.commitButton.click();
    }
}