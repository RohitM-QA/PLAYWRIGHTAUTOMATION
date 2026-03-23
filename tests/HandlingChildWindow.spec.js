const {test, expect} = require('@playwright/test');

test('Child Window Handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
    const documentLink = page.locator("a[href*='documents-request']");

    Promise.all(
    [context.waitForEvent('page'),    //Listen for any new Pending, Rejected, Fullfilled
    documentLink.click(),
])



});