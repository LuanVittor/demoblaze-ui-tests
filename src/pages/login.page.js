export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginModal = page.locator('#logInModal');
    this.signUpModal = page.locator('#signInModal');
    this.welcomeText = page.locator('#nameofuser');
  }

  async openSignUpModal() {
    await this.page.getByRole('link', { name: 'Sign up' }).click();
    await this.signUpModal.waitFor({ state: 'visible' });
  }

  async signUp(username, password) {
    await this.page.locator('#sign-username').fill(username);
    await this.page.locator('#sign-password').fill(password);
    this.page.once('dialog', (d) => d.accept());
    await this.signUpModal.getByRole('button', { name: 'Sign up' }).click();
    await this.page.waitForTimeout(1000);
  }

  async openLoginModal() {
    await this.page.getByRole('link', { name: 'Log in' }).click();
    await this.loginModal.waitFor({ state: 'visible' });
  }

  async login(username, password) {
    await this.page.locator('#loginusername').fill(username);
    await this.page.locator('#loginpassword').fill(password);
    await this.loginModal.getByRole('button', { name: 'Log in' }).click();
  }

  async getWelcomeText() {
    await this.welcomeText.waitFor({ state: 'visible', timeout: 5000 });
    return (await this.welcomeText.textContent()).trim();
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Log out' }).click();
    await this.page.waitForTimeout(500);
  }
}
