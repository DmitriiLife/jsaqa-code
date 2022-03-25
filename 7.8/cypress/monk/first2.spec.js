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

describe("Сreate hall and delet", () => {
  it("Сreate a hall", () => {
    cy.visit(urls.admin);
    cy.contains(sel.mail).type(login.email);
    cy.contains(sel.password).type(login.pass);
    cy.get(sel.loginButton).click();
    cy.contains(sel.creatHall).click();
    cy.contains(sel.nameHall).type("1");
    cy.contains(sel.addHall).click();
    cy.contains("1").should("be.visible");
    cy.get(sel.hallSales).click();
    cy.contains(sel.noSessions).should("be.visible");
    cy.get(sel.clickDelethall1).click();
    cy.get(sel.accDeletHall).click();
  });
});
