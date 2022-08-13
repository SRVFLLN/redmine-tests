const email = require("../resources/user-credentials").email;

exports.MailsacPage = class MailsacPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.countOfMess = page.locator("//h3[text()='0 messages']");
        this.timeOfMess = page.locator("//small[contains(text(),'second')]");
        this.activateLink = page.locator("//a[contains(text(),'activate')]");
    }

    async goto() {
        await this.page.goto(`https://mailsac.com/inbox/${email}`);
    }

    async getActivateLink() {
        let counter = 0;
       while(1) {
            counter++;
            await this.page.waitForLoadState('networkidle');
            let condition = await this.timeOfMess.isVisible();
            if(!condition) {
                await this.page.waitForLoadState('domcontentloaded');
                await this.page.reload();
            }
            else if(counter >= 10) break;
            else break;
        }
        return await this.activateLink.textContent();
    }
}