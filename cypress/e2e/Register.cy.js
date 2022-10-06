import { faker } from "@faker-js/faker";

describe("Testes para o fluxo de registro", () => {
  it("Registra um cliente com dados válidos", () => {
    const clientData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      imageProfile: faker.internet.avatar(),
      password: "123",
      confirmPassword: "123",
    };

    cy.visit("http://localhost:3000/register");

    cy.get('[data-test-id="input-register-name"]').type(clientData.name);
    cy.get('[data-test-id="input-register-email"]').type(clientData.email);
    cy.get('[data-test-id="input-register-avatar"]').type(
      clientData.imageProfile
    );
    cy.get('[data-test-id="input-register-password"]').type(
      clientData.password
    );
    cy.get('[data-test-id="input-register-confirmPassword"]').type(
      clientData.confirmPassword
    );
    cy.get('[data-test-id="button-register-register"]').click();

    cy.url().should("equal", "http://localhost:3000/");
  });
});
