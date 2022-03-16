describe("Lectures", () => {
  it("Should show correct number of days", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.get(".page-nav__day").should("have.length", 7);
  });

  it("Should be possible to book", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.get("a.page-nav__day:nth-of-type(4)").click();
    cy.get(
      ":nth-child(2) > :nth-child(3) > .movie-seances__list > .movie-seances__time-block > .movie-seances__time"
    ).click();
    const seats = require("../fixtures/seats.json");
    seats.forEach((seat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      ).click();
    });
    cy.get(".acceptin-button").click();
    cy.contains("Вы выбрали билеты").should("be.visible");
  });
});

describe("The main page, checking the login in the admin panel", () => {
  it("Should show home page", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.contains("Идёмвкино").should("be.visible");
  });

  it("Should show admin login verification", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("E-mail").type("qamid@qamid.ru");
    cy.contains("Пароль").type("qamid");
    cy.get(".login__button").click();
    cy.contains("Управление залами").should("be.visible");
  });
});

describe("Custom script to add a new room and buy tickets", () => {
  it("Should show correct number of days", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("E-mail").type("qamid@qamid.ru");
    cy.contains("Пароль").type("qamid");
    cy.get(".login__button").click();
    cy.contains("Создать зал").click();
    cy.contains("Название зала").type("Window");
    cy.contains("Добавить зал").click();
    cy.contains("Window").should("be.visible");
    cy.get(
      "#hall-configuration > .conf-step__wrapper > .conf-step__selectors-box > :nth-child(4) > .conf-step__radio"
    ).click();
    cy.get("#input_rows_count").clear().type("15");
    cy.get("#input_places_count").clear().type("15");
    const vip = require("../fixtures/vip.json");
    vip.forEach((vipSeat) => {
      cy.get(
        `.conf-step__hall-wrapper > :nth-child(${vipSeat.row}) > :nth-child(${vipSeat.seat})`
      ).click();
    });
    cy.get(
      "#hall-configuration > .conf-step__wrapper > .conf-step__buttons > .conf-step__button-accent"
    ).click();
    cy.get(
      "#price-configuration > .conf-step__wrapper > .conf-step__selectors-box > :nth-child(3) > .conf-step__radio"
    ).click();
    cy.get("#input_price_standart").clear().type("10");
    cy.get("#input_price_vip").clear().type("20");
    cy.get(
      "#price-configuration > .conf-step__wrapper > .conf-step__buttons > .conf-step__button-accent"
    ).click();
    cy.contains("Добавить фильм").click();
    cy.contains("Название фильма").type("Принц Персии: Пески времени");
    cy.contains("Продолжительность фильма (мин.)").type("115");
    cy.contains("Описание фильма").type(
      "Главный герой этой экранизации культовой компьютерной игры, юный принц Дастан всегда побеждал врагов в бою, но потерял королевство из-за козней коварного царедворца. Теперь Дастану предстоит похитить из рук злодеев могущественный магический артефакт, способный повернуть время вспять и сделать своего владельца властелином мира. Помочь одолеть врагов Дастану помогут его блестящие навыки владения холодным оружием, а также недюжинные способности к акробатике и эквилибристике."
    );
    cy.contains("Страна").type("США");
    const filePath = "../fixtures/images/film.png";
    cy.get('[value="Загрузить постер"]').attachFile(filePath);
    cy.wait(5000);
    cy.get('[value="Добавить фильм"]').click();
    cy.contains("Принц Персии: Пески времени").should("be.visible");
  });

  it("Should show open sales", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("E-mail").type("qamid@qamid.ru");
    cy.contains("Пароль").type("qamid");
    cy.get(".login__button").click();
    cy.get(
      '#start-sales > [style="display: block;"] > .conf-step__selectors-box > :nth-child(4) > .conf-step__radio'
    ).click();
    cy.contains("Открыть продажу билетов").click();
  });

  it("Should show correct number of days", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.contains("Вс").click();
    cy.get(
      ":nth-child(2) > .movie-seances__hall > .movie-seances__list > .movie-seances__time-block > .movie-seances__time"
    ).click();
    const vip = require("../fixtures/vip.json");
    vip.forEach((vipSeat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${vipSeat.row}) > :nth-child(${vipSeat.seat})`
      ).click();
      cy.get(".acceptin-button").click();

      cy.get(".acceptin-button").click();
      cy.get(".ticket__check-title").should("be.visible");
    });
  });
});

it.only("Should show closing sales and delete hall", () => {
  cy.visit("http://qamid.tmweb.ru/admin");
  cy.contains("E-mail").type("qamid@qamid.ru");
  cy.contains("Пароль").type("qamid");
  cy.get(".login__button").click();
  cy.get(
    '#start-sales > [style="display: block;"] > .conf-step__selectors-box > :nth-child(4) > .conf-step__radio'
  ).click();
  cy.contains("Закрыть продажу билетов").click();
  cy.contains("Все готово к открытию").should("be.visible");
  cy.get(".conf-step__list > :nth-child(4) > a > .conf-step__button").click();
  cy.get("form > .conf-step__buttons > .conf-step__button-accent").click();
  cy.contains("Window").should("be.false");
});
