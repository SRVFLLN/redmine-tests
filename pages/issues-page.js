exports.IssuesPage = class IssuesPage {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.statusCheckbox = page.locator("#cb_status_id");
        this.operatorSelectedOption = page.locator("#operators_status_id > option[value='=']");
        this.valueSelectedOption = page.locator("#values_status_id_1 > option[value='5']");
        this.versionCheckbox = page.locator("#cb_fixed_version_id");
        this.verStatusSelected = page.locator("#operators_fixed_version_id > option[value='=']");
        this.versionSelected = page.locator("#values_fixed_version_id_1 > option[value='3']");
    }

    async isClosedCheckboxIsChecked() {
        return await this.statusCheckbox.isChecked();
    }

    async getOperatorSelectedOption() {
        return await this.operatorSelectedOption.getAttribute("selected");
    }

    async getValueSelectedOption() {
        return await this.valueSelectedOption.getAttribute("selected");
    }

    async isVersionCheckboxChecked() {
        return await this.versionCheckbox.isChecked();
    }

    async getVersionStatusSelectedOption() {
        return await this.verStatusSelected.getAttribute("selected");
    }

    async getVersionSelectedOption() {
        return await this.versionSelected.getAttribute("selected");
    }
}