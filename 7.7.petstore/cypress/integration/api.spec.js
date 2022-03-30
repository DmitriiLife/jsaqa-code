describe("creat, editing, delet user", () => {
  it("Creat", () => {
    cy.creat(
      1,
      "And",
      "Andrey",
      "Ivanov",
      "mail@mail.ru",
      "pass",
      "89111111111",
      1
    ).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
    cy.search("https://petstore.swagger.io/v2/user/And", 200);
  });

  it("Editing", () => {
    cy.creat(
      1,
      "And",
      "Andrey",
      "Ivanov",
      "mail@mail.ru",
      "pass",
      "89111111111",
      1
    ).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
    cy.search("https://petstore.swagger.io/v2/user/And", 200);
    cy.editing(
      1,
      "And",
      "Andre",
      "Ivanov",
      "mail@mail.ru",
      "pass",
      "11111111111",
      1
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.search("https://petstore.swagger.io/v2/user/And", 200);
  });

  it("Delet", () => {
    cy.creat(
      3,
      "Andi",
      "Anrey",
      "Ivan",
      "mal@mail.ru",
      "pass",
      "891111111111",
      3
    ).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
    cy.search("https://petstore.swagger.io/v2/user/Andi", 200);
    cy.login("Andi", "pass").then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
    cy.delet().then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
  });
});
