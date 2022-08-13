const { test, expect } = require('@playwright/test');
const {MainPage} = require('../pages/main-page');
const {RegisterPage} = require('../pages/register-page');
const {MailsacPage} = require('../pages/mailsac-page');
const {LoginPage} = require('../pages/login-page');
const {MyPage} = require('../pages/my-page-page');
const {AccountPage} = require('../pages/my-account-page');
const {DestroyPage} = require('../pages/destroy-page');
const {ActivityPage} = require('../pages/activity-page');
const {PatchPage} = require('../pages/patch-page');
const {SearchPage} = require('../pages/search-page');
const {NewsPage} = require("../pages/news-page");
const {RoadmapPage} = require("../pages/roadmap-page");
const {VersionPage} = require("../pages/version-page");
const {IssuesPage} = require("../pages/issues-page");
const {GuidePage} = require("../pages/guide-page");
const {RusGuidePage} = require("../pages/rus-guide-page");
const {GanttGuidePage} = require("../pages/gantt-guide-page");
const {MailsacAPI} = require('../utils/mailsac-api');
const fs = require("fs");
const userCredential = require('../resources/user-credentials');
const { constants } = require('buffer');

test.describe("Redmine tests", () => {
test("Register, login and account delete", async ({page,context}) => {
    
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.clickOnRegster();

    const registerPage = new RegisterPage(page);
    await registerPage.fillForm();

    const loginPage = new LoginPage(page);
    expect(await loginPage.isRegisterSuccesful()).toBe(true);

    const newPage = await context.newPage();
    const mailsacPage = new MailsacPage(newPage);
    await mailsacPage.goto();
    const link = await mailsacPage.getActivateLink();
    await newPage.goto(link);
    const newLoginPage = new LoginPage(newPage);
    expect(await newLoginPage.isConfirmedSuccesful()).toBe(true);
    await newPage.close();

    await loginPage.login();
    const myPage = new MyPage(page);
    expect(await myPage.getUsername()).toEqual(userCredential.username);
    await myPage.clickOnMyAccountLink();

    const accountPage = new AccountPage(page);
    expect(await accountPage.getFirstname()).toEqual(userCredential.firstname);
    expect(await accountPage.getLastname()).toEqual(userCredential.lastname);
    expect(await accountPage.getMail()).toEqual(userCredential.email);
    expect(await accountPage.getUsername()).toEqual(userCredential.username);
    await accountPage.clickOnDeleteButton();

    const destroyPage = new DestroyPage(page);
    await destroyPage.confirmDelete();

    expect(await mainPage.isDeletedSuccesfuly()).toBe(true);

    const api = new MailsacAPI();
    const id = await api.getMesageID();
    await api.deleteMessage(id);
});

test("Acivities, issues and download", async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.clickOnActivityTab();

    const activityPage = new ActivityPage(page);
    let date = await activityPage.getCurrentDateRange();
    let today = new Date().toISOString().slice(0, 10);
    expect(date.includes(today)).toBe(true);
    await activityPage.gotoPatch();

    const patchPage = new PatchPage(page);
    let title = await patchPage.getHeader();
    let author = await patchPage.getAdderName();
    expect(title.includes("Chart.js")).toBe(true);
    expect(author).toEqual("Alexander Meindl");

    
    const [ download ] = await Promise.all([
        page.waitForEvent('download'),
        await patchPage.clickOnDownloadLink(),
      ]);
    let path = await download.path();
    let name = download.suggestedFilename();
    expect(name).toEqual("update_chart_js_3.9.1.diff");
    await download.delete();
    expect(fs.existsSync(path)).toBe(false);
});

test("Search, searching parameters and links to other sites", async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.search('1.0.0');

    const searchPage = new SearchPage(page);
    await searchPage.checkboxCheck();
    expect (await searchPage.getCountOfResults()).toEqual(1);
    await searchPage.clickOnResultLink();

    const newsPage = new NewsPage(page);
    expect(await newsPage.getAuthor()).toEqual("Eric Davis");

    await newsPage.clickOnExternalLink();
    await expect(page).toHaveURL("https://semver.org/");
});

test("Roadmap,versions and issues", async ({page}) =>{
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.clickOnRoadmapTab();

    const roadmapPage = new RoadmapPage(page);
    expect(await roadmapPage.isCheckboxesChecked()).toBe(true);
    await roadmapPage.chooseCheckboxes();
    expect(await roadmapPage.getFirstLinkText()).toEqual("0.7");
    expect((await roadmapPage.getClosedIssues()).includes("82")).toBe(true);
    await roadmapPage.clickOn071Link();

    const versionPage = new VersionPage(page);
    expect(await versionPage.getTotalHours()).toEqual('0.12');
    await versionPage.selectStatus();
    await versionPage.clickOnIssuesLink();

    const issuesPage = new IssuesPage(page);
    expect(await issuesPage.isClosedCheckboxIsChecked()).toBe(true);
    expect(await issuesPage.getOperatorSelectedOption()).toEqual("selected");
    expect(await issuesPage.getValueSelectedOption()).toEqual("selected");
    expect(await issuesPage.isVersionCheckboxChecked()).toBe(true);
    expect(await issuesPage.getVersionStatusSelectedOption()).toEqual("selected");
    expect(await issuesPage.getVersionSelectedOption()).toEqual("selected");
});

test("Guide and localization", async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await mainPage.clickOnHelp();

    const guidePage = new GuidePage(page);
    expect((page.url()).includes("guide")).toBe(true);
    await guidePage.clickOnRusLink();

    const rusGuidePage = new RusGuidePage(page);
    expect(await rusGuidePage.getPageHeader()).toEqual("Документация по Redmine на русском языке");

    await rusGuidePage.clickOnGantt();
    const ganttGuidePage = new GanttGuidePage(page);
    expect(await ganttGuidePage.getChartHeader()).toEqual("Диаграмма ганта отображает задачи, которые имеют дату начала и дату завершения или связаны с версией с датой.")
});
});