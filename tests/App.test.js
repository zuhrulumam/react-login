const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(10),
  username: faker.internet.userName() + '1'
};

console.log(person);

const appUrlBase = 'http://localhost:3000'
const routes = {
  public: {
    signup: `${appUrlBase}/signup`,
    login: `${appUrlBase}/login`,
  },
  private: {
    home: `${appUrlBase}`,
  },
};

//create global variables to be used in the beforeAll function
let browser
let page

beforeAll(async () => {
  console.log('before all')
  // launch browser	
  browser = await puppeteer.launch(
    {
      headless: false, // headless mode set to false so browser opens up with visual feedback
      slowMo: 250, // how slow actions should be
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
  )
  // creates a new page in the opened browser	
  page = await browser.newPage()
})

describe('Signup', () => {
  test('users can signup', async () => {
    await page.goto(routes.public.signup);
    await page.waitForSelector('.signup-form');

    await page.click('input[name=email]')
    await page.type('input[name=email]', person.email)

    await page.click('input[name=password]')
    await page.type('input[name=password]', person.password)

    await page.click('input[name=username]')
    await page.type('input[name=username]', person.username)

    await page.click('button[type=submit]')
    await page.waitForSelector('[data-testid="homepage"]')

    // await browser.close()
  }, 1600000);
});

describe('Logout', () => {
  test('users can logout', async () => {
    await page.waitForSelector('.MuiToolbar-root-173');

    await page.click('[data-testid="signoutBtn"]')
    await page.waitForSelector('.login-form')
  }, 9000000);
});

describe('Login', () => {
  test('users can login', async () => {
    await page.goto(routes.public.login);
    await page.waitForSelector('.login-form');

    // await page.click('input[name=email]')
    // await page.type('input[name=email]', 'test2@test.com')

    // await page.click('input[name=password]')
    // await page.type('input[name=password]', 'testtest')

    await page.click('input[name=email]')
    await page.type('input[name=email]', person.email)

    await page.click('input[name=password]')
    await page.type('input[name=password]', person.password)

    await page.click('button[type=submit]')

    await page.waitForSelector('[data-testid="homepage"]')

  }, 1600000);
});



// This function occurs after the result of each tests, it closes the browser
afterAll(async () => {
  await browser.close()
})