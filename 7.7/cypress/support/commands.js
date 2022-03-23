import "cypress-file-upload";

Cypress.Commands.add("login", (login, password) => {
  cy.request({
    method: "GET",
    url: "https://petstore.swagger.io/v2/user/login",
    body: {username: login, password: password},
  });
});

Cypress.Commands.add(
  "creat",
  (id, username, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/user",
      body: {
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
    });
  }
);

Cypress.Commands.add("delet", () => {
  cy.request({
    method: "DELETE",
    url: "https://petstore.swagger.io/v2/user/Andi",
  });
});

Cypress.Commands.add(
  "editing",
  (id, username, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
      method: "PUT",
      url: "https://petstore.swagger.io/v2/user/And",
      body: {
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
    });
  }
);

Cypress.Commands.add("search", (url, code) => {
  cy.request({
    method: "GET",
    url: url,
  }).then((response) => {
    cy.log(JSON.stringify(response.body));
    expect(response.status).to.eq(code);
  });
});
