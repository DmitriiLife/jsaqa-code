const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

describe("Идём в кино tests", () => {
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
      "/html/body/main/section/div[2]/div[1]/div[6]/span[9]"
    );
    await place.click();
    await page.waitForSelector("h1");
    const [button] = await page.$x("/html/body/main/section/button");
    await button.click();
    await page.waitForSelector("h1");
    const [buttonLast] = await page.$x("/html/body/main/section/div/button");
    await buttonLast.click();
    const actual = await getText(page, "h2");
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
    await page.waitForSelector("[disabled=true]");
  }, 60000);
});

test("The h2 should contain 'Фильм 1'", async () => {
  page = await browser.newPage();
  const expected = "Фильм 1";
  await page.goto("http://qamid.tmweb.ru/client/hall.php");
  const actual = await getText(page, "h2");
  expect(actual).toContain(expected);
  console.log(actual);
  await page.close();
}, 10000);
