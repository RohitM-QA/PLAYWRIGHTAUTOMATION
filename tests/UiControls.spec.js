const {test, expect} = require('@playwright/test');

test('UI Controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');  //Define Locators
    const signIn = page.locator("#signInBtn");   //Define Locators
    const dropdown = page.locator("select.form-control");   //Define Locators
    const documentLink = page.locator("a[href*='documents']");   //Define Locators

    await dropdown.selectOption("consult");   //Select Dropdown Option
    await page.locator(".radiotextsty").last().click();   //Click Radio Button
    await page.locator("#okayBtn").click();   //Handle Popup
    console.log(await page.locator(".radiotextsty").last().isChecked());   //Verify Radio Button Checked
    await expect(page.locator(".radiotextsty").last()).toBeChecked();   //Verify Radio Button Checked using Expect Assertion
    await page.locator("#terms").click();   //Handle Checkbox (Terms)
    await expect(page.locator("#terms")).toBeChecked();  //Verify Checkbox Checked using Expect Assertion
    await page.locator("#terms").uncheck();   //Uncheck Checkbox (Terms)
    expect(await page.locator("#terms").isChecked()).toBeFalsy();   //Uncheck Checkbox

    await expect(documentLink).toHaveAttribute("class", "blinkingText");   //Verify Attribute of Link

    
    
    
    
    //await page.pause();  //Debug (Optional)
    
 

    

});