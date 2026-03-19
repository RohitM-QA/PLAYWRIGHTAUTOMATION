const {test} = require('@playwright/test');

test('Browser Context Playwright Test', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

test.only('Page Playwright Test', async({page})=>
{
    //const context = await browser.newContext();  --not required
    //const page = await context.newPage();  --not required
    await page.goto("https://google.com/");


    

});
