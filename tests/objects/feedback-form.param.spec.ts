import { test, expect, Page} from "@playwright/test";
import { checkErrorMessagesForFeedbackForm, checkSuccessMessageForFeedbackForm, fillFeedbackForm } from "./feedback-form.helper";
import { allFieldsData, requiredFieldsData, notRequiredFieldsData } from "./feedback-form.data";

test.describe("Feedback form validation", { tag: "@auth" }, () => {
  
  test.beforeEach(async ({ page }) => {
    page.goto("http://104.168.59.50/articles/contact");
  });

  const scenarios = [
    {
      name: "All fields are filled",
      data: allFieldsData,
      expect: () => async (page: Page) => await checkSuccessMessageForFeedbackForm(page),
    },
     {
      name: "Only required fields are filled",
      data: requiredFieldsData,
      expect: () => async (page: Page) => await checkSuccessMessageForFeedbackForm(page),
    },
    {
      name: "Only not required fields are filled",
      data: notRequiredFieldsData,
      expect: async (page: Page) => await checkErrorMessagesForFeedbackForm(page),
    }
  ];

for (let scenario of scenarios) {
  test(`FEED-${scenario.name}`, async ({ page }) => {
    await fillFeedbackForm(page, scenario.data);
    await scenario.expect(page);
  })
}

});
