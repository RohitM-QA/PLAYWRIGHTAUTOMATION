const {test, expect} = require('@playwright/test');

test('Client App Login', async({page})=>
{
    const productName = "ZARA COAT 3";   //product name to be added in the cart
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("rohit.mandal2020@gmail.com");
    await page.locator("#userPassword").fill("Nepolic@7");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    
    console.log(titles);

    const count = await products.count();   //counting the number of products in the page
    for(let i=0; i<count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName) //checking for the product name
    
    {
        await products.nth(i).locator('button:has-text(" Add To Cart")').click(); //clicking on add to cart button
        break;
    }  
}    
    await page.locator("[routerlink*='cart']").click(); //clicking on cart
    await page.locator("div li").first().waitFor(); //waiting for the product to be visible in the cart

    const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //waiting for the product to be visible in the cart, and this not a css
    expect(isProductVisible).toBeTruthy(); //asserting that the product is visible in the cart




});

 
