exports.MyPage = class MyPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.activeUser = page.locator(".user.active");
        this.myAccountLink = page.locator(".my-account");
    }

    async getUsername() {
        return await this.activeUser.textContent();
    }

    async clickOnMyAccountLink() {
        await this.myAccountLink.click();
    }
}