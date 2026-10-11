import { test, expect } from '../fixtures/fixtures';

test.describe('Login', () => {

  test('valid user reaches the inventory page', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('incorrect password displays an error message', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match any user in this service');
  });

  test('locked-out user is rejected', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage)
      .toContainText('Sorry, this user has been locked out');
  });

});
