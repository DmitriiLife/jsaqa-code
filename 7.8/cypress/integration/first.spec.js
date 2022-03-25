const film = require("../fixtures/film.json");
const seats = require("../fixtures/seats.json");
const vip = require("../fixtures/vip.json");
const hall = require("../fixtures/addTwoHall.json");
const sel = require("../fixtures/selectors.json");
const login = require("../fixtures/login.json");
const price = require("../fixtures/price.json");
const hallSize = require("../fixtures/hallSize.json");
const urls = require("../fixtures/url.json");

describe("Lectures", () => {
  it("Should show correct number of days", () => {
    cy.visit(urls.client);
    cy.get(sel.week).should("have.length", 7);
  });

  it("Should be possible to tiket", () => {
    cy.visit(urls.client);
    cy.get(sel.fiveDayWeek).click();
    cy.get(sel.film2).click();
    seats.forEach((seat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      ).click();
    });
    cy.get(sel.accButton).click();
    cy.contains(sel.youHaveSelectedTickets).should("be.visible");
  });
});

describe("The main page, checking the login in the admin panel", () => {
  it("Should show home page", () => {
    cy.visit(urls.client);
    cy.contains(sel.goCinema).should("be.visible");
  });

  it("Should show admin login verification", () => {
    cy.visit(urls.admin);
    cy.contains(sel.mail).type(login.email);
    cy.contains(sel.password).type(login.pass);
    cy.get(sel.loginButton).click();
    cy.contains(sel.managementHall).should("be.visible");
  });
});

describe("Сreate hall", () => {
  it("Сreate a hall", () => {
    cy.visit(urls.admin);
    cy.contains(sel.mail).type(login.email);
    cy.contains(sel.password).type(login.pass);
    cy.get(sel.loginButton).click();
    cy.contains(sel.creatHall).click();
    cy.contains(sel.nameHall).type(hall.test1);
    cy.contains(sel.addHall).click();
    cy.contains(hall.test1).should("be.visible");
    cy.contains(sel.creatHall).click();
    cy.contains(sel.nameHall).type(hall.test2);
    cy.contains(sel.addHall).click();
    cy.contains(hall.test2).should("be.visible");
    cy.get(sel.configurationHall).click();
    cy.get(sel.rows).clear().type(hallSize.rows);
    cy.get(sel.places).clear().type(hallSize.places);
    vip.forEach((vipSeat) => {
      cy.get(
        `.conf-step__hall-wrapper > :nth-child(${vipSeat.row}) > :nth-child(${vipSeat.seat})`
      ).click();
    });
    cy.get(sel.configurationHallButtonAccent).click();
    cy.get(sel.priceConfiguration).click();
    cy.get(sel.priceStandart).clear().type(price.min);
    cy.get(sel.priceVip).clear().type(price.max);
    cy.get(sel.priceConfigurationButtonAccent).click();
    cy.get(sel.salesOpeningClosing).click();
    cy.contains(sel.noSessions).should("be.visible");
  });
});

describe("Buy ticket", () => {
  it("Buy tickets for the whole group", () => {
    cy.visit(urls.client);
    cy.contains(sel.monday).click();
    cy.get(sel.movieTime).click();
    vip.forEach((vipSeat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${vipSeat.row}) > :nth-child(${vipSeat.seat})`
      ).click();
    });
    cy.get(sel.accButton).click();
    cy.contains(sel.youHaveSelectedTickets).should("be.visible");
    cy.contains(sel.getBookingCode).click();
    cy.contains(sel.ticket).should("be.visible");
  });
});

describe("Closing and open sales", () => {
  it("Closing and open sales", () => {
    cy.visit(urls.admin);
    cy.contains(sel.mail).type(login.email);
    cy.contains(sel.password).type(login.pass);
    cy.get(sel.loginButton).click();
    cy.get(sel.startSales).click();
    cy.contains(sel.closedBuyTickets).click();
    cy.contains(sel.readyOpen).should("be.visible");
    cy.wait(2000);
    cy.contains(sel.openSalesNow).click();
    cy.contains(sel.ticketSalesOpen).should("be.visible");
  });
});

describe("Issue", () => {
  it("Add hall(issue4)", () => {
    cy.visit(urls.admin);
    cy.contains(sel.mail).type(login.email);
    cy.contains(sel.password).type(login.pass);
    cy.get(sel.loginButton).click();
    cy.contains(sel.creatHall).click();
    cy.contains(sel.nameHall).type("W");
    cy.contains(sel.addHall).click();
    cy.contains("W").should("be.visible");
    cy.contains(sel.addFilm).click();
    cy.contains(sel.nameFilm).type(film.name);
    cy.contains(sel.lengthFilm).type(film.length);
    cy.contains(sel.descriptionFilm).type(film.description);
    cy.contains(sel.country).type(film.country);
    cy.get(sel.dowloadPng).attachFile("../../../../Desktop/film.png");
    cy.get(sel.addFilmButton).click();
    cy.contains(sel.filmSearch).should("be.visible");
  });

  it("Movie drag and drop(issue5)", () => {
    cy.visit(urls.admin);
    cy.contains(sel.mail).type(login.email);
    cy.contains(sel.password).type(login.pass);
    cy.get(sel.loginButton).click();
    cy.get(sel.filmId90)
      .trigger("mousedown", {button: 0}, {force: true})
      .trigger("mousemove", 5, 550, {force: true});
    cy.get(sel.timeIdHall).click().trigger("mouseup", {force: true});
    cy.get(sel.searchIdFilm90).should("be.visible");
  });
});
