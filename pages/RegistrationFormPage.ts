import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegistrationFormPage extends BasePage {
  // Selectors
  private readonly firstNameInput = 'input[id="firstName"]';
  private readonly lastNameInput = 'input[id="lastName"]';
  private readonly phoneInput = 'input[id="phone"]';
  private readonly countryDropdown = "select#countries_dropdown_menu";
  private readonly emailInput = 'input[id="emailAddress"]';
  private readonly passwordInput = 'input[id="password"]';
  private readonly termsCheckbox = 'input[id="exampleCheck1"]';
  private readonly registerButton = 'button[id="registerBtn"]';

  private readonly successMessage = "div.alert-danger#message";
  private readonly resultFirstName = "#resultFn";
  private readonly resultLastName = "#resultLn";
  private readonly resultPhone = "#resultPhone";
  private readonly resultCountry = "#country";
  private readonly resultEmail = "#resultEmail";

  async getSuccessMessageText(): Promise<string | null> {
    return this.page.locator(this.successMessage).textContent();
  }

  async getDisplayedFormData() {
    return {
      firstName: await this.page.locator(this.resultFirstName).textContent(),
      lastName: await this.page.locator(this.resultLastName).textContent(),
      phoneNumber: await this.page.locator(this.resultPhone).textContent(),
      country: await this.page.locator(this.resultCountry).textContent(),
      email: await this.page.locator(this.resultEmail).textContent(),
    };
  }

  constructor(page: Page) {
    super(page);
  }

  private readonly pageUrl = "https://qa-practice.netlify.app/bugs-form";

  async navigateToForm() {
    await this.navigate(this.pageUrl);
  }

  async fillFirstName(value: string) {
    await this.page.fill(this.firstNameInput, value);
  }

  async fillLastName(value: string) {
    await this.page.fill(this.lastNameInput, value);
  }

  async fillPhoneNumber(value: string) {
    await this.page.fill(this.phoneInput, value);
  }

  async fillEmail(value: string) {
    await this.page.fill(this.emailInput, value);
  }

  async fillPassword(value: string) {
    await this.page.fill(this.passwordInput, value);
  }

  async selectCountry(country: string) {
    await this.page.selectOption(this.countryDropdown, country);
  }

  async checkTerms() {
    await this.page.check(this.termsCheckbox);
  }

  async clickRegister() {
    await this.page.click(this.registerButton);
  }
}
