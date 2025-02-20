import { test, expect } from "@playwright/test";
import { RegistrationFormPage } from "../../pages/RegistrationFormPage";

test.describe("Registration Form validation Tests", () => {
  let registrationForm: RegistrationFormPage;

  test.beforeEach(async ({ page }) => {
    registrationForm = new RegistrationFormPage(page);
    await registrationForm.navigateToForm();
  });

  test.describe("First Name Field Tests", () => {
    test("Validate first name is not required", async () => {
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );

      const displayedData = await registrationForm.getDisplayedFormData();
      expect(displayedData.firstName).toBe("First Name: ");
    });

    test("Validate entered first name is submitted correctly", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );

      const displayedData = await registrationForm.getDisplayedFormData();
      expect(displayedData.firstName).toBe("First Name: Virat");
    });
  });

  test.describe("Last Name Field Tests", () => {
    //   Bug #1 - Last name is not made required
    test("Validate last name is required", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).not.toBe(
        "Successfully registered the following information",
      );
    });

    //   Bug #2 - last character of last name is omitted after submission
    test("Validate entered last name is submitted correctly", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );

      const displayedData = await registrationForm.getDisplayedFormData();
      expect(displayedData.lastName).toBe("Last Name: Kohli"); // output is Kohl
    });
  });

  test.describe("Phone Number Field Tests", () => {
    test("Validate Phone Number is required", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "The phone number should contain at least 10 characters!",
      );
    });

    //Bug #3 - last number of Phone Number becomes {number}+1 after submission
    test("Validate entered Phone Number is submitted correctly", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622"); //10 numbers
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );

      const displayedData = await registrationForm.getDisplayedFormData();
      expect(displayedData.phoneNumber).toBe("Phone Number: 0275645622"); //output is 0275645623
    });

    //Bug #4 - Only numbers should be allowed, letters and special chars are allowed
    test("Validate only numbers are allowed as Phone Number", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645dsf622@");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).not.toBe(
        "Successfully registered the following information",
      );
    });

    test("Validate phone number should contain at least 10 characters!", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("02756456"); //8 numbers
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "The phone number should contain at least 10 characters!",
      );
    });

    //   Bug #5 - Phone nunber* misspelled label
  });

  test.describe("Country Field Tests", () => {
    test("Validate Country is not required", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );
    });

    test("Validate entered Country value is submitted correctly", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );

      const displayedData = await registrationForm.getDisplayedFormData();
      expect(displayedData.country).toBe("Country: New Zealand");
    });

    // Bug #6 -  When a country value is not selected, the value submitted should be null but it is "Select a country..."
  });

  test.describe("Email Field Tests", () => {
    // Bug #7 -  Email is not made required
    test("Validate email is required", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).not.toBe(
        "Successfully registered the following information",
      );
    });

    test("Validate entered email value is submitted correctly", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      await expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );

      const displayedData = await registrationForm.getDisplayedFormData();
      expect(displayedData.email).toBe("Email: virat@bcci.com");
    });

    // Bug #8 -  Email address format is not checked
    test("Validate invalid email format is rejected", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("invalid$email");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).not.toBe(
        "Successfully registered the following information",
      );
    });
  });

  test.describe("Password Field Tests", () => {
    // Bug #9 -  type of password is set to text instead of password, so password is visible on the UI

    test("Validate password is required", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).toBe(
        "The password should contain between [6,20] characters!",
      );
    });

    test("Validate password less than 6 characters is rejected", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("12345"); // 5 chars
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).toBe(
        "The password should contain between [6,20] characters!",
      );
    });

    test("Validate password more than 20 characters is rejected", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("123456789012345678901"); // 21 chars
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).toBe(
        "The password should contain between [6,20] characters!",
      );
    });

    test("Validate password exactly 6 characters is accepted", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("123456"); // 6 chars
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );
    });

    // Bug #10 - 20 chars are not accepted for password value
    test("Validate password exactly 20 characters is accepted", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillEmail("virat@bcci.com");
      await registrationForm.fillPassword("12345678901234567890"); // 20 chars
      await registrationForm.selectCountry("New Zealand");

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).toBe(
        "Successfully registered the following information",
      );
    });
  });

  test.describe("Terms and Conditions Tests", () => {
    // Bug #11 - terms and conditions check box is disabled
    test("Validate if terms and conditions checkbox is clickable", async () => {
      await registrationForm.fillFirstName("Virat");
      await registrationForm.fillLastName("Kohli");
      await registrationForm.fillPhoneNumber("0275645622");
      await registrationForm.fillPassword("%3.e&N)Bs69");
      await registrationForm.selectCountry("Niger");
      await registrationForm.checkTerms();

      await registrationForm.clickRegister();

      expect(await registrationForm.getSuccessMessageText()).not.toBe(
        "Successfully registered the following information",
      );
    });

    // Bug #12 - No clickable link to view terms and conditions
  });

  // Bug #13 - This message should be at the bottom of the form "Note: All the fields marked with * are mandatory"

  // Bug #14 - Form can be submitted without checking terms and conditions checkbox

  // Bug #15 - Form is not cleard after successful submission

  // Bug #16 Password is not validated for complexity, eg. Should have special chars
});
