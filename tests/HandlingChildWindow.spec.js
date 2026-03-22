const {test, expect} = require('@playwright/test');

test('Child Window Handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
    const documentLink = page.locator("a[href*='documents']");
    documentLink.click();



});