describe("TEST", () => {
  it("File upload", () => {
    cy.visit("https://tinypng.com/");
  });

  it("File Upload using cypress-file-upload package", () => {
    cy.get(".icon").attachFile("../fixtures/images/film.png", {
      subjectType: "input",
    });
    cy.wait(5000);
  });
});

cy.get('[draggable="true"][data-film-id="90"] > .conf-step__movie-poster')
  .trigger("mousedown", { button: 0 }, { force: true })
  .trigger("mousemove", 5, 550, { force: true });
cy.get('[data-hall-id="1740"] > .conf-step__seances-timeline')
  .click()
  .trigger("mouseup", { force: true });
