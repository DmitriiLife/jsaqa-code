const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("open is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`);
});

Then("the user sees the movie {string}", async function (string) {
  const actual = await getText(
    this.page,
    "body > main > section:nth-child(2) > div.movie__info > div.movie__description > p.movie__synopsis"
  );
  expect(actual).contain(string);
});

Then("the user sees the movie e {string}", async function (string) {
  const actual = await getText(this.page, "p.movie__synopsi");
  expect(actual).contain(string);
});

Then("the user sees the movie w {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  expect(actual).contain(string);
});

Then("the user sees the movie q {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  expect(actual).contain(string);
});

When("the user sees {string}", async function (string) {
  return await this.page.waitForSelector("h2");
});

Then("the user sees the movie l {string}", async function (string) {
  const actual = await getText(
    this.page,
    "body > main > section:nth-child(2) > div.movie__info > div.movie__description > p.movie__data > span.movie__data-origin"
  );
  expect(actual).contain(string);
});
