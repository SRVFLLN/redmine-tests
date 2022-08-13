const userCredential = require('../resources/user-credentials');

exports.RegisterPage = class RegisterPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator("#user_login");
        this.passworddInput = page.locator("#user_password");
        this.confirmationInput = page.locator("#user_password_confirmation");
        this.firstnameInput = page.locator("#user_firstname");
        this.lastnameInput = page.locator("#user_lastname");
        this.mailInput = page.locator("#user_mail");
        this.languageSelect = page.locator("#user_language");
        this.submitButton = page.locator("//input[@name='commit']");
        }

    async fillForm() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.usernameInput.fill(userCredential.username);
        await this.passworddInput.fill(userCredential.password);
        await this.confirmationInput.fill(userCredential.password);
        await this.firstnameInput.fill(userCredential.firstname);
        await this.lastnameInput.fill(userCredential.lastname);
        await this.mailInput.fill(userCredential.email);
        await this.languageSelect.selectOption("ru");
        await this.submitButton.click();
    }
}