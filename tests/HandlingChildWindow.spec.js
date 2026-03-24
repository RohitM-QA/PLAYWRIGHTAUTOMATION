const {test, expect} = require('@playwright/test');

test('Child Window Handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),    //Listen for any new Pending, Rejected, Fulfilled Page Event
    documentLink.click(),
]);

    const text = await newPage.locator(".red").textContent();  //Wait for the element to be visible in the new page
    const arrayText = text.split('@');   //Split the text to get the username
    const domain = arrayText[1].split(" ") [0]   //Trim or split the username to remove any extra spaces
    console.log(domain);

    await page.locator('#username').fill(domain);   //Type the username in the parent page
    await page.pause();  //Debug (Optional)
    console.log(await page.locator('#username').inputValue());   //Get the text content of the username field to verify

});