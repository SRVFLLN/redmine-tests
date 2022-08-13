exports.AccountPage = class AccountPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.firstnameInput = page.locator("#user_firstname");
        this.lastnameInput = page.locator("#user_lastname");
        this.mailInput = page.locator("#user_mail");
        this.usernameLink = page.locator("strong > a");
        this.deleteButton = page.locator(".icon-del");
    }

    async getFirstname() {
        await this.page.waitForLoadState('domcontentloaded');
        return await this.firstnameInput.inputValue();
    }

    async getLastname() {
        return await this.lastnameInput.inputValue();
    }

    async getMail() {
        return await this.mailInput.inputValue();
    }

    async getUsername() {
        return await this.usernameLink.textContent();
    }

    async clickOnDeleteButton() {
        await this.deleteButton.click();
    }
}