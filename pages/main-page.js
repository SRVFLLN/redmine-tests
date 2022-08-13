exports.MainPage = class MainPage {

   /**
   * @param {import('@playwright/test').Page} page
   */
   constructor(page) {
      this.page = page;
      this.registerButton = page.locator(".register");
      this.searchInput = page.locator("#q");
      this.helpButton = page.locator(".help");
      this.activityTab = page.locator(".activity");
      this.roadmapTab = page.locator(".roadmap");
      this.succesfulDeletedMessage = page.locator(".flash.notice");
   }

   async goto() {
      await this.page.goto("https://www.redmine.org");
   }

   async clickOnRegster() {
      await this.registerButton.click();
   }

   async clickOnHelp() {
      await this.helpButton.click();
   }

   async clickOnActivityTab() {
      await this.activityTab.click();
   }

   async clickOnRoadmapTab() {
      await this.roadmapTab.click();
   }

   async search(query) {
      await this.searchInput.fill(query);
      await this.searchInput.press('Enter');
   }

   async isDeletedSuccesfuly() {
      await this.page.waitForLoadState('domcontentloaded');
      return await this.succesfulDeletedMessage.isVisible();
   }
}