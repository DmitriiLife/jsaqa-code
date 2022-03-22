/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable no-undef */

Cypress.Commands.add("login", (login, password) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(login);
  cy.get("#pass").type(password);
  cy.contains("Submit").click();
});

Cypress.Commands.add("noPass", (login) => {
  cy.contains("Log in").click();
  cy.get("#mail").type(login);
  cy.contains("Submit").click();
});
import "cypress-file-upload";
