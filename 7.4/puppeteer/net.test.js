let page;
let time;
beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(time);
  await page.goto("https://netology.ru");
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  test("The first test'", async () => {
    time = 6000;
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
  });

  test("The first link text 'Медиа Нетологии'", async () => {
    time = 3000;
    const actual = await page.$eval("header a + a", (link) => link.textContent);
    expect(actual).toContain("Медиа Нетологии");
  });

  test("The first link leads on 'Медиа' page", async () => {
    time = 4000;
    await page.click("header a + a");
    await page.waitForSelector(".logo__media", {
      visible: true,
    });
    const actual = await page.$eval(".logo__media", (link) => link.textContent);
    expect(actual).toContain("Медиа");
  });
});

test("The first link text 'Учиться бесплатно'", async () => {
  time = 6000;
  const firstLink = await page.$("header a + a");
  await firstLink.click();
  const pageList = await browser.newPage();
  await pageList.goto("https://netology.ru/free");
  await pageList.waitForSelector("h1");
});
test("The first link text 'Творческие профессии'", async () => {
  time = 0;
  const firstLink = await page.$("header a + a");
  await firstLink.click();
  const studyForFree = await browser.newPage();
  await studyForFree.goto("https://netology.ru/free/creative");
  await studyForFree.waitForSelector("h1");
});
test("The first link text 'Предложения от наших партнёров'", async () => {
  time = 6000;
  const firstLink = await page.$("header a + a");
  await firstLink.click();
  const studyForFree = await browser.newPage();
  await studyForFree.goto("https://netology.ru/partners-gifts");
  await studyForFree.waitForSelector("h1");
});
test("The h1 should contain 'Работа'", async () => {
  time = 4000;
  const expected = "Работа";
  await page.goto("https://netology.ru/job");
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
});
test("The h1 should contain 'Отзывы'", async () => {
  time = 5000;
  const expected = "Отзывы студентов Нетологии";
  await page.goto("https://netology.ru/otzyvy");
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
});
