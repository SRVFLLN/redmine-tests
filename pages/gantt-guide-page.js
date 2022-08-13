exports.GanttGuidePage = class GanttGuidePage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.chartHeader = page.locator("//img/parent::p/preceding-sibling::p[not(a)]");
    }

    async getChartHeader() {
        return this.chartHeader.textContent();
    }
}