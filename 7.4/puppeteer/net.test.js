let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://netology.ru");
  });

  afterEach(() => {
    page.close();
  });

  test("The 'Медиа'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    await page.$("header a + a").click;
    await page.goto("https://netology.ru/blog/");
    const expected = "Медиа";
    const actual  = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 9000);

  test("The 'Курсы'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    await page.$('a[href$="/navigation"]').click;
    await page.goto("https://netology.ru/navigation");
    const expected = "Курсы";
    const actual  = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
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

test("The link text 'Бесплатные курсы, лекции и полезные материалы'", async () => {
  await page.goto("https://netology.ru");
  await page.$('a[href$="/free"').click;
  await page.goto("https://netology.ru/free");
  const expected = "Бесплатные";
  const actual  = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
}, 9000);

test("The link text 'Творческие профессии'", async () => {
  await page.goto("https://netology.ru");
  await page.$('a[href$="/free"').click;
  await page.goto("https://netology.ru/free");
  await page.$('a[href$="/free/creative"').click;
  await page.goto("https://netology.ru/free/creative");
  const expected = "Творческие профессии";
  const actual  = await page.$eval('a[href$="/free/creative"', (link) => link.textContent);
  expect(actual).toContain(expected);
}, 9000);

test("The link text 'Предложения от наших партнёров'", async () => {
  await page.goto("https://netology.ru");
  await page.$('a[href$="/partners-gifts"').click;
  await page.goto("https://netology.ru/partners-gifts");
  const expected = "Предложения от наших партнёров";
  const actual  = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
}, 9000);

test("The h1 should contain 'Работа'", async () => {
  await page.goto("https://netology.ru");
  await page.$('a[href$="https://netology.ru/job"').click;
  await page.goto("https://netology.ru/job");
  const expected = "Работа";
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
}, 9000);

test("The h1 should contain 'Отзывы'", async () => {
  await page.goto("https://netology.ru");
  await page.$('a[href$="/otzyvy"').click;
  await page.goto("https://netology.ru/otzyvy");
  const expected = "Отзывы студентов Нетологии";
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain(expected);
}, 9000);
