describe("Lectures", () => {
  it("Should show correct number of days", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.get(".page-nav__day").should("have.length", 7);
  });

  it("Should be possible to tiket", () => {
    cy.visit("http://qamid.tmweb.ru/client/index.php");
    cy.get("a.page-nav__day:nth-of-type(5)").click();
    cy.get(
      ":nth-child(2) > :nth-child(2).movie-seances__hall > .movie-seances__list > .movie-seances__time-block > .movie-seances__time"
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

describe("Сreate, start, buy, close, delete hall", () => {
  it("Сreate a hall", () => {
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
    cy.get('[value="Загрузить постер"]').attachFile(
      "../../../../Desktop/film.png"
    );
    cy.get('[value="Добавить фильм"]').click();
    cy.contains("Принц Персии: Пески времени").should("be.visible");
  });

  it("Start selling tickets", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("E-mail").type("qamid@qamid.ru");
    cy.contains("Пароль").type("qamid");
    cy.get(".login__button").click();
    cy.get(
      '#start-sales > [style="display: block;"] > .conf-step__selectors-box > :nth-child(3) > .conf-step__radio'
    ).click();
    cy.contains("Открыть продажу билетов").click();
  });

  it("Buy tickets for the whole group", () => {
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
    });
    cy.get(".acceptin-button").click();
    cy.contains("Вы выбрали билеты").should("be.visible");
    cy.contains("Получить код бронирования").click();
    cy.contains("Электронный билет").should("be.visible");
  });

  it("Closing sales and delete hall", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.contains("E-mail").type("qamid@qamid.ru");
    cy.contains("Пароль").type("qamid");
    cy.get(".login__button").click();
    cy.get(
      '#start-sales > [style="display: block;"] > .conf-step__selectors-box > :nth-child(3) > .conf-step__radio'
    ).click();
    cy.contains("Закрыть продажу билетов").click();
    cy.contains("Все готово к открытию").should("be.visible");
    cy.get(".conf-step__list").contains("Window").children().click();
    cy.get("form > .conf-step__buttons > .conf-step__button-accent").click();
    cy.wait(2000);
    cy.contains("Window").should("not.exist");
  });
});
it("Add hall(issue4)", () => {
  cy.visit("http://qamid.tmweb.ru/admin");
  cy.contains("E-mail").type("qamid@qamid.ru");
  cy.contains("Пароль").type("qamid");
  cy.get(".login__button").click();
  cy.contains("Создать зал").click();
  cy.contains("Название зала").type("W");
  cy.contains("Добавить зал").click();
  cy.contains("W").should("be.visible");
  cy.contains("Добавить фильм").click();
  cy.contains("Название фильма").type("Принц Персии: Пески времени");
  cy.contains("Продолжительность фильма (мин.)").type("115");
  cy.contains("Описание фильма").type(
    "Главный герой этой экранизации культовой компьютерной игры, юный принц Дастан всегда побеждал врагов в бою, но потерял королевство из-за козней коварного царедворца. Теперь Дастану предстоит похитить из рук злодеев могущественный магический артефакт, способный повернуть время вспять и сделать своего владельца властелином мира. Помочь одолеть врагов Дастану помогут его блестящие навыки владения холодным оружием, а также недюжинные способности к акробатике и эквилибристике."
  );
  cy.contains("Страна").type("США");
  cy.get('[value="Загрузить постер"]').attachFile(
    "../../../../Desktop/film.png"
  );
  cy.get('[value="Добавить фильм"]').click();
  cy.contains("Принц Персии: Пески времени").should("be.visible");
});

it("Movie drag and drop(issue5)", () => {
  cy.visit("http://qamid.tmweb.ru/admin");
  cy.contains("E-mail").type("qamid@qamid.ru");
  cy.contains("Пароль").type("qamid");
  cy.get(".login__button").click();
  cy.get('[draggable="true"][data-film-id="90"] > .conf-step__movie-poster')
    .trigger("mousedown", {button: 0}, {force: true})
    .trigger("mousemove", 5, 550, {force: true});
  cy.get('[data-hall-id="1740"] > .conf-step__seances-timeline')
    .click()
    .trigger("mouseup", {force: true});
  cy.get('[data-seance-id="90"]').should("be.visible");
});
