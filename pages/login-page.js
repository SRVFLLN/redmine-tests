const user = require('../resources/user-credentials').username;
const password = require('../resources/user-credentials').password;
const mail = require('../resources/user-credentials').email;

exports.LoginPage = class LoginPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.registerSuccesfulMes = page.locator(`//div[contains(text(),'${mail}') or contains(text(),'успешно')]`);
        this.confirmedSuccesfulMes = page.locator(".flash.notice");
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.submitButton = page.locator("//input[@type='submit']");
    }

    async login() {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async isRegisterSuccesful() {
        await this.page.waitForLoadState('domcontentloaded');
        return await this.registerSuccesfulMes.isVisible();
    }

    async isConfirmedSuccesful() {
        await this.page.waitForLoadState('domcontentloaded');
        return await this.confirmedSuccesfulMes.isVisible();
    }
}