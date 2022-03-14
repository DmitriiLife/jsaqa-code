/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable quotes */

it("Should open the main page", () => {
  cy.visit("/");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it("Should not login with empty login", () => {
  cy.visit("/");
  cy.login(" ", "test");
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Please fill out this field.");
});

it("Should not login with empty password", () => {
  cy.visit("/");
  cy.noPass("test@test.com");
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

it("Should valid account and add favorite book", () => {
  cy.visit("/");
  cy.login("bropet@mail.ru", "123");
  cy.contains("Add new").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type("Северные призраки (СИ)");
  cy.get("#description").type(
    "Я слишком люблю жизнь, чтобы сдаваться, не на ту нарвались! Но, как выяснилось, я воспринимала окружающую реальность не так, как следовало, поэтому правда жёстко смахнула с меня мои розовые очки. И конечно же, когда я была к этому совершенно не готова. И всё из-за подруги, которую мне приспичило спасать. По закону подлости всё изменила одна встреча. Парень, неожиданно взявшийся меня опекать, этот нахальный, высокомерный мажор, оказался человеком лишь отчасти. Но самое удивительное то, с чем я столкнулась на севере. Стая оборотней, круто изменивших мою судьбу, наполнив её дружбой, чувствами, борьбой и смыслом. Можно ли пережить разлуку и потерю, вверив сердце тому, кого почти не знаешь? Можно, если в глазах этого невероятного мужчины отражается преданность и безусловная любовь."
  );
  cy.get("#fileCover").attachFile("../../../../lava.png");
  cy.wait(2000);
  cy.get("#fileBook").attachFile("../../../../book.epub.zip");
  cy.wait(2000);
  cy.get("#authors").type("Риз Лаванда");
  cy.contains("add to favorite").click().click();
  cy.contains("Submit").click();
  cy.contains("Delete from favorite").should("be.visible");
});

it("Should valid account and delete favorite book", () => {
  cy.visit("/");
  cy.login("bropet@mail.ru", "123");
  cy.contains("Add new").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type("Северные призраки (СИ)");
  cy.get("#description").type(
    "Я слишком люблю жизнь, чтобы сдаваться, не на ту нарвались! Но, как выяснилось, я воспринимала окружающую реальность не так, как следовало, поэтому правда жёстко смахнула с меня мои розовые очки. И конечно же, когда я была к этому совершенно не готова. И всё из-за подруги, которую мне приспичило спасать. По закону подлости всё изменила одна встреча. Парень, неожиданно взявшийся меня опекать, этот нахальный, высокомерный мажор, оказался человеком лишь отчасти. Но самое удивительное то, с чем я столкнулась на севере. Стая оборотней, круто изменивших мою судьбу, наполнив её дружбой, чувствами, борьбой и смыслом. Можно ли пережить разлуку и потерю, вверив сердце тому, кого почти не знаешь? Можно, если в глазах этого невероятного мужчины отражается преданность и безусловная любовь."
  );
  cy.get("#fileCover").attachFile("../../../../lava.png");
  cy.wait(2000);
  cy.get("#fileBook").attachFile("../../../../book.epub.zip");
  cy.wait(2000);
  cy.get("#authors").type("Риз Лаванда");
  cy.contains("add to favorite").click().click();
  cy.contains("Submit").click();
  cy.contains("Delete from favorite").click();
  cy.contains("Favorites").click();
  cy.contains("Please add some book to favorit on home page!").should(
    "be.visible"
  );
});

it("Should valid account and add dowload book", () => {
  cy.visit("/");
  cy.login("bropet@mail.ru", "123");
  cy.contains("Add new").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type("Северные призраки (СИ)");
  cy.get("#description").type(
    "Я слишком люблю жизнь, чтобы сдаваться, не на ту нарвались! Но, как выяснилось, я воспринимала окружающую реальность не так, как следовало, поэтому правда жёстко смахнула с меня мои розовые очки. И конечно же, когда я была к этому совершенно не готова. И всё из-за подруги, которую мне приспичило спасать. По закону подлости всё изменила одна встреча. Парень, неожиданно взявшийся меня опекать, этот нахальный, высокомерный мажор, оказался человеком лишь отчасти. Но самое удивительное то, с чем я столкнулась на севере. Стая оборотней, круто изменивших мою судьбу, наполнив её дружбой, чувствами, борьбой и смыслом. Можно ли пережить разлуку и потерю, вверив сердце тому, кого почти не знаешь? Можно, если в глазах этого невероятного мужчины отражается преданность и безусловная любовь."
  );
  cy.get("#fileCover").attachFile("../../../../lava.png");
  cy.wait(2000);
  cy.get("#fileBook").attachFile("../../../../book.epub.zip");
  cy.wait(2000);
  cy.get("#authors").type("Риз Лаванда");
  cy.contains("add to favorite").click().click();
  cy.contains("Submit").click();
  cy.contains("Лаванда").click();
  cy.contains("Dowload book").click();
});

it("Should valid account, add two book, log out", () => {
  cy.visit("/");
  cy.login("bropet@mail.ru", "123");
  cy.contains("Add new").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type("Северные призраки (СИ)");
  cy.get("#description").type(
    "Я слишком люблю жизнь, чтобы сдаваться, не на ту нарвались! Но, как выяснилось, я воспринимала окружающую реальность не так, как следовало, поэтому правда жёстко смахнула с меня мои розовые очки. И конечно же, когда я была к этому совершенно не готова. И всё из-за подруги, которую мне приспичило спасать. По закону подлости всё изменила одна встреча. Парень, неожиданно взявшийся меня опекать, этот нахальный, высокомерный мажор, оказался человеком лишь отчасти. Но самое удивительное то, с чем я столкнулась на севере. Стая оборотней, круто изменивших мою судьбу, наполнив её дружбой, чувствами, борьбой и смыслом. Можно ли пережить разлуку и потерю, вверив сердце тому, кого почти не знаешь? Можно, если в глазах этого невероятного мужчины отражается преданность и безусловная любовь."
  );
  cy.get("#fileCover").attachFile("../../../../lava.png");
  cy.wait(2000);
  cy.get("#fileBook").attachFile("../../../../book.epub.zip");
  cy.wait(2000);
  cy.get("#authors").type("Риз Лаванда");
  cy.contains("Submit").click();
  cy.contains("Add new").click();
  cy.contains("Book description").should("be.visible");
  cy.get("#title").type("Северные призраки (СИ)");
  cy.get("#description").type(
    "Я слишком люблю жизнь, чтобы сдаваться, не на ту нарвались! Но, как выяснилось, я воспринимала окружающую реальность не так, как следовало, поэтому правда жёстко смахнула с меня мои розовые очки. И конечно же, когда я была к этому совершенно не готова. И всё из-за подруги, которую мне приспичило спасать. По закону подлости всё изменила одна встреча. Парень, неожиданно взявшийся меня опекать, этот нахальный, высокомерный мажор, оказался человеком лишь отчасти. Но самое удивительное то, с чем я столкнулась на севере. Стая оборотней, круто изменивших мою судьбу, наполнив её дружбой, чувствами, борьбой и смыслом. Можно ли пережить разлуку и потерю, вверив сердце тому, кого почти не знаешь? Можно, если в глазах этого невероятного мужчины отражается преданность и безусловная любовь."
  );
  cy.get("#fileCover").attachFile("../../../../lava.png");
  cy.wait(2000);
  cy.get("#fileBook").attachFile("../../../../book.epub.zip");
  cy.wait(2000);
  cy.get("#authors").type("Риз Лаванда");
  cy.contains("Submit").click();
  cy.contains("Favorites").click();
  cy.contains("Please add some book to favorit on home page!").should(
    "be.visible"
  );
  cy.contains("Books list").click();
  cy.contains("Log out").click();
  cy.contains("Log in").should("be.visible");
});
