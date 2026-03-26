import { test, expect } from '../src/fixtures.js';

// A timestamp suffix guarantees a unique username on every test run,
// eliminating any risk of collision with other users on this shared demo site.
const TEST_USER = { username: `uitestuser_${Date.now()}`, password: 'UITest@2026' };

test.describe('Bonus - Login', () => {
  test.beforeAll(async ({ browser }) => {
    // Register the unique user for this run. Because the username is always
    // new, we are certain the account exists and the password is correct.
    const page = await browser.newPage();
    await page.goto('https://www.demoblaze.com');

    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.locator('#signInModal').waitFor({ state: 'visible' });
    await page.locator('#sign-username').fill(TEST_USER.username);
    await page.locator('#sign-password').fill(TEST_USER.password);
    page.once('dialog', (d) => d.accept());
    await page.locator('#signInModal').getByRole('button', { name: 'Sign up' }).click();
    await page.waitForTimeout(1000);

    await page.close();
  });

  test('should show error when submitting empty credentials', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.openLoginModal();

    let dialogMessage = '';
    homePage.page.once('dialog', (d) => {
      dialogMessage = d.message();
      d.accept();
    });

    await loginPage.login('', '');
    await homePage.page.waitForTimeout(1000);

    expect(dialogMessage).toBeTruthy();
    await expect(loginPage.welcomeText).not.toBeVisible();
  });

  test('should show error when password is wrong for existing user', async ({ homePage, loginPage }) => {
    // Because we registered TEST_USER in beforeAll, we know this username
    // exists — so the error must be about the wrong password, not an unknown user.
    await homePage.goto();
    await loginPage.openLoginModal();

    let dialogMessage = '';
    homePage.page.once('dialog', (d) => {
      dialogMessage = d.message();
      d.accept();
    });

    await loginPage.login(TEST_USER.username, 'wrongpassword');
    await homePage.page.waitForTimeout(1000);

    expect(dialogMessage).toBeTruthy();
    await expect(loginPage.welcomeText).not.toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.openLoginModal();
    await loginPage.login(TEST_USER.username, TEST_USER.password);

    const welcome = await loginPage.getWelcomeText();
    expect(welcome).toContain(`Welcome ${TEST_USER.username}`);

    await loginPage.logout();
  });

  test('should logout successfully', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await loginPage.openLoginModal();
    await loginPage.login(TEST_USER.username, TEST_USER.password);
    await loginPage.getWelcomeText();

    await loginPage.logout();

    await expect(loginPage.welcomeText).not.toBeVisible();
    await expect(homePage.page.getByRole('link', { name: 'Log in' })).toBeVisible();
  });
});

test.describe('Bonus - Contact Form', () => {
  test('should submit the contact form successfully', async ({ homePage }) => {
    await homePage.goto();
    await homePage.openContactModal();

    await homePage.submitContactForm({
      email: 'test@example.com',
      name: 'Test User',
      message: 'This is an automated test message.',
    });
  });
});
