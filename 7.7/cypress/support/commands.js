import "cypress-file-upload";

Cypress.Commands.add(
  "uploadFile",
  { prevSubject: true },
  (subject, fixturePath, mimeType) => {
    cy.fixture(fixturePath, "base64").then((content) => {
      Cypress.Blob.base64StringToBlob(content, mimeType).then((blob) => {
        const testfile = new File([blob], fixturePath, { type: mimeType });
        const dataTransfer = new DataTransfer();
        const fileInput = subject[0];

        dataTransfer.items.add(testfile);
        fileInput.files = dataTransfer.files;

        cy.wrap(subject).trigger("change", { force: true });
      });
    });
  }
);

Cypress.Commands.add(
  "dragTo",
  { prevSubject: "element" },
  (subject, targetEl) => {
    cy.wrap(subject).trigger("dragstart");
    cy.get(targetEl).trigger("drop");
  }
);
