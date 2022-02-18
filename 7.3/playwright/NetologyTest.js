const { chromium } = require("playwright");
//Тест 1. Успешная авторизация.
(async () => {
  const browser = await chromium.launch({
    headless: false,
    //slowMo: 2000,
    //devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru");
  await page.click("text=Войти");
  await page.goto(
    "https://netology.ru/profile?modal=sign_in&provider=yandex&refresh=1"
  );
  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', email);
  // Press Tab
  await page.press('[placeholder="Email"]', "Tab");
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', password);
  await page.click("text=Войти");
  await page.textContent("text=Мои курсы и профессии");
  await browser.close();
})();
//Тест 2. Неуспешная авторизация
(async () => {
  const browser = await chromium.launch({
    headless: false,
    //slowMo: 2000,
    //devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru");
  await page.screenshot({ path: "1.png" });
  await page.click("text=Войти");
  await page.goto(
    "https://netology.ru/profile?modal=sign_in&provider=yandex&refresh=1"
  );
  await page.screenshot({ path: "2.png" });
  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]');
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', "dmit");
  // Press Tab
  await page.press('[placeholder="Email"]', "Tab");
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', "petr");
  await page.screenshot({ path: "3.png" });
  await page.click("text=Войти");
  await page.textContent("text=Неверный email");
  await page.screenshot({ path: "4.png" });
  await browser.close();
})();
