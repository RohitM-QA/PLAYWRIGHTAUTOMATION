const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("rohit.mandal2020@gmail.com");
    await page.locator("#userPassword").fill("Nepolic@7");
    await page.locator("#login").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    // const productName = "ZARA COAT 3";
    // const productCount = await products.count();

    console.log(titles);
    

    
});
