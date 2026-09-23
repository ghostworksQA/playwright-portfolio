import { test, expect } from '../fixtures/fixtures';

test.describe('Login', () => {

  test('utilizador válido chega ao inventário', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('password errada mostra mensagem de erro', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'password_errada');

    await expect(loginPage.errorMessage)
      .toContainText('Username and password do not match any user in this service');
  });

  test('utilizador bloqueado é recusado', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage)
      .toContainText('Sorry, this user has been locked out');
  });

});
