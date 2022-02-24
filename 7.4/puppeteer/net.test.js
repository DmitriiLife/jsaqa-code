let page;

describe("Netology.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://netology.ru");
  });

  afterEach(() => {
    page.close();
  });

  test("The first test'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    const firstLink = await page.$("header a + a");
    await firstLink.click();
    await page.waitForNavigation();
    const title2 = await page.title();
    console.log("Page title: " + title2);
    const pageList = await browser.newPage();
    await pageList.goto("https://netology.ru/navigation");
    await pageList.waitForSelector("h1");
  }, 9000);

  test("The link text 'Медиа Нетологии'", async () => {
    const actual = await page.$eval("header a + a", (link) => link.textContent);
    expect(actual).toContain("Медиа Нетологии");
  }, 9000);

  test("The link leads on 'Медиа' page", async () => {
    await page.click("header a + a");
    await page.waitForSelector(".logo__media", {
      visible: true,
    });
    const actual = await page.$eval(".logo__media", (link) => link.textContent);
    expect(actual).toContain("Медиа");
  }, 9000);
});

test("The link text 'Учиться бесплатно'", async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru");
  const firstLink = await page.$("header a + a");
  await firstLink.click();
  const pageList = await browser.newPage();
  await pageList.goto("https://netology.ru/free");
  await pageList.waitForSelector("h1");
  page.close();
}, 15000);
test("The link text 'Творческие профессии'", async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru");
  const firstLink = await page.$("header a + a");
  await firstLink.click();
  const studyForFree = await browser.newPage();
  await studyForFree.goto("https://netology.ru/free/creative");
  await studyForFree.waitForSelector("h1");
  page.close();
}, 9000);
test("The link text 'Предложения от наших партнёров'", async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru");
  const firstLink = await page.$("header a + a");
  await firstLink.click();
  const studyForFree = await browser.newPage();
  await studyForFree.goto("https://netology.ru/partners-gifts");
  await studyForFree.waitForSelector("h1");
  page.close();
}, 9000);
test("The h1 should contain 'Работа'", async () => {
  page = await browser.newPage();
  const expected = "Работа";
  await page.goto("https://netology.ru/job");
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
  page.close();
}, 9000);
test("The h1 should contain 'Отзывы'", async () => {
  page = await browser.newPage();
  const expected = "Отзывы студентов Нетологии";
  await page.goto("https://netology.ru/otzyvy");
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
  page.close();
}, 9000);
