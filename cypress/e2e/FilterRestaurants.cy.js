describe("Testes para o fluxo de filtragem de restaurantes", () => {
  it("Filtra os restaurantes pelo estado e pela cidade", () => {
    const clientData = {
      email: "samervalente2@gmail.com",
      password: "123",
    };

    cy.visit("http://localhost:3000/");

    cy.get('[data-test-id="input-login-email"]').type(clientData.email);
    cy.get('[data-test-id="input-login-password"]').type(clientData.password);
    cy.get('[data-test-id="button-login-enter"]').click();

    cy.url().should("equal", "http://localhost:3000/home");

    cy.get('[data-test-id="select-states"]')
      .select("RJ - Rio de Janeiro")
      .should("have.value", "RJ - Rio de Janeiro");
    cy.get('[data-test-id="select-city"]')
      .select("Rio de Janeiro")
      .should("have.value", "Rio de Janeiro");
    cy.get('[data-test-id="button-filter"]').click();
  });
});
