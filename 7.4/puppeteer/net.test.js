let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru");
}, 60000);

afterEach(() => {
  page.close();
});

describe("easy test", () => {
  test("Бесплатные курсы, лекции и полезные материалы", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/free"]');
    await page.waitForSelector("h1");
    const expected = "Бесплатные";
    const actual = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);

  test("Творческие профессии", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/free"]');
    await page.waitForSelector("h1");
    await page.click('a[href$="/free/creative"]');
    await page.waitForSelector("h1");
    const expected = "Творческие профессии";
    const actual = await page.$eval(
      'a[href$="/free/creative"',
      (link) => link.textContent
    );
    expect(actual).toContain(expected);
  }, 5000);

  test("Новые профессии", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/new-courses"]');
    await page.waitForSelector("h1");
    const expected = "Новые профессии – курсы в Нетологии онлайн";
    const actual = await page.$eval("title", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);

  test("Саморазвитие и хобби", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/lifestyle"]');
    await page.waitForSelector("h1");
    const expected = "Саморазвитие и хобби";
    const actual = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);

  test("Программирование", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/development"]');
    await page.waitForSelector("h1");
    const expected = "Программирование";
    const actual = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);

  test("Отзывы о курсах", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/otzyvy"]');
    await page.waitForSelector("h1");
    const expected = "Нетология – отзывы учеников о курсах";
    const actual = await page.$eval("title", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);
});

describe("Netology.ru tests", () => {
  test("Медиа", async () => {
    await page.waitForSelector("h1");
    await page.click("header a + a");
    await page.waitForSelector("h1");
    const expected = "Медиа";
    const actual = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);

  test("logo__media", async () => {
    await page.waitForSelector("h1");
    await page.click("header a + a");
    await page.waitForSelector(".logo__media", {
      visible: true,
    });
    const actual = await page.$eval(".logo__media", (link) => link.textContent);
    expect(actual).toContain("Медиа");
  }, 5000);

  test("Курсы", async () => {
    await page.waitForSelector("h1");
    await page.click('a[href$="/navigation"]');
    await page.waitForSelector("h1");
    const expected = "Курсы";
    const actual = await page.$eval("h1", (link) => link.textContent);
    expect(actual).toContain(expected);
  }, 5000);

  test("Медиа Нетологии", async () => {
    await page.waitForSelector("h1");
    const actual = await page.$eval("header a + a", (link) => link.textContent);
    expect(actual).toContain("Медиа Нетологии");
  }, 5000);
});
