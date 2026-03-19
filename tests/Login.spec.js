const {test, expect} = require('@playwright/test');

test.only('Browser Context Playwright Test', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    
});
