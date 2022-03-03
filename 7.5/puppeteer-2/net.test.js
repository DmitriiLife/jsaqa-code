const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Идём в кино", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  afterEach(() => {
    page.close();
  });

  test("When to watch movies", async () => {
    await page.waitForSelector("h1");
    const [weekDay] = await page.$x('//span[contains(text(),"Вс")]');
    await weekDay.click();
    await page.waitForSelector("h1");
    const [timeFilm] = await page.$x(
      "/html/body/main/section[1]/div[3]/ul/li/a"
    );
    await timeFilm.click();
    await page.waitForSelector("h1");
    const [place] = await page.$x(
      "/html/body/main/section/div[2]/div[1]/div[6]/span[5]"
    );
    await place.click();
    await page.waitForSelector("h1");
    const [button] = await page.$x("/html/body/main/section/button");
    await button.click();
    await page.waitForSelector("h1");
    const [buttonLast] = await page.$x("/html/body/main/section/div/button");
    await buttonLast.click();
    const actual = await getText(page, "h2");
    const expected = "Электронный билет";
    expect(actual).toContain(expected);
    console.log(actual);
  }, 60000);

  test("Wednesday to watch movies", async () => {
    await page.waitForSelector("h1");
    const [weekDay] = await page.$x('//span[contains(text(),"Ср")]');
    await weekDay.click();
    await page.waitForSelector("h1");
    const [timeFilm] = await page.$x(
      "/html/body/main/section[1]/div[3]/ul/li/a"
    );
    await timeFilm.click();
    await page.waitForSelector("h1");
    const [place] = await page.$x(
      "/html/body/main/section/div[2]/div[1]/div[6]/span[7]"
    );
    await place.click();
    await page.waitForSelector("h1");
    const [button] = await page.$x("/html/body/main/section/button");
    await button.click();
    await page.waitForSelector("h1");
    const [buttonLast] = await page.$x("/html/body/main/section/div/button");
    await buttonLast.click();
    const actual = await getText(page, "h2");
    const expected = "Электронный билет";
    expect(actual).toContain(expected);
    console.log(actual);
  }, 60000);
});

test("The h2 should contain 'Фильм 1'", async () => {
  const expected = "Фильм 1";
  const actual = await getText(page, "h2");
  expect(actual).toContain(expected);
  console.log(actual);
}, 60000);

test("The sad test", async () => {
  const expected = "Фильм 2";
  const actual = await getText(page, "h2");
  expect(actual).toContain(expected);
  console.log(actual);
}, 60000);

test("The 'p.movie__synopsis' should contain 'фильм хороший'", async () => {
  const expected = "фильм хороший";
  const actual = await getText(
    page,
    "body > main > section:nth-child(2) > div.movie__info > div.movie__description > p.movie__synopsis"
  );
  expect(actual).toContain(expected);
  console.log(actual);
}, 60000);

test("The bad test'p.movie__synopsis'", async () => {
  const expected = "фильм хороший";
  const actual = await getText(page, "p.movie__synopsis");
  expect(actual).toContain(expected);
  console.log(actual);
}, 60000);
