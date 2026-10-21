import { test, expect } from "@playwright/test";

test("expect error", async ({ page }) => {
    function fail(){
        throw new Error('Ah,Oh Noo')
    }

    expect(()=> fail()).toThrow('Ah,Oh Noo');
});

test("locator function", async ({ page }) => {
    function getCupLocator(coffeeName: string) {
    return page.locator(`aria-label=${coffeeName}`)
    }

    const getCupLocator2 = (coffeeName: string) =>
        page.locator(`aria-label=${coffeeName}`)

});
