const { test, expect } = require('@playwright/test');

test('Client App Login', async ({ page }) => {
    const email = 'rohit.mandal2020@gmail.com';
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
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) //checking for the product name

        {
            await products.nth(i).locator('button:has-text(" Add To Cart")').click(); //clicking on add to cart button
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click(); //clicking on cart
    await page.locator("div li").first().waitFor(); //waiting for the product to be visible in the cart

    const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //waiting for the product to be visible in the cart, and this not a css
    expect(isProductVisible).toBeTruthy(); //asserting that the product is visible in the cart

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });  //entering the country name in the dropdown
    const dropdown = page.locator(".ta-results");   //locating the dropdown

    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();   //counting the number of options in the dropdown
    for (let i = 0; i < optionsCount; ++i) {        //iterating through the options in the dropdown
        const text = await dropdown.locator("button").nth(i).textContent();   //getting the text of the option
        if (text === " India") {    //checking for the option "India" in the dropdown
            await dropdown.locator("button").nth(i).click();   //clicking on the option "India" in the dropdown
            break;
        }
    }
    await expect(page.locator(".user__name input[type='text']")).toHaveValue(email);  //asserting that the email is pre-filled in the checkout page
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");  //asserting that the order is placed successfully
    const orderID = await page.locator("label[class='ng-star-inserted']").textContent();   //getting the order ID from the confirmation page
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();  //clicking on my orders to verify that the order is present in the orders page
    await page.locator("tbody").waitFor();   //waiting for the orders table to be visible
    const rows = await page.locator("tbody tr"); //locating the rows in the orders table

    for (let i = 0; i < await rows.count(); ++i)    //iterating through the rows in the orders table to find the order ID
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent();   //getting the order ID from the row
        if (orderID.includes(rowOrderID))   //checking if the order ID from the confirmation page is present in the orders table
        {
            await rows.nth(i).locator("button").first().click();  //clicking on the view button to view the order details
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();  //waiting for the order details to be visible
    expect(orderIdDetails).toBeTruthy();  //asserting that the order details are visible

});


